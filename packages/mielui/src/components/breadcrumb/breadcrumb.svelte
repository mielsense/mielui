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

<nav aria-label={ariaLabel} {...rest} class="min-w-0">
    <ol class={cn(className, 'flex min-w-0 flex-row items-center gap-0.5')}>
        {@render children?.()}
    </ol>
</nav>
