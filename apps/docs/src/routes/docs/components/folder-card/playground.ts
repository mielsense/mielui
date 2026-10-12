import {
    attributes,
    changed,
    compact,
    content,
    number,
    type PlaygroundValues,
    select,
    text,
    toggle
} from '$lib/components/docs/playground';

export const controls = {
    action: select('Action', ['link', 'button', 'none'], 'link'),
    tone: select('Tone', ['1', '2', '3', '4', '5'], '1', 'Appearance'),
    cover: select('Cover', ['tone', 'image', 'none'], 'tone', 'Content'),
    title: text('Title', 'Client projects', 'Content'),
    description: toggle('Description', 'Content', true),
    index: toggle('Index', 'Content', true),
    count: toggle('Count', 'Content', true),
    value: number('Count value', 3957, {
        min: 0,
        max: 99999,
        group: 'Content'
    }),
    unit: text('Count unit', 'files', 'Content'),
    disabled: toggle('Disabled', 'State')
};

type Values = PlaygroundValues<typeof controls>;

const COVERS = {
    tone: `
        <FolderCard.Cover />`,
    image: `
        <FolderCard.Cover src="/og-default.png" />`,
    none: ''
};

const OPEN_HANDLER = `onclick={() => {
            opened = true;
        }}`;

export function code(values: Values): string {
    const button = values.action === 'button';
    const tone = changed(Number(values.tone), 1);
    const buttonProps = [
        attributes({ tone }).trim(),
        attributes({ disabled: values.disabled }).trim(),
        OPEN_HANDLER
    ].filter(Boolean);
    const root = button
        ? `<FolderCard.Root
        ${buttonProps.join('\n        ')}
    >`
        : `<FolderCard.Root${attributes({
              href: values.action === 'link' && '/docs/components',
              tone
          })}>`;
    const cover = COVERS[values.cover];
    const description = values.description
        ? `
            <FolderCard.Description>Brand, web, and product</FolderCard.Description>`
        : '';
    const count = attributes({
        value: values.value,
        unit: changed(values.unit, 'files')
    });
    const footerParts = compact([
        values.index && '            <FolderCard.Index>001</FolderCard.Index>',
        values.count && `            <FolderCard.Count${count} />`
    ]);
    const footer = footerParts.length
        ? `
        <FolderCard.Footer>
${footerParts.join('\n')}
        </FolderCard.Footer>`
        : '';
    const state = button
        ? `

    let opened = $state(false);`
        : '';
    const status = button
        ? `
    <p role="status" class="text-sm text-foreground-muted">
        {opened ? 'Opened the folder' : 'Nothing opened yet'}
    </p>`
        : '';

    return `<script lang="ts">
    import * as FolderCard from '@mielui/svelte/components/folder-card';${state}
</script>

<div class="flex w-full max-w-xs flex-col gap-3">
    ${root}${cover}
        <FolderCard.Tab>
            <FolderCard.Title>${content(values.title)}</FolderCard.Title>${description}
        </FolderCard.Tab>${footer}
    </FolderCard.Root>${status}
</div>`;
}
