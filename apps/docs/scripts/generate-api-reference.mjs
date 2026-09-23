import fs from 'node:fs';
import path from 'node:path';
import ts from 'typescript';

const root = path.resolve(import.meta.dirname, '../../..');
const sourceRoot = path.join(root, 'packages/mielui/src');
const categories = ['components', 'blocks', 'ai-components', 'chart-components'];
const virtual = new Map();
const metadata = new Map();

function visitFiles(directory) {
    return fs.readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
        const file = path.join(directory, entry.name);
        return entry.isDirectory() ? visitFiles(file) : [file];
    });
}

const files = visitFiles(sourceRoot);
for (const file of files.filter((file) => file.endsWith('.svelte'))) {
    const source = fs.readFileSync(file, 'utf8');
    const script = [
        ...source.matchAll(/<script\b(?:[^>"']|"[^"]*"|'[^']*')*>([\s\S]*?)<\/script>/g)
    ]
        .map((match) => match[1])
        .join('\n');
    const parsed = ts.createSourceFile(
        file,
        script,
        ts.ScriptTarget.Latest,
        true,
        ts.ScriptKind.TS
    );
    let props;
    const defaults = {};
    const bindings = new Set();
    function visit(node) {
        if (
            ts.isVariableDeclaration(node) &&
            node.initializer &&
            ts.isCallExpression(node.initializer) &&
            node.initializer.expression.getText(parsed) === '$props'
        ) {
            props =
                node.type?.getText(parsed) ?? node.initializer.typeArguments?.[0]?.getText(parsed);
            if (ts.isObjectBindingPattern(node.name)) {
                for (const element of node.name.elements) {
                    if (element.dotDotDotToken) {
                        continue;
                    }
                    const name = (element.propertyName ?? element.name)
                        .getText(parsed)
                        .replace(/['"]/g, '');
                    let value = element.initializer;
                    if (
                        value &&
                        ts.isCallExpression(value) &&
                        value.expression.getText(parsed) === '$bindable'
                    ) {
                        bindings.add(name);
                        value = value.arguments[0];
                    }
                    if (value) {
                        defaults[name] = value.getText(parsed);
                    }
                }
            }
        }
        ts.forEachChild(node, visit);
    }
    visit(parsed);
    const generic = source.match(/generics="([^"]+)"/)?.[1];
    const genericSource = ts.createSourceFile(
        `${file}.generics.ts`,
        generic ? `function __DocsGeneric<${generic}>() {}` : '',
        ts.ScriptTarget.Latest,
        true,
        ts.ScriptKind.TS
    );
    const genericDeclaration = genericSource.statements.find(ts.isFunctionDeclaration);
    const genericAliases = (genericDeclaration?.typeParameters ?? [])
        .map((parameter) => {
            const fallback = parameter.default ?? parameter.constraint;
            return `type ${parameter.name.text} = ${fallback?.getText(genericSource) ?? 'unknown'};`;
        })
        .join('\n');
    const text = `${script}\n${genericAliases}\nexport type __DocsProps = ${props ?? '{}'};\ndeclare const __DocsComponent: import('svelte').Component<__DocsProps>;\nexport default __DocsComponent;`;
    virtual.set(`${file}.docs.ts`, text);
    metadata.set(file, { defaults, bindings, declared: !!props });
}

const paths = { '@mielui/svelte/*': [path.join(sourceRoot, '*')] };
for (const category of categories) {
    for (const entry of fs.readdirSync(path.join(sourceRoot, category), { withFileTypes: true })) {
        if (entry.isDirectory()) {
            paths[`@mielui/svelte/components/${entry.name}`] = [
                path.join(sourceRoot, category, entry.name, 'index.ts')
            ];
        }
    }
}
const options = {
    target: ts.ScriptTarget.ESNext,
    module: ts.ModuleKind.ESNext,
    moduleResolution: ts.ModuleResolutionKind.Bundler,
    strict: true,
    skipLibCheck: true,
    baseUrl: root,
    paths
};
const host = ts.createCompilerHost(options);
const originalRead = host.readFile;
const originalExists = host.fileExists;
host.readFile = (file) => virtual.get(file) ?? originalRead(file);
host.fileExists = (file) => virtual.has(file) || originalExists(file);
host.resolveModuleNames = (names, containingFile) =>
    names.map((name) => {
        let candidate;
        if (name.startsWith('.')) {
            candidate = path.resolve(path.dirname(containingFile), name);
        } else if (name.startsWith('@mielui/svelte/')) {
            candidate =
                paths[name]?.[0] ?? path.join(sourceRoot, name.slice('@mielui/svelte/'.length));
        }
        if (candidate && virtual.has(`${candidate}.docs.ts`)) {
            return { resolvedFileName: `${candidate}.docs.ts`, extension: ts.Extension.Ts };
        }
        return ts.resolveModuleName(name, containingFile, options, host).resolvedModule;
    });
const indexes = files.filter((file) =>
    /\/(components|blocks|ai-components|chart-components)\/[^/]+\/index\.ts$/.test(file)
);
const program = ts.createProgram([...indexes, ...virtual.keys()], options, host);
const checker = program.getTypeChecker();
const result = {};
const inheritedProperties = [];
const inheritedKeys = new Map();
for (const index of indexes) {
    const source = program.getSourceFile(index);
    const module = checker.getSymbolAtLocation(source);
    const parts = [];
    const seen = new Set();
    for (const exported of checker.getExportsOfModule(module)) {
        const symbol =
            exported.flags & ts.SymbolFlags.Alias ? checker.getAliasedSymbol(exported) : exported;
        const declaration = symbol.declarations?.[0];
        const virtualFile = declaration?.getSourceFile().fileName;
        if (!virtualFile?.endsWith('.svelte.docs.ts') || seen.has(virtualFile)) {
            continue;
        }
        seen.add(virtualFile);
        const file = virtualFile.replace(/\.docs\.ts$/, '');
        const source = program.getSourceFile(virtualFile);
        const alias = source.statements.find(
            (node) => ts.isTypeAliasDeclaration(node) && node.name.text === '__DocsProps'
        );
        const type = checker.getTypeAtLocation(alias);
        const meta = metadata.get(file);
        const variants = type.isUnion() ? type.types : [type];
        const propertiesByName = new Map();
        for (const variant of variants) {
            for (const property of checker.getPropertiesOfType(variant)) {
                const entries = propertiesByName.get(property.name) ?? [];
                entries.push(property);
                propertiesByName.set(property.name, entries);
            }
        }
        const properties = [...propertiesByName.values()].map((entries) => {
            const property = entries[0];
            const declarations = entries.flatMap((entry) => entry.declarations ?? []);
            const inherited =
                declarations.length > 0 &&
                declarations.every((node) =>
                    /\/svelte\/elements\.d\.ts$|\/typescript\/lib\/lib\.dom\.d\.ts$/.test(
                        node.getSourceFile().fileName
                    )
                );
            const propertyTypes = entries.map((entry) => {
                const propertyType = checker.getTypeOfSymbolAtLocation(entry, alias);
                return checker
                    .typeToString(
                        propertyType,
                        undefined,
                        ts.TypeFormatFlags.NoTruncation | ts.TypeFormatFlags.InTypeAlias
                    )
                    .replace(/import\("[^"]+"\)\./g, '');
            });
            const entry = {
                name: property.name,
                type: [...new Set(propertyTypes)].join(' | '),
                required:
                    entries.length === variants.length &&
                    entries.every((entry) => !(entry.flags & ts.SymbolFlags.Optional)),
                bindable: meta.bindings.has(property.name),
                default: meta.defaults[property.name] ?? null,
                description: ts
                    .displayPartsToString(property.getDocumentationComment(checker))
                    .split(/\n\s*\n/)[0],
                inherited
            };
            if (!inherited) {
                return entry;
            }
            const key = JSON.stringify(entry);
            let id = inheritedKeys.get(key);
            if (id === undefined) {
                id = inheritedProperties.length;
                inheritedProperties.push(entry);
                inheritedKeys.set(key, id);
            }
            return id;
        });
        parts.push({
            name:
                exported.name === 'default'
                    ? path
                          .basename(path.dirname(index))
                          .split('-')
                          .map((word) => word[0].toUpperCase() + word.slice(1))
                          .join('')
                    : exported.name,
            properties
        });
    }
    if (parts.length) {
        result[path.basename(path.dirname(index))] = parts;
    }
}
const destination = path.join(root, 'apps/docs/src/lib/generated/api');
fs.mkdirSync(destination, { recursive: true });
for (const [name, parts] of Object.entries(result)) {
    fs.writeFileSync(path.join(destination, `${name}.json`), `${JSON.stringify(parts, null, 4)}\n`);
}
for (let offset = 0; offset < inheritedProperties.length; offset += 250) {
    fs.writeFileSync(
        path.join(destination, `native-${offset / 250}.json`),
        `${JSON.stringify(inheritedProperties.slice(offset, offset + 250), null, 4)}\n`
    );
}
console.log(
    `Documented ${Object.keys(result).length} components, ${Object.values(result).flat().length} exported parts.`
);
