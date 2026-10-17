import {
    type AttributeValues,
    changed,
    compact,
    expression,
    type PlaygroundValues,
    quote,
    select,
    tag,
    toggle
} from '$lib/components/docs/playground';

export const controls = {
    copy: select('Copy', ['actionbar', 'overlay', 'inline'], 'actionbar'),
    showLineNumbers: toggle('Line numbers', 'Appearance'),
    content: select('Source', ['tabs', 'snippet', 'command'], 'tabs', 'Content'),
    actions: toggle('Extra action', 'Content')
};

type Values = PlaygroundValues<typeof controls>;

export const typescript = `export async function getUser(id: string) {
    const response = await fetch('/api/users/' + id);
    if (!response.ok) {
        throw new Error('User not found');
    }
    return response.json();
}`;

const python = `import httpx

async def get_user(id: str):
    async with httpx.AsyncClient() as client:
        response = await client.get("/api/users/" + id)
        response.raise_for_status()
        return response.json()`;

export const command = 'pnpm dlx @mielui/svelte add code-block';

/** The switcher's languages. The generated code names each source constant after its `lang`. */
export const tabs = [
    {
        label: 'TypeScript',
        lang: 'typescript',
        code: typescript
    },
    {
        label: 'Python',
        lang: 'python',
        code: python
    }
];

function constant(name: string, source: string): string {
    return `    const ${name} = \`${source}\`;`;
}

function constants(content: Values['content']): string {
    if (content === 'tabs') {
        return tabs.map((tab) => constant(tab.lang, tab.code)).join('\n\n');
    }
    if (content === 'snippet') {
        return constant('typescript', typescript);
    }

    return '';
}

function source(content: Values['content']): AttributeValues {
    if (content === 'tabs') {
        const entries = tabs.map((tab) => {
            return `        { label: ${quote(tab.label)}, lang: ${quote(tab.lang)}, code: ${tab.lang} }`;
        });

        return {
            tabs: expression(`[\n${entries.join(',\n')}\n    ]`)
        };
    }
    if (content === 'snippet') {
        return {
            code: expression('typescript'),
            lang: 'typescript'
        };
    }

    return {
        code: command,
        lang: 'bash'
    };
}

export function code(values: Values): string {
    const open = tag(
        'CodeBlock',
        {
            ...source(values.content),
            copy: changed(values.copy, 'actionbar'),
            showLineNumbers: values.showLineNumbers,
            class: 'max-w-xl'
        },
        values.actions ? '>' : ' />'
    );
    const imports = compact([
        values.actions && "import { LinkSquare02Icon } from '@hugeicons/core-free-icons';",
        values.actions && "import { Button } from '@mielui/svelte/components/button';",
        "import { CodeBlock } from '@mielui/svelte/components/code-block';",
        values.actions && "import HugeiconsIcon from '@mielui/svelte/hugeicons-icon';"
    ]).join('\n    ');
    const declarations = constants(values.content);
    const script = declarations ? `${imports}\n\n${declarations}` : imports;
    const element = values.actions
        ? `${open}
    {#snippet actions()}
        <Button variant="ghost" size="icon" aria-label="Open in editor">
            <HugeiconsIcon icon={LinkSquare02Icon} size={15} />
        </Button>
    {/snippet}
</CodeBlock>`
        : open;

    return `<script lang="ts">
    ${script}
</script>

${element}`;
}
