<script lang="ts">
    import { cn } from '@mielui/svelte/utils';
    import { LinkPreview } from 'bits-ui';
    import type { HoverCardTriggerProps } from '.';
    import { getHoverCardContext } from './context.svelte';

    let { class: className, children, href, ...rest }: HoverCardTriggerProps = $props();
    const hoverCard = getHoverCardContext();
</script>

<LinkPreview.Trigger {href} {...rest}>
    {#snippet child({ props })}
        {#if href}
            <a
                {...props}
                role="link"
                class={cn(className, 'underline decoration-foreground-muted underline-offset-2 hover:decoration-foreground')}
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
                class={cn(className, 'inline-flex')}
            >
                {@render children?.()}
            </button>
        {/if}
    {/snippet}
</LinkPreview.Trigger>
