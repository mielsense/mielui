<script lang="ts">
    import {
        Tick02Icon as Check,
        ArrowDown01Icon as ChevronDown,
        ShieldCheckIcon as ShieldCheck,
        WorkflowSquare01Icon as Workflow
    } from '@hugeicons/core-free-icons';
    import * as Composer from '@mielui/svelte/components/composer';
    import * as DropdownMenu from '@mielui/svelte/components/dropdown-menu';
    import * as Select from '@mielui/svelte/components/select';
    import HugeiconsIcon from '@mielui/svelte/hugeicons-icon';
    import { onDestroy } from 'svelte';

    const models = ['Mielui 3.1', 'Mielui Mini'];
    const modes = ['Plan', 'Build'];
    const permissions = ['Ask first', 'Auto approve'];
    const efforts = ['Low', 'Medium', 'High'];

    let value = $state('Review the release notes and call out any migration risks.');
    let model = $state(models[0]);
    let mode = $state(modes[0]);
    let permission = $state(permissions[0]);
    let effort = $state(efforts[2]);
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

<div class="flex w-full max-w-2xl flex-col">
    <Composer.Root bind:value onSubmit={submitPrompt} onStop={stopSubmission}>
        <Composer.Input aria-label="Prompt" placeholder="Ask the agent..." />

        <Composer.Toolbar>
            <Composer.Actions>
                <Select.Root bind:value={mode}>
                    <Select.Trigger variant="ghost" class="w-auto max-w-32">
                        <HugeiconsIcon icon={Workflow} size={14} aria-hidden="true" />
                        <span class="truncate">{mode}</span>
                    </Select.Trigger>
                    <Select.Content dynamic>
                        <Select.Label>Mode</Select.Label>
                        {#each modes as option (option)}
                            <Select.Item value={option}>{option}</Select.Item>
                        {/each}
                    </Select.Content>
                </Select.Root>

                <Select.Root bind:value={permission}>
                    <Select.Trigger variant="ghost" class="w-auto max-w-44">
                        <HugeiconsIcon icon={ShieldCheck} size={14} aria-hidden="true" />
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

            <div class="ml-auto flex min-w-0 items-center gap-1">
                <DropdownMenu.Root>
                    <DropdownMenu.Trigger variant="ghost" class="w-auto max-w-52">
                        <span class="flex min-w-0 flex-1 items-center gap-1.5">
                            <span class="truncate">{model}</span>
                            <span class="text-foreground-muted">{effort}</span>
                        </span>
                        <HugeiconsIcon
                            icon={ChevronDown}
                            size={12}
                            class="ml-auto shrink-0 text-foreground-muted"
                            aria-hidden="true"
                        />
                    </DropdownMenu.Trigger>
                    <DropdownMenu.Content dynamic>
                        <DropdownMenu.Label>Configuration</DropdownMenu.Label>
                        <DropdownMenu.Sub>
                            <DropdownMenu.SubTrigger>Model</DropdownMenu.SubTrigger>
                            <DropdownMenu.SubContent dynamic>
                                {#each models as option (option)}
                                    <DropdownMenu.Item callback={() => (model = option)}>
                                        <span class="flex-1">{option}</span>
                                        {#if model === option}
                                            <HugeiconsIcon
                                                icon={Check}
                                                size={13}
                                                aria-hidden="true"
                                            />
                                        {/if}
                                    </DropdownMenu.Item>
                                {/each}
                            </DropdownMenu.SubContent>
                        </DropdownMenu.Sub>
                        <DropdownMenu.Sub>
                            <DropdownMenu.SubTrigger>Effort</DropdownMenu.SubTrigger>
                            <DropdownMenu.SubContent dynamic>
                                {#each efforts as option (option)}
                                    <DropdownMenu.Item callback={() => (effort = option)}>
                                        <span class="flex-1">{option}</span>
                                        {#if effort === option}
                                            <HugeiconsIcon
                                                icon={Check}
                                                size={13}
                                                aria-hidden="true"
                                            />
                                        {/if}
                                    </DropdownMenu.Item>
                                {/each}
                            </DropdownMenu.SubContent>
                        </DropdownMenu.Sub>
                    </DropdownMenu.Content>
                </DropdownMenu.Root>

                <Composer.Submit />
            </div>
        </Composer.Toolbar>
    </Composer.Root>
</div>
