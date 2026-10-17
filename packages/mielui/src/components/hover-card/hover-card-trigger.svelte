<script lang="ts">
    import { cn } from '@mielui/svelte/utils';
    import { LinkPreview } from 'bits-ui';
    import type { HoverCardTriggerProps } from '.';
    import { getHoverCardContext } from './context';

    let { class: className, children, href, ...rest }: HoverCardTriggerProps = $props();
    const hoverCard = getHoverCardContext();
</script>

<LinkPreview.Trigger {href} {...rest}>
    {#snippet child({ props })}
        {#if href}
            <a
                {...props}
                role="link"
                class={cn(
                    className,
                    'rounded-[var(--radius-sm)] underline decoration-foreground-muted underline-offset-2 hover:decoration-foreground focus-visible:shadow-[var(--focus-ring)] focus-visible:outline-none'
                )}
            >
                {@render children?.()}
            </a>
        {:else}
            <button
                {...props}
                type="button"
                onclick={() => {
                    hoverCard.open = !hoverCard.open;
                }}
                class={cn(
                    className,
                    'inline-flex rounded-[var(--radius-control)] focus-visible:shadow-[var(--focus-ring)] focus-visible:outline-none'
                )}
            >
                {@render children?.()}
            </button>
        {/if}
    {/snippet}
</LinkPreview.Trigger>
