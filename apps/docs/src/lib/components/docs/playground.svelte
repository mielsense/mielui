<script lang="ts" generics="Controls extends PlaygroundControls">
    import { SlidersHorizontalIcon as Sliders } from '@hugeicons/core-free-icons';
    import { Input } from '@mielui/svelte/components/input';
    import * as Popover from '@mielui/svelte/components/popover';
    import * as Select from '@mielui/svelte/components/select';
    import { Switch } from '@mielui/svelte/components/switch';
    import HugeiconsIcon from '@mielui/svelte/hugeicons-icon';
    import { type Snippet, untrack } from 'svelte';
    import ComponentPreview from './component-preview.svelte';
    import {
        optionLabel,
        type PlaygroundControl,
        type PlaygroundControls,
        type PlaygroundValues
    } from './playground';

    let {
        controls,
        code,
        children,
        class: className,
        refreshable = false
    }: {
        controls: Controls;
        code: (values: PlaygroundValues<Controls>) => string;
        children: Snippet<[PlaygroundValues<Controls>]>;
        class?: string;
        refreshable?: boolean;
    } = $props();

    const id = $props.id();
    const entries = $derived(Object.entries(controls as PlaygroundControls));
    const primary = $derived(entries.find(([, control]) => control.kind === 'select'));
    const rest = $derived(entries.filter((entry) => entry !== primary));
    const groups = $derived(
        Array.from(new Set(rest.map(([, control]) => control.group ?? ''))).map((group) => {
            return {
                name: group,
                controls: rest.filter(([, control]) => (control.group ?? '') === group)
            };
        })
    );

    const values = $state(
        untrack(() => {
            return Object.fromEntries(
                Object.entries(controls).map(([key, control]) => [key, control.value])
            );
        })
    ) as Record<string, string | number | boolean>;
    const typedValues = $derived(values as PlaygroundValues<Controls>);
</script>

{#snippet choice(key: string, control: PlaygroundControl, variant: 'ghost' | 'outline')}
    {#if control.kind === 'select'}
        <Select.Root
            value={values[key] as string}
            onValueChange={(next) => {
                values[key] = next;
            }}
        >
            <Select.Trigger {variant} size="sm" aria-label={control.label} class="shrink-0" />
            <Select.Content>
                {#each control.options as option (option)}
                    <Select.Item value={option}>{optionLabel(option)}</Select.Item>
                {/each}
            </Select.Content>
        </Select.Root>
    {/if}
{/snippet}

<ComponentPreview code={code(typedValues)} class={className} {refreshable}>
    {#snippet controls()}
        {#if primary}
            {@render choice(primary[0], primary[1], 'ghost')}
        {/if}
        {#if rest.length}
            <Popover.Root placement="bottom-start" inert={false}>
                <Popover.Trigger variant="ghost" size="sm" class="shrink-0 gap-1.5">
                    <HugeiconsIcon icon={Sliders} size={14} class="text-foreground-muted" />
                    Props
                </Popover.Trigger>
                <Popover.Content
                    class="w-72"
                    surfaceClass="flex max-h-[min(30rem,60vh)] flex-col gap-3 overflow-y-auto p-3 [--size-control-md:var(--size-control-sm)]"
                    lockScroll={false}
                    dismissLayer={false}
                    aria-label="Props"
                >
                    {#each groups as group (group.name)}
                        <div class="flex flex-col gap-2">
                            {#if group.name}
                                <p class="m-0 text-xs text-foreground-muted">{group.name}</p>
                            {/if}
                            {#each group.controls as [key, control] (key)}
                                <div
                                    class="flex min-h-7 items-center justify-between gap-6 text-sm"
                                >
                                    <span id={`${id}-${key}`}>{control.label}</span>
                                    {#if control.kind === 'toggle'}
                                        <Switch
                                            aria-labelledby={`${id}-${key}`}
                                            bind:checked={
                                                () => values[key] as boolean,
                                                (next) => {
                                                    values[key] = next;
                                                }
                                            }
                                        />
                                    {:else if control.kind === 'text'}
                                        <Input
                                            aria-labelledby={`${id}-${key}`}
                                            class="w-36"
                                            bind:value={
                                                () => values[key] as string,
                                                (next) => {
                                                    values[key] = next;
                                                }
                                            }
                                        />
                                    {:else if control.kind === 'number'}
                                        <Input
                                            type="number"
                                            aria-labelledby={`${id}-${key}`}
                                            class="w-24"
                                            min={control.min}
                                            max={control.max}
                                            step={control.step}
                                            bind:value={
                                                () => values[key] as number,
                                                (next) => {
                                                    const parsed = Number(next);
                                                    if (Number.isFinite(parsed)) {
                                                        values[key] = parsed;
                                                    }
                                                }
                                            }
                                        />
                                    {:else}
                                        {@render choice(key, control, 'outline')}
                                    {/if}
                                </div>
                            {/each}
                        </div>
                    {/each}
                </Popover.Content>
            </Popover.Root>
        {/if}
    {/snippet}
    {@render children(typedValues)}
</ComponentPreview>
