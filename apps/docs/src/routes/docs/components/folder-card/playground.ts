import {
    attributes,
    expression,
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

export function code(values: PlaygroundValues<typeof controls>): string {
    const button = values.action === 'button';
    const tone = values.tone !== '1' ? `tone={${values.tone}}` : '';
    const buttonProps = [
        tone,
        values.disabled ? 'disabled' : '',
        `onclick={() => {
            opened = true;
        }}`
    ].filter(Boolean);
    const root = button
        ? `<FolderCard.Root
        ${buttonProps.join('\n        ')}
    >`
        : `<FolderCard.Root${attributes({
              href: values.action === 'link' && '/docs/components',
              tone: tone && expression(values.tone)
          })}>`;
    const cover =
        values.cover === 'image'
            ? `
        <FolderCard.Cover src="/og-default.png" />`
            : values.cover === 'tone'
              ? `
        <FolderCard.Cover />`
              : '';
    const description = values.description
        ? `
            <FolderCard.Description>Brand, web, and product</FolderCard.Description>`
        : '';
    const count = attributes({
        value: expression(String(values.value)),
        unit: values.unit !== 'files' && values.unit
    });
    const footerParts = [
        values.index ? '            <FolderCard.Index>001</FolderCard.Index>' : '',
        values.count ? `            <FolderCard.Count${count} />` : ''
    ].filter(Boolean);
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
            <FolderCard.Title>${values.title}</FolderCard.Title>${description}
        </FolderCard.Tab>${footer}
    </FolderCard.Root>${status}
</div>`;
}
