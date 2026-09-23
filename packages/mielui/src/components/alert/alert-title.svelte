<script lang="ts">
    import { cn } from '@mielui/svelte/utils';
    import type { AlertTitleProps } from '.';

    let { children, class: classProp, ...rest }: AlertTitleProps = $props();
</script>

<p
    {...rest}
    data-ui="alert-title"
    class={cn(
        classProp,
        `col-start-2 row-start-2 flex min-h-9 min-w-0 items-center py-1 pr-2 m-0 text-[length:var(--font-size-label)] font-[number:var(--font-weight-label)] leading-snug text-foreground`
    )}
>
    {@render children?.()}
</p>
