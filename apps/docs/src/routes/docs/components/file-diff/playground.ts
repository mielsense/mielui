import type { FileDiffLine } from '@mielui/svelte/components/file-diff';
import {
    compact,
    defaultOn,
    type PlaygroundValues,
    quote,
    select,
    tag,
    text,
    toggle
} from '#lib/components/docs/playground.js';

export const controls = {
    topBar: select('Top bar', ['default', 'with action', 'filename only', 'none'], 'default'),
    showLineNumbers: toggle('Line numbers', 'Appearance', true),
    file: text('File', 'src/auth.ts', 'Content')
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

        return `        {
            ${fields.join(',\n            ')}
        }`;
    });

    return `    const diff: FileDiffLine[] = [
${rows.join(',\n')}
    ];`;
}

export function code(values: Values): string {
    const showLineNumbers = defaultOn(values.showLineNumbers);

    if (values.topBar === 'default') {
        const props = {
            file: values.file,
            lang: 'ts',
            showLineNumbers,
            class: 'max-w-2xl'
        };

        return `<script lang="ts">
    import type { FileDiffLine } from '@mielui/svelte/components/file-diff';
    import * as FileDiff from '@mielui/svelte/components/file-diff';

${declaration()}
</script>

${tag('FileDiff.Root', props, ' />', '', ['{diff}'])}`;
    }

    const action = values.topBar === 'with action';
    const props = {
        file: values.topBar !== 'none' && values.file,
        lang: 'ts',
        showLineNumbers,
        class: 'max-w-2xl'
    };
    const parts = compact([
        '        <FileDiff.Filename />',
        action && '        <FileDiff.PlusMinus additions={3} deletions={1} />',
        action &&
            `        <Button variant="ghost" size="icon" class="size-7" aria-label="Expand diff">
            <HugeiconsIcon icon={ArrowExpandIcon} size={14} />
        </Button>`
    ]);
    const topBar =
        values.topBar === 'none'
            ? ''
            : `
    <FileDiff.TopBar>
${parts.join('\n')}
    </FileDiff.TopBar>`;
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
