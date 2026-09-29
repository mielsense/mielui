<script lang="ts">
    import { cn } from '@mielui/svelte/utils';
    import type { AlertDescriptionProps } from '.';

    let { children, class: classProp, ...rest }: AlertDescriptionProps = $props();
</script>

<p
    {...rest}
    data-ui="alert-description"
    class={cn(
        classProp,
        '[[data-alert-icon]~&]:col-start-2 m-0 min-w-0 [font-size:var(--font-size-body)] leading-body [font-weight:var(--font-weight-body)] [letter-spacing:var(--tracking-body)] break-words text-foreground-muted'
    )}
>
    {@render children?.()}
</p>
