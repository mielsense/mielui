<script lang="ts">
    import { cn } from '@mielui/svelte/utils';
    import { Collapsible as BitsCollapsible } from 'bits-ui';
    import { disclosureSlide } from '../_internal/disclosure/slide';
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
                transition:disclosureSlide
                class={cn(
                    className,
                    'overflow-hidden px-2 [font-size:var(--font-size-body)] [font-weight:var(--font-weight-body)] [letter-spacing:var(--tracking-body)] leading-relaxed text-foreground-muted'
                )}
            >
                {@render children?.()}
            </div>
        {/if}
    {/snippet}
</BitsCollapsible.Content>
