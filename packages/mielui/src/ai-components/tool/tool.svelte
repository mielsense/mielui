<script lang="ts">
    import { createDisclosureLifecycle } from '@mielui/svelte/components/_internal/disclosure';
    import { cn } from '@mielui/svelte/utils';
    import type { ToolProps } from '.';
    import { setToolContext, setToolLabels } from './context';
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
    setToolLabels(() => labels);

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
        'max-w-full text-sm text-foreground',
        variant === 'quiet' ? 'inline-block' : 'w-full'
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
