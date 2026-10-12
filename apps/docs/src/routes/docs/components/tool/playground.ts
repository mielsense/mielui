import {
    attributes,
    changed,
    defaultOn,
    expression,
    type PlaygroundValues,
    select,
    text,
    toggle
} from '$lib/components/docs/playground';

export const controls = {
    variant: select('Variant', ['default', 'quiet'], 'default'),
    name: text('Name', '1 file, 1 search, and 1 command', 'Content'),
    duration: text('Duration', '6s', 'Content'),
    details: toggle('Item details', 'Content', true),
    sections: toggle('Input and output', 'Content'),
    state: select('State', ['running', 'complete', 'error'], 'complete', 'State'),
    open: toggle('Open', 'State', true),
    composed: toggle('Composed', 'Behavior')
};

export function code(values: PlaygroundValues<typeof controls>): string {
    const props = attributes({
        name: values.name || expression('""'),
        state: changed(values.state, 'running'),
        duration: values.duration,
        variant: changed(values.variant, 'default'),
        open: defaultOn(values.open),
        composed: values.composed
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
    const indent = values.composed ? '        ' : '    ';
    const body = [...items, ...sections].map((line) => `${indent}${line}`).join('\n');
    const children = values.composed
        ? `    <Tool.Trigger />
    <Tool.Content>
${body}
    </Tool.Content>`
        : body;

    return `<script lang="ts">
    import * as Tool from '@mielui/svelte/components/tool';
</script>

<Tool.Root${props}>
${children}
</Tool.Root>`;
}
