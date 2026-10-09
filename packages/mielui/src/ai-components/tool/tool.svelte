<script lang="ts">
    import { createDisclosureLifecycle } from '@mielui/svelte/components/_internal/disclosure';
    import { cn } from '@mielui/svelte/utils';
    import { setContext } from 'svelte';
    import type { ToolLabels, ToolProps } from '.';
    import { setToolContext } from './context.svelte';
    import Content from './tool-content.svelte';
    import Trigger from './tool-trigger.svelte';

    let {
        name,
        duration,
        state = 'running',
        variant = 'default',
        open = $bindable(true),
        onOpenChange,
        onOpenChangeComplete,
        composed = false,
        trigger,
        children,
        class: className,
        labels,
        ...rest
    }: ToolProps = $props();
    setContext<() => ToolLabels | undefined>('tool-labels', () => labels);

    const id = $props.id();
    const lifecycle = createDisclosureLifecycle({
        get open() {
            return open;
        },
        get onOpenChange() {
            return onOpenChange;
        },
        get onOpenChangeComplete() {
            return onOpenChangeComplete;
        }
    });
    setToolContext({
        id,
        get open() {
            return open;
        },
        set open(value) {
            open = value;
        },
        get name() {
            return name;
        },
        get duration() {
            return duration;
        },
        get state() {
            return state;
        },
        get variant() {
            return variant;
        },
        ...lifecycle
    });
</script>

<section
    data-ui="tool"
    data-state={state}
    data-variant={variant}
    aria-busy={state === 'running'}
    class={cn(
        className,
        variant === 'quiet'
            ? 'inline-block max-w-full text-sm text-foreground'
            : 'mielui-inset-frame flex w-full max-w-full flex-col gap-0 text-sm text-foreground [--mielui-modal-inset:calc(var(--spacing)*0.75*var(--mielui-border-inset-scale,1))] [--mielui-plate-radius:calc(var(--radius-lg)*var(--mielui-squircle,1))]'
    )}
    {...rest}
>
    {#if composed}
        {@render children?.()}
    {:else}
        <Trigger children={trigger} />
        <Content>{@render children?.()}</Content>
    {/if}
</section>
