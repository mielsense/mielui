<script lang="ts">
    import { cn } from '@mielui/svelte/utils';
    import type { FieldsetLegendProps } from '.';

    let { children, class: className, ...rest }: FieldsetLegendProps = $props();
</script>

<legend
    {...rest}
    data-ui="fieldset-legend"
    class={cn(className, 'mb-4 [&:has(+[data-ui=fieldset-description])]:mb-1 [font-family:var(--font-header)] [font-size:var(--font-size-header)] [font-weight:var(--font-weight-header)] [letter-spacing:var(--tracking-header)] leading-snug text-foreground')}
>
    {@render children?.()}
</legend>
