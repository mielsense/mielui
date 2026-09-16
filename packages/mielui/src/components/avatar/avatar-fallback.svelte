<script lang="ts">
    import { cn } from '@mielui/svelte/utils';
    import type { AvatarFallbackProps } from '.';
    import { getAvatarContext } from './context.svelte';

    let { class: className, children, ...rest }: AvatarFallbackProps = $props();
    const ctx = getAvatarContext();
    const imageLoaded = $derived(Object.values(ctx.loadedImages).some(Boolean));
</script>

{#if !imageLoaded}
    <span class={cn(className, 'flex h-full w-full items-center justify-center')} {...rest}>
        {@render children?.()}
    </span>
{/if}
