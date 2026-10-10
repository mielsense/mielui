import {
    attributes,
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
        state: values.state !== 'running' && values.state,
        duration: values.duration,
        variant: values.variant !== 'default' && values.variant,
        open: values.open ? undefined : expression('false'),
        composed: values.composed
    });
    const items = [
        `<Tool.Item name="Bash"${attributes({ detail: values.details && 'pnpm lint' })} />`,
        `<Tool.Item name="Grep"${attributes({ detail: values.details && 'Composer' })} kind="search" />`,
        `<Tool.Item name="Read"${attributes({ detail: values.details && 'src/components/composer.svelte' })} kind="read" />`
    ];
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

<Tool.Root name="${values.name}"${props}>
${children}
</Tool.Root>`;
}
