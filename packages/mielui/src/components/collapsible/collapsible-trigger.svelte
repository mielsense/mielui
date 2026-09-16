<script lang="ts">
    import { cn, pressable } from '@mielui/svelte/utils';
    import { Collapsible as BitsCollapsible } from 'bits-ui';
    import type { CollapsibleTriggerProps } from '.';

    let { class: className, children, ...rest }: CollapsibleTriggerProps = $props();
</script>

<BitsCollapsible.Trigger {...rest}>
    {#snippet child({ props })}
        <button
            {...props}
            type="button"
            use:pressable
            data-ui="collapsible-trigger"
            class={cn(
        className,
        'mielui-press inline-flex items-center gap-2 transition-[transform,scale] [transition-duration:var(--motion-duration-press)] ease-[var(--ease-press)] motion-reduce:transition-none focus-visible:outline-none focus-visible:shadow-[var(--focus-ring)]'
    )}
        >
            {@render children?.()}
        </button>
    {/snippet}
</BitsCollapsible.Trigger>
