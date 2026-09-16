<script lang="ts">
    import { cn } from '@mielui/svelte/utils';
    import type { AvatarProps } from '.';
    import { setAvatarContext } from './context.svelte';
    import { avatar } from './variants';

    let {
        class: className,
        size = 'md',
        shape = 'circle',
        children,
        ...rest
    }: AvatarProps = $props();

    const ctx = $state({ loadedImages: {} as Record<string, boolean> });
    setAvatarContext(ctx);
</script>

<span data-ui="avatar" class={cn(className, avatar({ size, shape }))} {...rest}>
    {@render children?.()}
</span>
