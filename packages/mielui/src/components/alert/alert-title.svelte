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
        '[[data-alert-icon]~&]:col-start-2 m-0 min-w-0 text-[length:var(--font-size-header)] font-[number:var(--font-weight-header)] leading-snug break-words text-foreground'
    )}
>
    {@render children?.()}
</p>
