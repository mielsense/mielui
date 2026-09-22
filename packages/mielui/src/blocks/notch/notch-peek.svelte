<script lang="ts">
    import type { NotchPeekProps } from '.';
    import { notchContext } from './context';

    let { children }: NotchPeekProps = $props();
    const context = notchContext.get();
    $effect(() => {
        context.peek = children;
        return () => {
            context.peek = undefined;
        };
    });
</script>
