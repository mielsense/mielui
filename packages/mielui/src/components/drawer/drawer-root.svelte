<script lang="ts">
    import { type Snippet, untrack } from 'svelte';
    import { Drawer as Primitive } from 'vaul-svelte';
    import type { DrawerRootProps } from '.';
    import { setDrawerContext } from './context';

    let {
        open = $bindable(false),
        nested = false,
        dismissible = true,
        onOpenChange,
        children,
        ...rest
    }: DrawerRootProps = $props();
    let overlay: HTMLDivElement | null = null;
    let footer = $state<Snippet>();
    let reportedOpen = untrack(() => open);

    $effect(() => {
        reportedOpen = open;
    });

    function handleOpenChange(next: boolean) {
        if (reportedOpen === next) {
            return;
        }
        reportedOpen = next;
        onOpenChange?.(next);
    }

    setDrawerContext({
        get overlay() {
            return overlay;
        },
        set overlay(next) {
            overlay = next;
        },
        get footer() {
            return footer;
        },
        set footer(next) {
            footer = next;
        },
        close() {
            if (!open || dismissible) {
                return;
            }
            open = false;
            handleOpenChange(false);
        }
    });
</script>
<Primitive.Root
    {...rest}
    {nested}
    {dismissible}
    onOpenChange={handleOpenChange}
    bind:open
    autoFocus
    shouldScaleBackground={false}
>
    {@render children?.()}
</Primitive.Root>
