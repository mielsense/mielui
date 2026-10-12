import type { FileDiffLine } from '@mielui/svelte/components/file-diff';
import {
    changed,
    compact,
    defaultOn,
    number,
    type PlaygroundValues,
    quote,
    select,
    tag,
    text,
    toggle
} from '$lib/components/docs/playground';

export const controls = {
    theme: select('Theme', ['mielui', 'custom'], 'mielui'),
    showLineNumbers: toggle('Line numbers', 'Appearance', true),
    topBar: toggle('Top bar', 'Content', true),
    file: text('File', 'src/auth.ts', 'Content'),
    counts: toggle('Change counts', 'Content', true),
    additions: number('Additions', 3, {
        min: 0,
        max: 999,
        group: 'Content'
    }),
    deletions: number('Deletions', 1, {
        min: 0,
        max: 999,
        group: 'Content'
    }),
    action: toggle('Action button', 'Content')
};

type Values = PlaygroundValues<typeof controls>;

export const diff: FileDiffLine[] = [
    {
        type: 'context',
        oldLineNumber: 12,
        newLineNumber: 12,
        content: 'export function getToken() {'
    },
    {
        type: 'remove',
        oldLineNumber: 13,
        content: '  return localStorage.token;'
    },
    {
        type: 'add',
        newLineNumber: 13,
        content: '  const token = cookies.get("session");'
    },
    {
        type: 'add',
        newLineNumber: 14,
        content: '  if (!token) throw new Error("no session");'
    },
    {
        type: 'add',
        newLineNumber: 15,
        content: '  return token;'
    },
    {
        type: 'context',
        oldLineNumber: 14,
        newLineNumber: 16,
        content: '}'
    }
];

function declaration(): string {
    const rows = diff.map((line) => {
        const fields = compact([
            `type: ${quote(line.type)}`,
            typeof line.oldLineNumber === 'number' && `oldLineNumber: ${line.oldLineNumber}`,
            typeof line.newLineNumber === 'number' && `newLineNumber: ${line.newLineNumber}`,
            `content: ${quote(line.content)}`
        ]);

        return `        { ${fields.join(', ')} }`;
    });

    return `    const diff: FileDiffLine[] = [
${rows.join(',\n')}
    ];`;
}

export function code(values: Values): string {
    const highLevel = values.topBar && values.counts && !values.action;
    const appearance = {
        showLineNumbers: defaultOn(values.showLineNumbers),
        theme: changed(values.theme, 'mielui'),
        class: 'max-w-2xl'
    };

    if (highLevel) {
        const props = {
            file: values.file,
            lang: 'ts',
            additions: changed(values.additions, 3),
            deletions: changed(values.deletions, 1),
            ...appearance
        };

        return `<script lang="ts">
    import type { FileDiffLine } from '@mielui/svelte/components/file-diff';
    import * as FileDiff from '@mielui/svelte/components/file-diff';

${declaration()}
</script>

${tag('FileDiff.Root', props, ' />', '', ['{diff}'])}`;
    }

    const showCounts = values.topBar && values.counts;
    const props = {
        file: values.topBar && values.file,
        lang: 'ts',
        additions: showCounts && values.additions,
        deletions: showCounts && values.deletions,
        ...appearance
    };
    const parts = compact([
        '        <FileDiff.Filename />',
        showCounts && '        <FileDiff.PlusMinus />',
        values.action &&
            `        <Button variant="ghost" size="icon" class="size-7" aria-label="Expand diff">
            <HugeiconsIcon icon={ArrowExpandIcon} size={14} />
        </Button>`
    ]);
    const topBar = values.topBar
        ? `
    <FileDiff.TopBar>
${parts.join('\n')}
    </FileDiff.TopBar>`
        : '';
    const action = values.topBar && values.action;
    const imports = compact([
        action && "import { ArrowExpandIcon } from '@hugeicons/core-free-icons';",
        action && "import { Button } from '@mielui/svelte/components/button';",
        "import type { FileDiffLine } from '@mielui/svelte/components/file-diff';",
        "import * as FileDiff from '@mielui/svelte/components/file-diff';",
        action && "import HugeiconsIcon from '@mielui/svelte/hugeicons-icon';"
    ]).join('\n    ');

    return `<script lang="ts">
    ${imports}

${declaration()}
</script>

${tag('FileDiff.Root', props, '>')}${topBar}
    <FileDiff.Content>
        {#each diff as line, index (index)}
            <FileDiff.Row
                type={line.type}
                oldLine={line.oldLineNumber}
                newLine={line.newLineNumber}
                code={line.content}
            />
        {/each}
    </FileDiff.Content>
</FileDiff.Root>`;
}
