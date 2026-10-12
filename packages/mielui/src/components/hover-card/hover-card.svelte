<script lang="ts">
    import { LinkPreview } from 'bits-ui';
    import type { HoverCardProps } from '.';
    import { setHoverCardContext } from './context.svelte';

    let {
        open = $bindable(false),
        openDelay = 200,
        closeDelay = 150,
        children
    }: HoverCardProps = $props();
    const id = $props.id();
    const state = $state({ title: false, description: false });
    setHoverCardContext({
        id,
        state,
        get open() {
            return open;
        },
        set open(next: boolean) {
            open = next;
        }
    });
</script>

<LinkPreview.Root bind:open {openDelay} {closeDelay}> {@render children?.()} </LinkPreview.Root>
