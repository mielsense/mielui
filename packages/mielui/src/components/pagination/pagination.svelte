<script lang="ts">
    import {
        ArrowLeft01Icon as ChevronLeft,
        ArrowRight01Icon as ChevronRight,
        MoreHorizontalIcon as MoreHorizontal
    } from '@hugeicons/core-free-icons';
    import { cn, pressable } from '@mielui/svelte/utils';
    import HugeiconsIcon from '../../hugeicons-icon.svelte';
    import type { PaginationProps } from '.';

    let {
        class: className,
        page = $bindable(1),
        total,
        siblings = 1,
        onPageChange,
        labels,
        ...rest
    }: PaginationProps = $props();

    const totalPages = $derived(
        Number.isFinite(total)
            ? Math.min(Number.MAX_SAFE_INTEGER, Math.max(1, Math.floor(total)))
            : 1
    );
    const currentPage = $derived(
        Number.isFinite(page) ? Math.min(totalPages, Math.max(1, Math.floor(page))) : 1
    );
    const siblingCount = $derived(
        Number.isFinite(siblings) ? Math.min(100, Math.max(0, Math.floor(siblings))) : 1
    );

    const itemClasses =
        'mielui-press inline-flex h-[var(--size-icon-md)] min-w-[var(--size-icon-md)] items-center justify-center rounded-[var(--radius-control)] hover:cursor-[var(--ui-cursor-interactive)] transition-[background-color,color,box-shadow,transform,scale] [transition-duration:var(--motion-duration-press)] ease-[var(--ease-press)] motion-reduce:transition-none focus-visible:outline-none focus-visible:shadow-[var(--focus-ring)]';
    const arrowClasses = cn(
        itemClasses,
        'text-foreground-muted hover:bg-[var(--color-wash)] hover:text-foreground disabled:cursor-not-allowed disabled:opacity-[var(--opacity-disabled)]'
    );

    function go(next: number) {
        const clamped = Math.min(Math.max(next, 1), totalPages);
        if (clamped === page) {
            return;
        }
        page = clamped;
        onPageChange?.(clamped);
    }

    const pages = $derived.by(() => {
        const result: (number | 'ellipsis')[] = [];
        const start = Math.max(2, currentPage - siblingCount);
        const end = Math.min(totalPages - 1, currentPage + siblingCount);

        result.push(1);
        if (start > 2) {
            result.push('ellipsis');
        }
        for (let i = start; i <= end; i++) {
            result.push(i);
        }
        if (end < totalPages - 1) {
            result.push('ellipsis');
        }
        if (totalPages > 1) {
            result.push(totalPages);
        }
        return result;
    });
</script>

<nav
    data-ui="pagination"
    aria-label={labels?.navigation ?? 'Pagination'}
    class={cn(className, 'flex max-w-full flex-wrap select-none items-center gap-1')}
    {...rest}
>
    <button
        use:pressable
        type="button"
        aria-label={labels?.previous ?? 'Previous page'}
        disabled={currentPage <= 1}
        onclick={() => go(currentPage - 1)}
        class={arrowClasses}
    >
        <HugeiconsIcon icon={ChevronLeft} size={15} class="rtl:rotate-180" />
    </button>

    {#each pages as p, i (i)}
        {#if p === 'ellipsis'}
            <span
                aria-hidden="true"
                class="inline-flex size-[var(--size-icon-md)] items-center justify-center text-foreground-muted"
            >
                <HugeiconsIcon icon={MoreHorizontal} size={14} />
            </span>
        {:else}
            <button
                use:pressable
                type="button"
                aria-label={labels?.page?.(p)}
                aria-current={p === currentPage ? 'page' : undefined}
                onclick={() => go(p)}
                class={cn(
                    itemClasses,
                    'px-2 text-[length:var(--font-size-label)] tabular-nums [font-weight:var(--font-weight-button)] [letter-spacing:var(--tracking-button)] leading-none',
                    p === currentPage
                        ? 'mielui-glow mielui-glow-neutral text-foreground shadow-[var(--mielui-glow-shadow)] focus-visible:shadow-[var(--focus-ring),var(--mielui-glow-shadow)]'
                        : 'text-foreground-muted hover:bg-[var(--color-wash)] hover:text-foreground'
                )}
            >
                {p}
            </button>
        {/if}
    {/each}

    <button
        use:pressable
        type="button"
        aria-label={labels?.next ?? 'Next page'}
        disabled={currentPage >= totalPages}
        onclick={() => go(currentPage + 1)}
        class={arrowClasses}
    >
        <HugeiconsIcon icon={ChevronRight} size={15} class="rtl:rotate-180" />
    </button>
</nav>
