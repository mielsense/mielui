<script lang="ts">
    import type { NotchPeekProps } from '.';
    import { getNotchContext } from './context';

    let { children }: NotchPeekProps = $props();
    const context = getNotchContext();
    $effect(() => {
        context.peek = children;
        return () => {
            context.peek = undefined;
        };
    });
</script>
