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

<li class="flex min-w-0 items-center">
    <a
        {...rest}
        {href}
        aria-current={current ? 'page' : undefined}
        class={cn(
            className,
            'rounded-[var(--radius-sm)] [font-size:var(--font-size-body)] outline-none transition-colors [transition-duration:var(--motion-duration-hover)] focus-visible:shadow-[var(--focus-ring)]',
            current
                ? 'text-foreground [font-weight:var(--font-weight-header)] [letter-spacing:var(--tracking-body)]'
                : 'text-foreground-muted hover:text-foreground'
        )}
    >
        {@render children?.()}
    </a>
</li>
