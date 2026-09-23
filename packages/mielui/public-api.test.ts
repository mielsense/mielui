/**
 * Catalog-backed public component contracts. Named exports hang off the package root as
 * identifiers; namespace exports hang off a PascalCase object (AlertDialog.Root).
 * Every public component is also reachable at @mielui/svelte/components/<slug>.
 */

import { existsSync } from 'node:fs';
import { readdir, readFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { describe, expect, test } from 'vitest';
import { loadRegistryIndex } from './cli/registry';
import categories from './component-categories.json';

const packageRoot = path.dirname(fileURLToPath(import.meta.url));
const componentsDir = path.join(packageRoot, 'src/components');
function categoryFor(slug: string): string {
    return (
        Object.entries(categories).find(([, components]) =>
            components.some((component) => component === slug)
        )?.[0] ?? 'components'
    );
}
function componentPath(slug: string): string {
    return path.join(packageRoot, 'src', categoryFor(slug), slug);
}

/** Single-element components: `import { Button } from '@mielui/svelte'`. */
const NAMED = {
    badge: ['Badge'],
    button: ['Button'],
    checkbox: ['Checkbox'],
    'code-block': ['CodeBlock'],
    'copy-button': ['CopyButton'],
    gauge: ['Gauge'],
    input: ['Input'],
    label: ['Label'],
    markdown: ['Markdown'],
    pagination: ['Pagination'],
    progress: ['Progress'],
    'reorder-list': ['ReorderList'],
    'scroll-area': ['ScrollArea'],
    separator: ['Separator'],
    'show-more': ['ShowMore'],
    kbd: ['Kbd'],
    skeleton: ['Skeleton', 'SkeletonSwap'],
    slider: ['Slider'],
    spinner: ['Spinner'],
    switch: ['Switch'],
    'task-steps': ['TaskSteps'],
    textarea: ['Textarea'],
    'response-stream': ['ResponseStream'],
    toast: ['Toast', 'Toaster', 'toast', 'getToastUIState'],
    toggle: ['Toggle'],
    toolbar: ['Toolbar']
} as const;

/** Compound components: `import { Dialog } from '@mielui/svelte'` then `<Dialog.Root>`. */
const NAMESPACED = {
    accordion: ['Content', 'Item', 'Root', 'Trigger'],
    alert: ['Description', 'Root', 'Title'],
    'alert-dialog': [
        'Confirm',
        'Content',
        'Description',
        'Exit',
        'Footer',
        'Header',
        'Root',
        'Title',
        'Trigger'
    ],
    attachment: ['Item', 'List', 'Root', 'Trigger'],
    avatar: ['Fallback', 'Image', 'Root'],
    breadcrumb: ['Item', 'Root', 'Separator'],
    calendar: [
        'Cell',
        'Day',
        'Grid',
        'GridBody',
        'GridHead',
        'GridRow',
        'HeadCell',
        'Header',
        'Heading',
        'Month',
        'MonthSelect',
        'NextButton',
        'PrevButton',
        'Root',
        'YearSelect'
    ],
    card: ['Content', 'Description', 'Footer', 'Header', 'Root', 'Title'],
    chart: ['Area', 'Bar', 'Grid', 'Legend', 'Line', 'Plot', 'Root', 'Tooltip', 'XAxis', 'YAxis'],
    collapsible: ['Content', 'Root', 'Trigger'],
    'color-picker': [
        'Channels',
        'Content',
        'HexInput',
        'Hue',
        'Plane',
        'Presets',
        'Preview',
        'Root',
        'Trigger'
    ],
    combobox: ['Content', 'Item', 'Label', 'Results', 'Root', 'Trigger'],
    command: [
        'Content',
        'Group',
        'Header',
        'Item',
        'Results',
        'Root',
        'Search',
        'Separator',
        'Trigger'
    ],
    composer: ['Actions', 'Input', 'Root', 'Submit', 'Toolbar'],
    'context-menu': [
        'CheckboxItem',
        'Content',
        'Item',
        'Root',
        'Separator',
        'Sub',
        'SubContent',
        'SubTrigger',
        'Trigger'
    ],
    conversation: ['Content', 'Empty', 'Root', 'ScrollButton'],
    'data-table': [
        'Body',
        'ColumnHeader',
        'Empty',
        'Facet',
        'Filter',
        'Filters',
        'Header',
        'Pagination',
        'Root',
        'Selection',
        'Sort',
        'Summary',
        'Toolbar',
        'View',
        'dataTableFilter'
    ],
    'date-picker': [
        'Calendar',
        'Cell',
        'Content',
        'Day',
        'Grid',
        'GridBody',
        'GridHead',
        'GridRow',
        'HeadCell',
        'Header',
        'Heading',
        'Input',
        'Label',
        'Month',
        'MonthSelect',
        'NextButton',
        'PrevButton',
        'Root',
        'Segment',
        'Trigger',
        'YearSelect'
    ],
    'date-range-picker': [
        'Calendar',
        'Cell',
        'Content',
        'Day',
        'Grid',
        'GridBody',
        'GridHead',
        'GridRow',
        'HeadCell',
        'Header',
        'Heading',
        'Input',
        'Label',
        'Month',
        'MonthSelect',
        'NextButton',
        'PrevButton',
        'Root',
        'Segment',
        'Trigger',
        'YearSelect'
    ],
    dialog: [
        'Body',
        'Close',
        'Confirm',
        'Content',
        'Description',
        'Footer',
        'Header',
        'Root',
        'Title',
        'Trigger'
    ],
    drawer: [
        'Body',
        'Close',
        'Content',
        'Description',
        'Footer',
        'Handle',
        'Header',
        'Overlay',
        'Portal',
        'Root',
        'Title',
        'Trigger'
    ],
    'dropdown-menu': [
        'CheckboxItem',
        'Content',
        'Item',
        'Label',
        'RadioGroup',
        'RadioItem',
        'Root',
        'Separator',
        'Sub',
        'SubContent',
        'SubTrigger',
        'Trigger'
    ],
    'empty-state': ['Actions', 'Content', 'Description', 'Header', 'Media', 'Root', 'Title'],
    field: ['Content', 'Control', 'Description', 'Error', 'Group', 'Label', 'Root'],
    fieldset: ['Description', 'Legend', 'Root'],
    'file-diff': ['Content', 'Filename', 'LineNumber', 'PlusMinus', 'Root', 'Row', 'TopBar'],
    'file-upload': [
        'Details',
        'Dropzone',
        'Item',
        'List',
        'Preview',
        'Progress',
        'Remove',
        'Retry',
        'Root',
        'Status',
        'Trigger'
    ],
    form: ['Actions', 'ErrorSummary', 'Root', 'Status', 'Submit'],
    group: ['Root', 'Separator', 'Text'],
    heatmap: [
        'Calendar',
        'Cell',
        'Detail',
        'Footer',
        'Grid',
        'Header',
        'Legend',
        'MonthLabels',
        'Root',
        'Summary',
        'WeekdayLabels',
        'Tooltip'
    ],
    'hover-card': ['Content', 'Description', 'Root', 'Title', 'Trigger'],
    message: ['Actions', 'Avatar', 'Body', 'Content', 'Metadata', 'Name', 'Root', 'Status', 'Time'],
    'native-select': ['OptGroup', 'Option', 'Root'],
    notch: [
        'Accessory',
        'Actions',
        'Close',
        'Content',
        'Description',
        'Header',
        'Peek',
        'Root',
        'SideAction',
        'Title'
    ],
    'number-field': ['Decrement', 'Group', 'Increment', 'Input', 'Label', 'Root'],
    'otp-field': ['Cell', 'Group', 'Root', 'Separator'],
    'pie-chart': ['Arc', 'Label', 'Legend', 'Plot', 'Root', 'Tooltip'],
    popover: ['Content', 'Root', 'Title', 'Trigger'],
    question: [
        'Actions',
        'Cancel',
        'Content',
        'Description',
        'Input',
        'Option',
        'Options',
        'Root',
        'Submit',
        'Title'
    ],
    'radio-group': ['Item', 'Root'],
    'range-calendar': [
        'Cell',
        'Day',
        'Grid',
        'GridBody',
        'GridHead',
        'GridRow',
        'HeadCell',
        'Header',
        'Heading',
        'Month',
        'MonthSelect',
        'NextButton',
        'PrevButton',
        'Root',
        'YearSelect'
    ],
    reasoning: ['Content', 'Root', 'Trigger'],
    select: ['Content', 'Item', 'Label', 'Root', 'Trigger', 'Value'],
    sheet: ['Close', 'Content', 'Description', 'Footer', 'Header', 'Root', 'Title', 'Trigger'],
    table: ['Body', 'Caption', 'Cell', 'Footer', 'Head', 'Header', 'Root', 'Row', 'ScrollArea'],
    tabs: ['Content', 'List', 'Root', 'Trigger'],
    'tag-input': ['Input', 'List', 'Root', 'Tag'],
    'toggle-group': ['Item', 'Root'],
    tool: ['Content', 'Input', 'Item', 'Output', 'Root', 'Trigger'],
    tooltip: ['Content', 'Provider', 'Root', 'Trigger'],
    typography: [
        'Description',
        'H1',
        'H2',
        'H3',
        'H4',
        'H5',
        'H6',
        'InlineCode',
        'Metadata',
        'Text',
        'Title'
    ]
} as const;

/** Parts available on the direct path even when the barrel only re-exports a shorthand. */
const DIRECT_PARTS = {
    ...NAMESPACED,
    badge: ['Badge'],
    button: ['Button'],
    checkbox: ['Checkbox'],
    'code-block': ['Actions', 'CodeBlock', 'Content', 'Copy', 'Header', 'List', 'Root', 'Trigger'],
    'copy-button': ['CopyButton'],
    gauge: ['Gauge'],
    input: ['Input'],
    kbd: ['Kbd'],
    label: ['Label'],
    markdown: ['Markdown'],
    pagination: ['Pagination'],
    progress: ['Progress'],
    'reorder-list': ['Content', 'Handle', 'Item', 'ReorderList', 'Root'],
    'response-stream': ['ResponseStream'],
    'scroll-area': ['ScrollArea'],
    separator: ['Separator'],
    'show-more': ['ShowMore'],
    skeleton: ['Skeleton', 'SkeletonSwap'],
    slider: ['Slider'],
    spinner: ['Spinner'],
    switch: ['Switch'],
    'task-steps': ['Indicator', 'Item', 'Label', 'List', 'Meta', 'Root', 'Summary', 'TaskSteps'],
    textarea: ['Textarea'],
    toast: [
        'Action',
        'Actions',
        'Close',
        'Content',
        'Footer',
        'Icon',
        'Root',
        'Title',
        'Toast',
        'Toaster',
        'getToastUIState',
        'toast'
    ],
    toggle: ['Toggle'],
    toolbar: ['Button', 'Group', 'Item', 'Link', 'Root', 'Separator', 'Toolbar']
} as const;

const PUBLIC_COMPONENTS = [...Object.keys(NAMED), ...Object.keys(NAMESPACED)].sort((a, b) =>
    a.localeCompare(b)
);
const INSTALLABLE = PUBLIC_COMPONENTS;

const REMOVED = [
    'shortcut',
    'modal',
    'fullscreen-nav',
    'approval-request',
    'marquee',
    'panel'
] as const;

function toPascalCase(slug: string) {
    if (slug === 'otp-field') {
        return 'OTPField';
    }
    return slug
        .split('-')
        .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
        .join('');
}

function parseExportedNames(source: string): string[] {
    const names = new Set<string>();
    for (const block of source.matchAll(/export\s*\{([^}]+)\}/g)) {
        for (const part of block[1].split(',')) {
            let cleaned = part.trim();
            if (/^type\s/.test(cleaned)) {
                continue;
            }
            if (!cleaned) {
                continue;
            }
            // `default as CodeBlock` / `Foo as Bar` → public name is the right-hand side.
            if (/\bas\b/.test(cleaned)) {
                cleaned =
                    cleaned
                        .split(/\bas\b/)
                        .at(-1)
                        ?.trim() ?? '';
            } else {
                cleaned = cleaned.replace(/\bdefault\b/g, '').trim();
            }
            if (cleaned) {
                names.add(cleaned);
            }
        }
    }
    for (const match of source.matchAll(/export\s+(?:async\s+)?function\s+([A-Za-z0-9_]+)/g)) {
        names.add(match[1]);
    }
    for (const match of source.matchAll(/export\s+const\s+([A-Za-z0-9_]+)/g)) {
        names.add(match[1]);
    }
    return [...names].sort((a, b) => a.localeCompare(b));
}

describe('public API contract', () => {
    test('public catalog contains exactly 77 components with no overlap', () => {
        expect(PUBLIC_COMPONENTS).toHaveLength(77);
        expect(new Set(PUBLIC_COMPONENTS).size).toBe(77);
        expect(
            Object.values(categories)
                .flat()
                .sort((a, b) => a.localeCompare(b))
        ).toEqual(PUBLIC_COMPONENTS);
        for (const slug of Object.keys(NAMED)) {
            expect(NAMESPACED).not.toHaveProperty(slug);
        }
    });

    test('package component directories match the public catalog', async () => {
        const dirs = (
            await Promise.all(
                Object.keys(categories).map(async (category) => {
                    const entries = await readdir(path.join(packageRoot, 'src', category), {
                        withFileTypes: true
                    });
                    return entries
                        .filter((entry) => entry.isDirectory() && !entry.name.startsWith('_'))
                        .map((entry) => entry.name);
                })
            )
        )
            .flat()
            .sort((a, b) => a.localeCompare(b));

        expect(dirs).toEqual(PUBLIC_COMPONENTS);
        for (const removed of REMOVED) {
            expect(dirs).not.toContain(removed);
            expect(existsSync(path.join(componentsDir, removed))).toBe(false);
        }
    });

    test('root barrel exports every named and namespaced component', async () => {
        const barrel = await readFile(path.join(packageRoot, 'src/index.ts'), 'utf8');

        for (const [slug, symbols] of Object.entries(NAMED)) {
            for (const symbol of symbols) {
                expect(barrel).toMatch(
                    new RegExp(
                        `export\\s*\\{[^}]*\\b${symbol}\\b[^}]*\\}\\s*from\\s*['"]\\./${categoryFor(slug)}/${slug}['"]`
                    )
                );
            }
        }

        for (const slug of Object.keys(NAMESPACED)) {
            const pascal = toPascalCase(slug);
            expect(barrel).toContain(`export * as ${pascal} from './${categoryFor(slug)}/${slug}'`);
        }

        expect(barrel).toContain("export { dataTableFilter } from './blocks/data-table'");

        for (const removed of REMOVED) {
            expect(barrel).not.toContain(`./components/${removed}`);
        }
    });

    test('direct component entrypoints export the locked public parts', async () => {
        for (const slug of PUBLIC_COMPONENTS) {
            const indexPath = path.join(componentPath(slug), 'index.ts');
            expect(existsSync(indexPath)).toBe(true);
            const source = await readFile(indexPath, 'utf8');
            const exported = parseExportedNames(source);
            const expected =
                DIRECT_PARTS[slug as keyof typeof DIRECT_PARTS] ??
                NAMED[slug as keyof typeof NAMED];
            if (!expected) {
                throw new Error(`Missing public API contract for ${slug}`);
            }
            expect(exported, `${slug} exported parts`).toEqual(
                [...expected].sort((a, b) => a.localeCompare(b))
            );
        }
    });

    test('package exports map covers every public component path', async () => {
        const packageJson = JSON.parse(
            await readFile(path.join(packageRoot, 'package.json'), 'utf8')
        ) as { exports: Record<string, unknown> };

        expect(packageJson.exports['./components/*']).toMatchObject({
            types: './dist/svelte/components/*/index.d.ts',
            svelte: './dist/svelte/components/*/index.js',
            default: './dist/svelte/components/*/index.js'
        });
        for (const slug of [
            ...categories['ai-components'],
            ...categories.blocks,
            ...categories['chart-components']
        ]) {
            expect(packageJson.exports[`./components/${slug}`]).toMatchObject({
                types: `./dist/svelte/${categoryFor(slug)}/${slug}/index.d.ts`,
                svelte: `./dist/svelte/${categoryFor(slug)}/${slug}/index.js`,
                default: `./dist/svelte/${categoryFor(slug)}/${slug}/index.js`
            });
        }
        expect(packageJson.exports['.']).toBeTruthy();
        expect(packageJson.exports['./ui.css']).toBe('./dist/svelte/ui.css');

        for (const slug of PUBLIC_COMPONENTS) {
            expect(existsSync(path.join(componentPath(slug), 'index.ts'))).toBe(true);
        }
    });

    test('CLI registry public list matches the public catalog', async () => {
        const snapshot = await loadRegistryIndex();
        const publicNames = snapshot.components
            .filter((component) => component.visibility === 'public')
            .map((component) => component.name)
            .sort((a, b) => a.localeCompare(b));

        expect(publicNames).toEqual(INSTALLABLE);
        for (const removed of REMOVED) {
            expect(publicNames).not.toContain(removed);
        }

        for (const slug of INSTALLABLE) {
            const plan = resolveInstallable(snapshot, slug);
            expect(plan).toBe(slug);
        }
    });

    test('the panel surface is a stylesheet contract, not a shared class string', async () => {
        const css = await readFile(path.join(packageRoot, 'src/ui.css'), 'utf8');
        const cardRoot = await readFile(path.join(componentsDir, 'card/card.svelte'), 'utf8');
        const codeBlock = await readFile(
            path.join(componentPath('code-block'), 'code-block.svelte'),
            'utf8'
        );

        expect(css).toContain('.mielui-card-frame');
        expect(css).toContain('.mielui-card-surface');
        expect(css).toContain('.mielui-inset-frame');
        expect(css).toContain('.mielui-inset-surface');
        expect(existsSync(path.join(componentsDir, 'card/surface.ts'))).toBe(false);

        expect(cardRoot).toContain('mielui-card-frame');
        expect(cardRoot).toContain('mielui-card-surface');
        expect(codeBlock).toContain('mielui-inset-frame');
        expect(codeBlock).toContain('mielui-inset-surface');
        expect(cardRoot).not.toContain('CARD_PANEL_');
        expect(codeBlock).not.toContain('CARD_PANEL_');

        expect(cardRoot).toMatch(/variant\s*=\s*['"]default['"]/);
        expect(cardRoot).toContain("'panel'");
    });

    test('shared surface contracts live in CSS rather than TypeScript', async () => {
        const css = await readFile(path.join(packageRoot, 'src/ui.css'), 'utf8');
        expect(css).toContain('.mielui-menu-item');
        expect(css).toContain('.mielui-tooltip');

        const menuRows = [
            'select/select-item.svelte',
            'combobox/combobox-item.svelte',
            'command/command-item.svelte',
            'context-menu/context-menu-item.svelte',
            'context-menu/context-menu-checkbox-item.svelte',
            'context-menu/context-menu-sub-trigger.svelte',
            'dropdown-menu/dropdown-menu-item.svelte',
            'dropdown-menu/dropdown-menu-sub-trigger.svelte'
        ];
        for (const file of menuRows) {
            const source = await readFile(
                path.join(componentPath(file.split('/')[0]), path.basename(file)),
                'utf8'
            );
            expect(source, file).toContain('mielui-menu-item');
            expect(source, file).toContain('unstyled');
            expect(source, file).not.toContain('MENU_ITEM');
        }

        expect(existsSync(path.join(packageRoot, 'src/internals'))).toBe(false);
    });
});

function resolveInstallable(snapshot: Awaited<ReturnType<typeof loadRegistryIndex>>, slug: string) {
    const entry = snapshot.components.find((component) => component.name === slug);
    if (!entry) {
        throw new Error(`Missing registry entry for ${slug}`);
    }
    expect(entry.visibility).toBe('public');
    return entry.name;
}
