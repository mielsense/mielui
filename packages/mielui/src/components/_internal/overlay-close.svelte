<script lang="ts">
    import { Cancel01Icon } from '@hugeicons/core-free-icons';
    import { cn } from '@mielui/svelte/utils';
    import type { Snippet } from 'svelte';
    import type { HTMLButtonAttributes } from 'svelte/elements';
    import HugeiconsIcon from '../../hugeicons-icon.svelte';
    import { Button } from '../button';
    import { buttonAttributes } from './button-attributes';

    type OverlayCloseProps = Omit<HTMLButtonAttributes, 'children' | 'class' | 'type'> & {
        class?: string;
        children?: Snippet;
    };

    let {
        'aria-label': label = 'Close',
        class: className,
        children,
        ...rest
    }: OverlayCloseProps = $props();
</script>

<Button
    {...buttonAttributes(rest)}
    type="button"
    variant="ghost"
    size="icon"
    aria-label={label}
    class={cn(
        className,
        'absolute top-4 right-3 z-[2] size-[var(--size-control-sm)] min-w-[var(--size-control-sm)] text-foreground-muted hover:text-foreground after:absolute after:-inset-[calc((var(--size-touch)-var(--size-control-sm))/2)]'
    )}
>
    {#if children}
        {@render children()}
    {:else}
        <HugeiconsIcon icon={Cancel01Icon} size={14} />
    {/if}
</Button>
