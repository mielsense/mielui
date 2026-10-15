<script lang="ts" generics="Controls extends PlaygroundControls">
    import { SlidersHorizontalIcon as Sliders } from '@hugeicons/core-free-icons';
    import * as Popover from '@mielui/svelte/components/popover';
    import HugeiconsIcon from '@mielui/svelte/hugeicons-icon';
    import { type Snippet, untrack } from 'svelte';
    import ComponentPreview from './component-preview.svelte';
    import type { PlaygroundControls, PlaygroundValue, PlaygroundValues } from './playground';
    import PlaygroundControl from './playground-control.svelte';

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

    const values = $state<Record<string, PlaygroundValue>>(
        untrack(() => {
            return Object.fromEntries(
                Object.entries(controls).map(([key, control]) => [key, control.value])
            );
        })
    );
    const typedValues = values as PlaygroundValues<Controls>;
</script>

<ComponentPreview code={code(typedValues)} class={className} {refreshable}>
    {#snippet controls()}
        {#if primary}
            {const [key, control] = $derived(primary)}
            <PlaygroundControl
                {control}
                value={values[key]}
                variant="ghost"
                onchange={(next) => {
                    values[key] = next;
                }}
            />
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
                                    <PlaygroundControl
                                        {control}
                                        value={values[key]}
                                        labelledby={`${id}-${key}`}
                                        onchange={(next) => {
                                            values[key] = next;
                                        }}
                                    />
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
