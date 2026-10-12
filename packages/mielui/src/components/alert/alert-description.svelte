<script lang="ts">
    import { cn } from '@mielui/svelte/utils';
    import type { AlertDescriptionProps } from '.';

    let { children, class: className, ...rest }: AlertDescriptionProps = $props();
</script>

<p
    {...rest}
    data-ui="alert-description"
    class={cn(
        className,
        'col-start-2 m-0 min-w-0 [font-size:var(--font-size-body)] leading-body [font-weight:var(--font-weight-body)] [letter-spacing:var(--tracking-body)] break-words text-pretty text-foreground-muted'
    )}
>
    {@render children?.()}
</p>
