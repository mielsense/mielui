<script lang="ts">
    import { cn } from '@mielui/svelte/utils';
    import type { FileDiffLineNumberProps } from '.';

    let { value, tone = 'context', class: className, ...rest }: FileDiffLineNumberProps = $props();

    const toneClass = $derived(
        tone === 'add'
            ? 'text-[var(--mielui-success-text)]'
            : tone === 'remove'
              ? 'text-[var(--mielui-error-text)]'
              : 'text-foreground-muted'
    );
</script>

<span
    data-ui="file-diff-line-number"
    data-tone={tone}
    aria-hidden="true"
    class={cn(
        className,
        'w-full shrink-0 truncate pr-2 text-right font-medium tabular-nums select-none',
        toneClass
    )}
    {...rest}
>
    {value ?? ''}
</span>
