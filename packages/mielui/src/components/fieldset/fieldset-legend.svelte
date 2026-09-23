<script lang="ts">
    import { cn } from '@mielui/svelte/utils';
    import type { FieldsetLegendProps } from '.';

    let { children, class: className, ...rest }: FieldsetLegendProps = $props();
</script>

<legend
    {...rest}
    data-ui="fieldset-legend"
    class={cn(className, 'mb-4 text-base font-header leading-snug text-foreground')}
>
    {@render children?.()}
</legend>
