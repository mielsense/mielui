<script lang="ts">
    import { LinkPreview } from 'bits-ui';
    import type { HoverCardProps } from '.';
    import { setHoverCardContext } from './context';

    let {
        open = $bindable(false),
        delay = 200,
        closeDelay = 150,
        placement = 'bottom',
        children
    }: HoverCardProps = $props();
    const id = $props.id();
    const state = $state({ title: false, description: false });
    setHoverCardContext({
        id,
        state,
        get placement() {
            return placement;
        },
        get open() {
            return open;
        },
        set open(next: boolean) {
            open = next;
        }
    });
</script>

<LinkPreview.Root bind:open openDelay={delay} {closeDelay}>
    {@render children?.()}
</LinkPreview.Root>
