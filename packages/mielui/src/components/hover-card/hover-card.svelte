<script lang="ts">
    import { LinkPreview } from 'bits-ui';
    import { setContext } from 'svelte';
    import type { HoverCardProps } from '.';

    let {
        open = $bindable(false),
        openDelay = 200,
        closeDelay = 150,
        children
    }: HoverCardProps = $props();
    const id = $props.id();
    const state = $state({ title: false, description: false });
    setContext('mielui-hover-card', {
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

<LinkPreview.Root bind:open {openDelay} {closeDelay}>
    {@render children?.()}
</LinkPreview.Root>
