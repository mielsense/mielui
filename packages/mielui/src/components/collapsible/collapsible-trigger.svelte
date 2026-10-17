<script lang="ts">
    import { cn, pressable } from '@mielui/svelte/utils';
    import { Collapsible as BitsCollapsible } from 'bits-ui';
    import { disclosureTrigger } from '../_internal/disclosure/variants';
    import type { CollapsibleTriggerProps } from '.';

    let { class: className, children, ...rest }: CollapsibleTriggerProps = $props();
</script>

<BitsCollapsible.Trigger {...rest} id={rest.id ?? undefined}>
    {#snippet child({ props })}
        <button
            {...props}
            type="button"
            use:pressable
            data-ui="collapsible-trigger"
            class={cn(
                className,
                '[font-size:var(--font-size-body)] font-medium text-foreground',
                disclosureTrigger({ layout: 'inline' })
            )}
        >
            {@render children?.()}
        </button>
    {/snippet}
</BitsCollapsible.Trigger>
