<script lang="ts">
    import { panelIn, panelOut } from '@mielui/svelte/transition';
    import { cn } from '@mielui/svelte/utils';
    import { getContext } from 'svelte';
    import type { AttachmentLabels, AttachmentListProps } from '.';
    import Item from './attachment-item.svelte';
    import { getAttachmentContext } from './context.svelte';

    let {
        label,
        variant = 'card',
        class: className,
        'aria-label': ariaLabel,
        ...rest
    }: AttachmentListProps = $props();
    const labels = getContext<(() => AttachmentLabels | undefined) | undefined>(
        'attachment-labels'
    );

    const context = getAttachmentContext();
    const edgeFades = {
        none: '',
        left: '[mask-image:linear-gradient(to_right,transparent,black_calc(var(--spacing)*8))]',
        right: '[mask-image:linear-gradient(to_left,transparent,black_calc(var(--spacing)*8))]',
        both: '[mask-image:linear-gradient(to_right,transparent,black_calc(var(--spacing)*8),black_calc(100%-var(--spacing)*8),transparent)]'
    };
    let hiddenLeft = $state(false);
    let hiddenRight = $state(false);
    const edgeFade = $derived(
        hiddenLeft && hiddenRight
            ? edgeFades.both
            : hiddenLeft
              ? edgeFades.left
              : hiddenRight
                ? edgeFades.right
                : edgeFades.none
    );

    function trackEdges(list: HTMLUListElement) {
        const measure = () => {
            const range = list.scrollWidth - list.clientWidth;
            const rtl = getComputedStyle(list).direction === 'rtl';
            const fromLeft = rtl ? range + list.scrollLeft : list.scrollLeft;

            hiddenLeft = range > 1 && fromLeft > 1;
            hiddenRight = range > 1 && fromLeft < range - 1;
        };
        const resizeObserver = new ResizeObserver(measure);
        const mutationObserver = new MutationObserver(measure);

        resizeObserver.observe(list);
        mutationObserver.observe(list, {
            childList: true
        });
        list.addEventListener('scroll', measure, {
            passive: true
        });
        measure();

        return () => {
            resizeObserver.disconnect();
            mutationObserver.disconnect();
            list.removeEventListener('scroll', measure);
        };
    }
</script>

{#if context.files.length > 0}
    <ul
        {@attach variant === 'chip' ? trackEdges : undefined}
        {...rest}
        data-ui="attachment-list"
        data-state="populated"
        data-variant={variant}
        aria-label={ariaLabel ?? label ?? labels?.()?.list ?? 'Attachments'}
        class={cn(
            className,
            variant === 'chip'
                ? cn(
                      edgeFade,
                      'flex min-w-0 flex-none items-center gap-1.5 overflow-x-auto overscroll-x-contain [scrollbar-width:none] [&::-webkit-scrollbar]:hidden'
                  )
                : 'flex min-w-0 flex-col gap-2 sm:flex-row sm:flex-wrap'
        )}
    >
        {#each context.files as file (file)}
            <li
                in:panelIn
                out:panelOut
                class={variant === 'chip' ? 'flex shrink-0' : 'min-w-0 sm:w-72 sm:flex-none'}
            >
                <Item {file} {variant} onRemove={context.remove} removable={!context.disabled} />
            </li>
        {/each}
    </ul>
{/if}
