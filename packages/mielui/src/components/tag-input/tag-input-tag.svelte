<script lang="ts">
    import X from '@lucide/svelte/icons/x';
    import { Button } from '@mielui/svelte/components/button';
    import { cn } from '@mielui/svelte/utils';
    import type { HTMLAttributes } from 'svelte/elements';
    import { badge } from '../badge/variants';
    import type { TagInputTagProps } from '.';
    import { getTagInputContext } from './context.svelte';

    let {
        value,
        index,
        removable = true,
        onRemove,
        class: className,
        children,
        ...rest
    }: TagInputTagProps = $props();

    const context = getTagInputContext();
    const canRemove = $derived(removable && !context.disabled);

    function remove() {
        if (onRemove) {
            onRemove(value);

            return;
        }

        if (index !== undefined) {
            context.removeAt(index);

            return;
        }

        context.removeValue(value);
    }

    function handleRemove(event: MouseEvent) {
        event.stopPropagation();

        if (!canRemove) {
            return;
        }

        remove();
        context.focusInput();
    }
</script>

{#snippet label()}
    <span class="min-w-0 flex-1 truncate">
        {#if children}
            {@render children()}
        {:else}
            {value}
        {/if}
    </span>
    {#if canRemove}
        <span
            data-ui="tag-input-tag-remove"
            aria-hidden="true"
            class="grid size-5 shrink-0 place-items-center rounded-full text-foreground-muted transition-colors group-hover:text-foreground"
        >
            <X size={12} strokeWidth={2.25} aria-hidden="true" class="size-3" />
        </span>
    {/if}
{/snippet}

{#if canRemove}
    <Button
        {...rest}
        type="button"
        unstyled
        size="sm"
        data-ui="tag-input-tag"
        aria-label={`Remove ${value}`}
        title={`Remove ${value}`}
        onclick={handleRemove}
        class={cn(
            className,
            'cursor-pointer focus-visible:outline-none focus-visible:shadow-[var(--focus-ring)]',
            'group h-auto max-w-full',
            badge({ variant: 'outline' })
        )}
    >
        {@render label()}
    </Button>
{:else}
    <span
        {...(rest as HTMLAttributes<HTMLSpanElement>)}
        data-ui="tag-input-tag"
        data-disabled={context.disabled || undefined}
        class={cn(
            className,
            'max-w-full',
            badge({ variant: 'outline' })
        )}
    >
        {@render label()}
    </span>
{/if}
