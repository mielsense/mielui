<script lang="ts">
    import * as Attachment from '@mielui/svelte/components/attachment';
    import * as Composer from '@mielui/svelte/components/composer';
    import * as Select from '@mielui/svelte/components/select';

    const models = ['Mielui 3.1', 'Mielui Mini'];
    const skyImage = `<svg xmlns="http://www.w3.org/2000/svg" width="40" height="40"><defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#a8d4fb"/><stop offset="1" stop-color="#7cc0f5"/></linearGradient></defs><rect width="40" height="40" fill="url(#g)"/></svg>`;

    let value = $state('');
    let model = $state(models[0]);
    let result = $state('');
    let files = $state<File[]>([
        new File(['Brief'], 'brief.pdf', { type: 'application/pdf' }),
        new File([skyImage], 'cloud.svg', { type: 'image/svg+xml' }),
        new File(['Name,Email'], 'lead-list.xlsx', {
            type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
        }),
        new File(['# Notes'], 'meeting-notes.md', { type: 'text/markdown' })
    ]);

    function send(prompt: string) {
        const count = files.length;
        const noun = count === 1 ? 'file' : 'files';

        result = `Sent "${prompt}" with ${count} ${noun}.`;
        value = '';
        files = [];
    }
</script>

<div class="flex w-full max-w-2xl flex-col gap-3">
    <Attachment.Root bind:files>
        <Composer.Root bind:value onSubmit={send}>
            <Composer.Header>
                <Attachment.List variant="chip" />
            </Composer.Header>

            <Composer.Input
                aria-label="Prompt"
                placeholder="Add instructions for the attached files..."
            />

            <Composer.Toolbar>
                <Composer.Actions>
                    <Attachment.Trigger variant="outline" />

                    <Select.Root bind:value={model}>
                        <Select.Trigger variant="outline" class="w-auto max-w-40">
                            <span class="truncate">{model}</span>
                        </Select.Trigger>
                        <Select.Content dynamic>
                            <Select.Label>Model</Select.Label>
                            {#each models as option (option)}
                                <Select.Item value={option}>{option}</Select.Item>
                            {/each}
                        </Select.Content>
                    </Select.Root>
                </Composer.Actions>

                <Composer.Submit />
            </Composer.Toolbar>
        </Composer.Root>
    </Attachment.Root>

    <p class="min-h-5 text-sm text-foreground-muted" role="status">{result}</p>
</div>
