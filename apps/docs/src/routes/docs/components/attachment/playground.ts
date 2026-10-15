import {
    attributes,
    defaultOn,
    expression,
    number,
    type PlaygroundValues,
    select,
    tag,
    toggle
} from '$lib/components/docs/playground';

export const ACCEPT = 'image/*,.pdf';
export const PROGRESS = 64;
export const UPLOAD_ERROR = 'Blocked by policy';

export const controls = {
    variant: select('Variant', ['card', 'chip'], 'card'),
    triggerLabel: toggle('Trigger label', 'Content', true),
    status: select('Status', ['ready', 'uploading', 'complete', 'error'], 'ready', 'State'),
    disabled: toggle('Disabled', 'State'),
    removable: toggle('Removable', 'Behavior', true),
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
    return values.triggerLabel
        ? '    <Attachment.Trigger variant="outline">Choose files</Attachment.Trigger>'
        : '    <Attachment.Trigger variant="outline" />';
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
            status: values.status !== 'ready' && values.status,
            progress: values.status === 'uploading' && PROGRESS,
            error: values.status === 'error' && UPLOAD_ERROR,
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
            accept: ACCEPT,
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
