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
        'col-start-2 m-0 min-w-0 text-[length:var(--font-size-body)] font-medium [letter-spacing:var(--tracking-body)] leading-body break-words text-foreground'
    )}
>
    {@render children?.()}
</p>
