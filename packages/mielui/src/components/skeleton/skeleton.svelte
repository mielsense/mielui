<script lang="ts">
    import { fromAction } from 'svelte/attachments';
    import { shimmer } from '../../actions/shimmer';
    import { cn } from '@mielui/svelte/utils';
    import type { SkeletonProps } from '.';

    let {
        children,
        class: classProp,
        w: width,
        h: height,
        unit = 'px',
        variant = 'default',
        ...rest
    }: SkeletonProps = $props();
</script>

<!-- token-lint-disable-next-line -->
<div
    {@attach variant === 'shimmer' && fromAction(shimmer)}
    data-ui="skeleton"
    data-variant={variant}
    {...rest}
    class={cn(classProp, 'rounded-[var(--radius-md)] bg-secondary')}
    style:height={height == null ? undefined : `${height}${unit}`}
    style:width={width == null ? undefined : `${width}${unit}`}
>
    {@render children?.()}
</div>
