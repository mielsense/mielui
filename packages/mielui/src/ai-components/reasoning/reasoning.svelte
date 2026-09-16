<script lang="ts">
    import { createDisclosureLifecycle } from '@mielui/svelte/components/_internal/disclosure';
    import { cn } from '@mielui/svelte/utils';
    import type { ReasoningRootProps } from '.';
    import { setReasoningContext } from './context.svelte';

    let {
        streaming = false,
        open = $bindable(true),
        onOpenChange,
        onOpenChangeComplete,
        children,
        class: className,
        ...rest
    }: ReasoningRootProps = $props();

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

    const reasoning = {
        id,
        get open() {
            return open;
        },
        set open(value) {
            open = value;
        },
        get streaming() {
            return streaming;
        },
        ...lifecycle
    };

    setReasoningContext(reasoning);
</script>

<section
    data-ui="reasoning"
    data-streaming={streaming}
    aria-busy={streaming}
    class={cn(className, 'w-full max-w-full text-sm text-foreground')}
    {...rest}
>
    {@render children?.()}
</section>
