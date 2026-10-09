<script lang="ts">
    import {
        GoogleDriveIcon as Drive,
        HandIcon as Hand,
        Mic01Icon as Microphone,
        NotionIcon as Notion,
        SlackIcon as Slack
    } from '@hugeicons/core-free-icons';
    import * as Attachment from '@mielui/svelte/components/attachment';
    import { Button } from '@mielui/svelte/components/button';
    import * as Composer from '@mielui/svelte/components/composer';
    import * as Select from '@mielui/svelte/components/select';
    import HugeiconsIcon from '@mielui/svelte/hugeicons-icon';
    import { onDestroy } from 'svelte';

    const permissions = ['Request approval', 'Auto approve'];
    const models = ['Auto', 'Mielui 3.1', 'Mielui Mini'];
    const apps = [Drive, Slack, Notion];

    let value = $state('');
    let files = $state<File[]>([]);
    let permission = $state(permissions[0]);
    let model = $state(models[0]);
    let connected = $state(false);
    let timer: ReturnType<typeof setTimeout> | undefined;
    let settle: (() => void) | undefined;

    async function submitPrompt() {
        await new Promise<void>((resolve) => {
            settle = resolve;
            timer = setTimeout(() => {
                value = '';
                timer = undefined;
                settle = undefined;
                resolve();
            }, 1600);
        });
    }

    function stopSubmission() {
        if (timer) {
            clearTimeout(timer);
        }
        timer = undefined;
        const resolve = settle;
        settle = undefined;
        resolve?.();
    }

    onDestroy(() => {
        if (timer) {
            clearTimeout(timer);
        }
        settle?.();
    });
</script>

<Attachment.Root bind:files class="flex w-full max-w-2xl flex-col gap-2">
    <Attachment.List variant="chip" />
    <Composer.Root bind:value onSubmit={submitPrompt} onStop={stopSubmission}>
        <Composer.Input aria-label="Prompt" placeholder="Start by typing..." />

        <Composer.Toolbar>
            <Composer.Actions>
                <Attachment.Trigger />

                <Select.Root bind:value={permission}>
                    <Select.Trigger variant="ghost" aria-label="Permission" class="w-auto">
                        <HugeiconsIcon icon={Hand} size={16} aria-hidden="true" />
                        <span class="truncate">{permission}</span>
                    </Select.Trigger>
                    <Select.Content dynamic>
                        <Select.Label>Permission</Select.Label>
                        {#each permissions as option (option)}
                            <Select.Item value={option}>{option}</Select.Item>
                        {/each}
                    </Select.Content>
                </Select.Root>
            </Composer.Actions>

            <div class="ms-auto flex shrink-0 items-center gap-1">
                <Select.Root bind:value={model}>
                    <Select.Trigger variant="ghost" aria-label="Model" class="w-auto">
                        <span class="truncate">{model}</span>
                    </Select.Trigger>
                    <Select.Content dynamic>
                        <Select.Label>Model</Select.Label>
                        {#each models as option (option)}
                            <Select.Item value={option}>{option}</Select.Item>
                        {/each}
                    </Select.Content>
                </Select.Root>

                <Button variant="ghost" size="icon" aria-label="Dictate">
                    <HugeiconsIcon icon={Microphone} size={17} aria-hidden="true" />
                </Button>

                <Composer.Submit />
            </div>
        </Composer.Toolbar>

        <Composer.Footer>
            <Button
                variant="ghost"
                class="text-foreground-muted hover:text-foreground"
                aria-pressed={connected}
                onclick={() => {
                    connected = !connected;
                }}
            >
                <span class="flex items-center gap-1" aria-hidden="true">
                    {#each apps as app (app)}
                        <HugeiconsIcon icon={app} size={15} />
                    {/each}
                </span>
                {connected ? 'Apps connected' : 'Connect apps'}
            </Button>
        </Composer.Footer>
    </Composer.Root>
</Attachment.Root>
