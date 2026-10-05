<script lang="ts">
    import { numberShuffle } from '@mielui/svelte/actions/number-shuffle';
    import { cn } from '@mielui/svelte/utils';
    import type { FolderCardCountProps } from '.';

    let { value, unit = 'files', class: className, ...rest }: FolderCardCountProps = $props();

    const formatter = new Intl.NumberFormat();

    const format = $derived((next: number) => {
        const amount = formatter.format(Number.isInteger(value) ? Math.round(next) : next);

        if (!unit) {
            return amount;
        }

        return `${amount} ${unit}`;
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
