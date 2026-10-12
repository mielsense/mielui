import {
    attributes,
    BUTTON_VARIANTS,
    CONTROL_SIZES,
    changed,
    defaultOn,
    expression,
    number,
    type PlaygroundValues,
    select,
    tag,
    text,
    toggle
} from '$lib/components/docs/playground';

export const controls = {
    variant: select('Variant', ['card', 'chip'], 'card'),
    triggerVariant: select('Trigger variant', BUTTON_VARIANTS, 'outline', 'Appearance'),
    triggerSize: select('Trigger size', CONTROL_SIZES, 'md', 'Appearance'),
    triggerLabel: toggle('Trigger label', 'Content', true),
    error: text('Error message', 'Blocked by policy', 'Content'),
    status: select('Status', ['ready', 'uploading', 'complete', 'error'], 'ready', 'State'),
    progress: number('Progress', 64, {
        min: 0,
        max: 100,
        step: 1,
        group: 'State'
    }),
    disabled: toggle('Disabled', 'State'),
    removable: toggle('Removable', 'Behavior', true),
    multiple: toggle('Multiple', 'Behavior', true),
    accept: text('Accept', 'image/*,.pdf', 'Behavior'),
    maxFiles: number('Max files', 3, {
        min: 1,
        max: 10,
        step: 1,
        group: 'Behavior'
    }),
    maxSize: number('Max size (MB)', 5, {
        min: 1,
        max: 100,
        step: 1,
        group: 'Behavior'
    })
};

type Values = PlaygroundValues<typeof controls>;

const ITEM_INDENT = '        ';

/** List renders ready, removable items. Any other item state needs explicit items. */
export function usesItems(values: Values): boolean {
    return values.status !== 'ready' || !values.removable;
}

function trigger(values: Values): string {
    const props = attributes({
        variant: changed(values.triggerVariant, 'ghost'),
        size: values.triggerLabel && changed(values.triggerSize, 'md')
    });

    return values.triggerLabel
        ? `    <Attachment.Trigger${props}>Choose files</Attachment.Trigger>`
        : `    <Attachment.Trigger${props} />`;
}

function items(values: Values): string {
    const chip = values.variant === 'chip';

    if (!usesItems(values)) {
        const props = attributes({
            variant: chip && 'chip',
            class: 'items-center self-stretch sm:justify-center'
        });

        return `    <Attachment.List${props} />`;
    }

    const item = tag(
        'Attachment.Item',
        {
            variant: chip && 'chip',
            status: values.status,
            progress: values.status === 'uploading' && values.progress,
            error: values.status === 'error' && values.error,
            removable: defaultOn(values.removable),
            class: !chip && 'w-72 max-w-full',
            onRemove:
                values.removable &&
                expression(`() => {
                files = files.filter((item) => item !== file);
            }`)
        },
        ' />',
        ITEM_INDENT,
        ['{file}']
    );

    return `    {#each files as file (file)}
${ITEM_INDENT}${item}
    {/each}`;
}

export function code(values: Values): string {
    const chip = values.variant === 'chip';
    const root = tag(
        'Attachment.Root',
        {
            accept: values.accept,
            multiple: defaultOn(values.multiple),
            maxFiles: values.maxFiles,
            maxSize: expression(`${values.maxSize} * 1024 * 1024`),
            disabled: values.disabled,
            onReject: expression(`(rejections) => {
        rejected = rejections;
    }`),
            class: 'flex w-full max-w-sm flex-col items-center gap-3'
        },
        '>',
        '',
        ['bind:files']
    );
    const rejection = tag(
        'Attachment.Item',
        {
            file: expression('rejection.file'),
            variant: chip && 'chip',
            status: 'error',
            error: expression('rejection.reason'),
            class: !chip && 'w-72 max-w-full',
            onRemove: expression(`() => {
                rejected = rejected.filter((item) => item !== rejection);
            }`)
        },
        ' />',
        ITEM_INDENT
    );

    return `<script lang="ts">
    import * as Attachment from '@mielui/svelte/components/attachment';

    let files = $state<File[]>([]);
    let rejected = $state<Attachment.AttachmentRejection[]>([]);
</script>

${root}
${trigger(values)}
${items(values)}
    {#each rejected as rejection (rejection.file)}
${ITEM_INDENT}${rejection}
    {/each}
</Attachment.Root>`;
}
