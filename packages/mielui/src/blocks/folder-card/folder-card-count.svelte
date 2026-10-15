<script lang="ts">
    import { numberShuffle } from '@mielui/svelte/actions/number-shuffle';
    import { cn } from '@mielui/svelte/utils';
    import type { FolderCardCountProps } from '.';
    import { findFolderCardLabels } from './context';

    let { value, class: className, ...rest }: FolderCardCountProps = $props();

    const labels = findFolderCardLabels();
    const formatter = new Intl.NumberFormat();

    const format = $derived.by(() => {
        const label = labels?.()?.count;
        const integer = Number.isInteger(value);

        return (next: number) => {
            const count = integer ? Math.round(next) : next;
            const formatted = formatter.format(count);

            if (label) {
                return label(count, formatted);
            }

            return `${formatted} ${count === 1 ? 'file' : 'files'}`;
        };
    });
</script>

<span
    data-ui="folder-card-count"
    {...rest}
    class={cn(
        className,
        'ms-auto font-mono text-[length:var(--font-size-label)] tabular-nums whitespace-nowrap text-[var(--folder-card-ink-muted)]'
    )}
    use:numberShuffle={{ value, format }}
>
    {format(value)}
</span>
