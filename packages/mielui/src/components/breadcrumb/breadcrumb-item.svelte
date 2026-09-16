<script lang="ts">
    import { cn } from '@mielui/svelte/utils';
    import type { BreadcrumbItemProps } from '.';

    let {
        href,
        current = false,
        class: className,
        children,
        ...rest
    }: BreadcrumbItemProps = $props();
</script>

<a
    {...rest}
    {href}
    aria-current={current ? 'page' : undefined}
    class={cn(
        className,
        `${current ? 'text-foreground [font-size:var(--font-size-body)] [font-weight:var(--font-weight-header)] [letter-spacing:var(--tracking-body)]' : 'text-foreground-muted hover:text-foreground [transition-duration:var(--motion-duration-panel)]'} [font-size:var(--font-size-body)]`
    )}
>
    {@render children?.()}
</a>
