<script lang="ts">
    import { cn } from '@mielui/svelte/utils';
    import type { BreadcrumbProps } from '.';

    let {
        class: className,
        children,
        'aria-label': ariaLabel = 'Breadcrumb',
        ...rest
    }: BreadcrumbProps = $props();
</script>

<nav aria-label={ariaLabel} {...rest} class={cn(className, 'flex flex-row items-center gap-2')}>
    {@render children?.()}
</nav>
