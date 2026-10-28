import {
    attributes,
    changed,
    defaultOn,
    expression,
    type PlaygroundValues,
    select,
    text,
    toggle
} from '#lib/components/docs/playground.js';

export const controls = {
    variant: select('Variant', ['default', 'quiet'], 'default'),
    name: text('Name', '1 file, 1 search, and 1 command', 'Content'),
    duration: text('Duration', '6s', 'Content'),
    details: toggle('Item details', 'Content', true),
    sections: toggle('Input and output', 'Content'),
    state: select('State', ['running', 'complete', 'error'], 'complete', 'State'),
    open: toggle('Open', 'State', true)
};

export function code(values: PlaygroundValues<typeof controls>): string {
    const props = attributes({
        name: values.name || expression('""'),
        state: changed(values.state, 'running'),
        duration: values.duration,
        variant: changed(values.variant, 'default'),
        open: defaultOn(values.open)
    });
    const bash = attributes({
        name: 'Bash',
        detail: values.details && 'pnpm lint'
    });
    const grep = attributes({
        name: 'Grep',
        detail: values.details && 'Composer',
        kind: 'search'
    });
    const read = attributes({
        name: 'Read',
        detail: values.details && 'src/components/composer.svelte',
        kind: 'read'
    });
    const items = [`<Tool.Item${bash} />`, `<Tool.Item${grep} />`, `<Tool.Item${read} />`];
    const sections = values.sections
        ? [
              '<Tool.Input>pnpm lint</Tool.Input>',
              '<Tool.Output>Checked 214 files. No fixes applied.</Tool.Output>'
          ]
        : [];
    const body = [...items, ...sections].map((line) => `    ${line}`).join('\n');

    return `<script lang="ts">
    import * as Tool from '@mielui/svelte/components/tool';
</script>

<Tool.Root${props}>
${body}
</Tool.Root>`;
}
