<script lang="ts">
    import { cn } from '@mielui/svelte/utils';
    import { tick } from 'svelte';
    import type { ReorderListHandleProps } from '.';
    import { getReorderItem, getReorderList } from './context.svelte';

    let {
        children,
        class: className,
        disabled = false,
        onkeydown,
        onpointerdown,
        onblur,
        ondragstart,
        'aria-describedby': describedBy,
        ...rest
    }: ReorderListHandleProps = $props();
    const root = getReorderList();
    const item = getReorderItem();
</script>
<button
    {...rest}
    type="button"
    data-ui="reorder-list-handle"
    data-reorder-id={item.id}
    disabled={disabled || root.disabled}
    aria-label={item.label}
    aria-pressed={root.lifted(item.id)}
    aria-describedby={[describedBy, root.hintId].filter(Boolean).join(' ')}
    onkeydown={(event) => { onkeydown?.(event); if (!event.defaultPrevented) { root.keydown(event, item.id); } }}
    onpointerdown={(event) => { onpointerdown?.(event); if (!event.defaultPrevented) { root.pointerdown(event, item.id); } }}
    onblur={(event) => {
        onblur?.(event);
        const handle = event.currentTarget;
        void tick().then(() => {
            if (root.held(item.id) && document.activeElement !== handle) {
                root.cancel();
            }
        });
    }}
    ondragstart={(event) => { ondragstart?.(event); event.preventDefault(); }}
    class={cn(className, 'flex size-7 shrink-0 touch-pinch-zoom select-none items-center justify-center rounded-[var(--radius-sm)] text-foreground-muted outline-none hover:text-foreground focus-visible:shadow-[var(--focus-ring)] disabled:cursor-not-allowed', root.lifted(item.id) ? 'cursor-grabbing' : 'cursor-grab')}
>
    {#if children}
        {@render children()}
    {:else}
        <svg aria-hidden="true" viewBox="0 0 10 14" class="h-3.5 w-2.5 fill-current">
            <circle cx="2.5" cy="2.5" r="1.2" />
            <circle cx="7.5" cy="2.5" r="1.2" />
            <circle cx="2.5" cy="7" r="1.2" />
            <circle cx="7.5" cy="7" r="1.2" />
            <circle cx="2.5" cy="11.5" r="1.2" />
            <circle cx="7.5" cy="11.5" r="1.2" />
        </svg>
    {/if}
</button>
