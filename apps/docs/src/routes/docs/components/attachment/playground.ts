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
    variant: select('Variant', ['card', 'chip'], 'card'),
    triggerVariant: select(
        'Trigger variant',
        ['primary', 'secondary', 'outline', 'ghost', 'destructive', 'glow', 'panel', 'quiet'],
        'outline',
        'Appearance'
    ),
    triggerSize: select('Trigger size', ['sm', 'md', 'lg'], 'md', 'Appearance'),
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

/** List renders ready, removable items. Any other item state needs explicit items. */
export function usesItems(values: Values): boolean {
    return values.status !== 'ready' || !values.removable;
}

function lines(values: Record<string, Parameters<typeof attributes>[0][string]>): string[] {
    return Object.entries(values).flatMap(([name, value]) => {
        const printed = attributes({
            [name]: value
        }).trim();

        return printed ? [printed] : [];
    });
}

function block(tag: string, props: string[], indent: string): string {
    const inner = props.map((prop) => `${indent}    ${prop}`).join('\n');

    return `${indent}<${tag}
${inner}
${indent}/>`;
}

function trigger(values: Values): string {
    const props = attributes({
        variant: values.triggerVariant !== 'ghost' && values.triggerVariant,
        size: values.triggerLabel && values.triggerSize !== 'md' && values.triggerSize
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

    const props = [
        '{file}',
        ...lines({
            variant: chip && 'chip',
            status: values.status,
            progress: values.status === 'uploading' && values.progress,
            error: values.status === 'error' && values.error,
            removable: values.removable ? undefined : expression('false'),
            class: !chip && 'w-72 max-w-full'
        }),
        ...(values.removable
            ? [
                  `onRemove={() => {
                files = files.filter((item) => item !== file);
            }}`
              ]
            : [])
    ];

    return `    {#each files as file (file)}
${block('Attachment.Item', props, '        ')}
    {/each}`;
}

export function code(values: Values): string {
    const chip = values.variant === 'chip';
    const root = [
        'bind:files',
        ...lines({
            accept: values.accept,
            multiple: values.multiple ? undefined : expression('false'),
            maxFiles: values.maxFiles,
            maxSize: expression(`${values.maxSize} * 1024 * 1024`),
            disabled: values.disabled
        }),
        `onReject={(rejections) => {
        rejected = rejections;
    }}`,
        'class="flex w-full max-w-sm flex-col items-center gap-3"'
    ];
    const rejection = [
        'file={rejection.file}',
        ...lines({
            variant: chip && 'chip',
            status: 'error',
            error: expression('rejection.reason'),
            class: !chip && 'w-72 max-w-full'
        }),
        `onRemove={() => {
                rejected = rejected.filter((item) => item !== rejection);
            }}`
    ];

    return `<script lang="ts">
    import * as Attachment from '@mielui/svelte/components/attachment';

    let files = $state<File[]>([]);
    let rejected = $state<Attachment.AttachmentRejection[]>([]);
</script>

<Attachment.Root
${root.map((prop) => `    ${prop}`).join('\n')}
>
${trigger(values)}
${items(values)}
    {#each rejected as rejection (rejection.file)}
${block('Attachment.Item', rejection, '        ')}
    {/each}
</Attachment.Root>`;
}
