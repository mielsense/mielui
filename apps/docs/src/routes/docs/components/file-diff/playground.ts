import {
    expression,
    number,
    type PlaygroundValues,
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

const DIFF = `    const diff: FileDiffLine[] = [
        { type: 'context', oldLineNumber: 12, newLineNumber: 12, content: 'export function getToken() {' },
        { type: 'remove', oldLineNumber: 13, content: '  return localStorage.token;' },
        { type: 'add', newLineNumber: 13, content: '  const token = cookies.get("session");' },
        { type: 'add', newLineNumber: 14, content: '  if (!token) throw new Error("no session");' },
        { type: 'add', newLineNumber: 15, content: '  return token;' },
        { type: 'context', oldLineNumber: 14, newLineNumber: 16, content: '}' }
    ];`;

export function code(values: PlaygroundValues<typeof controls>): string {
    const highLevel = values.topBar && values.counts && !values.action;
    const appearance = {
        showLineNumbers: !values.showLineNumbers && expression('false'),
        theme: values.theme !== 'mielui' && values.theme,
        class: 'max-w-2xl'
    };

    if (highLevel) {
        const props = {
            diff: expression('diff'),
            file: values.file,
            lang: 'ts',
            additions: values.additions !== 3 && values.additions,
            deletions: values.deletions !== 1 && values.deletions,
            ...appearance
        };

        return `<script lang="ts">
    import type { FileDiffLine } from '@mielui/svelte/components/file-diff';
    import * as FileDiff from '@mielui/svelte/components/file-diff';

${DIFF}
</script>

${tag('FileDiff.Root', props, ' />').replace('diff={diff}', '{diff}')}`;
    }

    const showCounts = values.topBar && values.counts;
    const props = {
        file: values.topBar && values.file,
        lang: 'ts',
        additions: showCounts && expression(String(values.additions)),
        deletions: showCounts && expression(String(values.deletions)),
        ...appearance
    };
    const parts = [
        '        <FileDiff.Filename />',
        showCounts ? '        <FileDiff.PlusMinus />' : '',
        values.action
            ? `        <Button variant="ghost" size="icon" class="size-7" aria-label="Expand diff">
            <HugeiconsIcon icon={ArrowExpandIcon} size={14} />
        </Button>`
            : ''
    ].filter(Boolean);
    const topBar = values.topBar
        ? `
    <FileDiff.TopBar>
${parts.join('\n')}
    </FileDiff.TopBar>`
        : '';
    const action = values.topBar && values.action;
    const imports = action
        ? `    import { ArrowExpandIcon } from '@hugeicons/core-free-icons';
    import { Button } from '@mielui/svelte/components/button';
    import type { FileDiffLine } from '@mielui/svelte/components/file-diff';
    import * as FileDiff from '@mielui/svelte/components/file-diff';
    import HugeiconsIcon from '@mielui/svelte/hugeicons-icon';`
        : `    import type { FileDiffLine } from '@mielui/svelte/components/file-diff';
    import * as FileDiff from '@mielui/svelte/components/file-diff';`;

    return `<script lang="ts">
${imports}

${DIFF}
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
