import {
    expression,
    number,
    type PlaygroundValues,
    tag,
    text,
    toggle
} from '$lib/components/docs/playground';

export const controls = {
    summary: toggle('Upload count', 'Content'),
    disabled: toggle('Disabled', 'State'),
    accept: text('Accept', 'image/*,.pdf', 'Behavior'),
    maxFiles: number('Max files', 3, {
        min: 1,
        max: 10,
        step: 1,
        group: 'Behavior'
    }),
    maxSize: number('Max size (MB)', 10, {
        min: 1,
        max: 100,
        step: 1,
        group: 'Behavior'
    }),
    progress: toggle('Report progress', 'Behavior', true),
    fail: toggle('Fail uploads', 'Behavior')
};

type Values = PlaygroundValues<typeof controls>;

export function code(values: Values): string {
    const root = tag(
        'FileUpload.Root',
        {
            accept: values.accept.replaceAll('"', ''),
            maxFiles: values.maxFiles,
            maxSize: expression(`${values.maxSize} * 1024 * 1024`),
            disabled: values.disabled,
            onUpload: expression('upload'),
            class: 'w-full max-w-md'
        },
        values.summary ? '>' : ' />'
    );
    const children = values.summary
        ? `
    {#snippet children({ complete, total })}
        <FileUpload.Dropzone />
        <p class="text-xs text-foreground-muted">{complete} of {total} uploaded</p>
        <FileUpload.List />
    {/snippet}
</FileUpload.Root>`
        : '';
    const steps = values.progress
        ? `        for (let percent = 10; percent <= 100; percent += 10) {
            await wait(180);
            signal.throwIfAborted();
            onProgress(percent);
        }`
        : `        await wait(1800);
        signal.throwIfAborted();`;
    const failure = values.fail
        ? `

        throw new Error('Connection interrupted. Try uploading again.');`
        : '';

    return `<script lang="ts">
    import * as FileUpload from '@mielui/svelte/components/file-upload';

    type UploadOptions = Parameters<FileUpload.FileUploadProps['onUpload']>[1];

    function wait(milliseconds: number) {
        return new Promise((resolve) => {
            setTimeout(resolve, milliseconds);
        });
    }

    async function upload(_file: File, { signal${values.progress ? ', onProgress' : ''} }: UploadOptions) {
${steps}${failure}
    }
</script>

${root}${children}`;
}
