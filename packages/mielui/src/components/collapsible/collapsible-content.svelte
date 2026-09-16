<script lang="ts">
    import { themedSlide } from '@mielui/svelte/transition';
    import { cn } from '@mielui/svelte/utils';
    import { Collapsible as BitsCollapsible } from 'bits-ui';
    import type { CollapsibleContentProps } from '.';

    let { class: className, children, ...rest }: CollapsibleContentProps = $props();
</script>

<BitsCollapsible.Content forceMount {...rest}>
    {#snippet child({ props, open })}
        {#if open}
            <div
                {...props}
                data-ui="collapsible-content"
                data-state="open"
                transition:themedSlide={{ durationVar: '--motion-duration-panel', fallback: 220 }}
                class={cn(className, 'overflow-hidden')}
            >
                {@render children?.()}
            </div>
        {/if}
    {/snippet}
</BitsCollapsible.Content>
