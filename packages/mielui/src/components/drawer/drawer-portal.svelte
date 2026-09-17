<script lang="ts">
    import { Drawer as Primitive } from 'vaul-svelte';
    import type { DrawerPortalProps } from '.';

    let { children, ...rest }: DrawerPortalProps = $props();
</script>
<Primitive.Portal {...rest}>
    <div
        data-overlay-root
        class="pointer-events-none fixed inset-0 z-[115] [&>*]:pointer-events-auto"
    >
        {@render children?.()}
    </div>
</Primitive.Portal>
