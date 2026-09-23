<script lang="ts">
    import { cn } from '@mielui/svelte/utils';
    import { LinkPreview } from 'bits-ui';
    import { getContext } from 'svelte';
    import type { HoverCardTriggerProps } from '.';

    let { class: className, children, href, ...rest }: HoverCardTriggerProps = $props();
    const hoverCard = getContext<{ open: boolean }>('mielui-hover-card');
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
