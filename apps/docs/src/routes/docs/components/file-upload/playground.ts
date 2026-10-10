import {
    attributes,
    expression,
    number,
    type PlaygroundValues,
    text,
    toggle
} from '$lib/components/docs/playground';

type Attributes = Parameters<typeof attributes>[0];

export const controls = {
    dropzoneTitle: text('Dropzone title', 'Drop your files here', 'Content'),
    dropzoneDescription: text(
        'Dropzone description',
        'Or choose them from your device.',
        'Content'
    ),
    choose: text('Button label', 'Choose files', 'Content'),
    summary: toggle('Upload count', 'Content'),
    disabled: toggle('Disabled', 'State'),
    accept: text('Accept', 'image/*,.pdf', 'Behavior'),
    maxFiles: number('Max files', 3, {
        min: 1,
        max: 10,
        step: 1,
        group: 'Behavior'
    }),
    maxSize: number('Max size in MB', 10, {
        min: 1,
        max: 100,
        step: 1,
        group: 'Behavior'
    }),
    progress: toggle('Report progress', 'Behavior', true),
    fail: toggle('Fail uploads', 'Behavior')
};

export const DEFAULT_LABELS = {
    dropzoneTitle: controls.dropzoneTitle.value,
    dropzoneDescription: controls.dropzoneDescription.value,
    choose: controls.choose.value
};

function quote(value: string) {
    return `'${value.replaceAll('\\', '\\\\').replaceAll("'", "\\'")}'`;
}

function tag(indent: string, name: string, leading: string[], props: Attributes, end: '>' | '/>') {
    const parts = [
        ...leading,
        ...Object.entries(props).map(([key, value]) => {
            return attributes({
                [key]: value
            }).trim();
        })
    ].filter((part) => part !== '');
    const line = `${indent}<${[name, ...parts].join(' ')}${end === '>' ? '>' : ' />'}`;

    if (line.length <= 100) {
        return line;
    }

    return [`${indent}<${name}`, ...parts.map((part) => `${indent}    ${part}`), indent + end].join(
        '\n'
    );
}

export function code(values: PlaygroundValues<typeof controls>): string {
    const labelLines = [
        values.dropzoneTitle !== DEFAULT_LABELS.dropzoneTitle &&
            `        dropzoneTitle: ${quote(values.dropzoneTitle)}`,
        values.dropzoneDescription !== DEFAULT_LABELS.dropzoneDescription &&
            `        dropzoneDescription: ${quote(values.dropzoneDescription)}`,
        values.choose !== DEFAULT_LABELS.choose && `        choose: ${quote(values.choose)}`
    ].filter((line) => line !== false);
    const root = tag(
        '',
        'FileUpload.Root',
        [],
        {
            accept: values.accept.replaceAll('"', ''),
            maxFiles: values.maxFiles,
            maxSize: expression(`${values.maxSize} * 1024 * 1024`),
            disabled: values.disabled,
            labels: labelLines.length > 0 && expression('labels'),
            onUpload: expression('upload'),
            class: 'w-full max-w-md'
        },
        values.summary ? '>' : '/>'
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
    const labels =
        labelLines.length > 0
            ? `
    const labels = {
${labelLines.join(',\n')}
    };
`
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
${labels}
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
