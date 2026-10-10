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
            'inline-flex min-h-[calc(var(--size-control-sm)-var(--size-hairline))] min-w-0 items-center gap-1.5 rounded-[var(--radius-control)] px-2 [font-size:var(--font-size-body)] [letter-spacing:var(--tracking-body)] leading-tight outline-none transition-[background-color,color,box-shadow] [transition-duration:var(--motion-duration-hover)] ease-[var(--ease-out)] motion-reduce:transition-none focus-visible:shadow-[var(--focus-ring)] [&_svg]:shrink-0',
            current
                ? 'text-foreground [font-weight:var(--font-weight-header)]'
                : 'text-foreground-muted hover:bg-[var(--color-wash)] hover:text-foreground'
        )}
    >
        {@render children?.()}
    </a>
</li>
