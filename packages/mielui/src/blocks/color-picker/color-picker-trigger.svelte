<!-- token-lint-disable-file -->
<script lang="ts">
    import * as Popover from '@mielui/svelte/components/popover';
    import { cn } from '@mielui/svelte/utils';
    import { getColorPickerContext } from './context';
    import { isValidHex } from './conversions';

    type Props = {
        /** Trigger style -- matches Button variants. Defaults to outlined. */
        variant?: 'outline' | 'secondary' | 'ghost';
        class?: string;
    };

    let { variant = 'outline', class: className }: Props = $props();

    const ctx = getColorPickerContext();
    const selectedLabel = $derived(
        ctx.options.find((o) => o.value.toLowerCase() === (ctx.value ?? '').toLowerCase())?.label ??
            null
    );
    const valueLabel = $derived(selectedLabel ?? (ctx.value || 'Choose color'));
    const triggerLabel = $derived(ctx.label ? `${ctx.label}: ${valueLabel}` : valueLabel);
</script>

<Popover.Trigger
    aria-label={triggerLabel}
    {variant}
    class={cn(
        className,
        'group w-full justify-start gap-2 ps-2 pe-[calc(var(--spacing)*3.5)]',
        variant === 'outline' &&
            '[font-weight:var(--font-weight-body)] hover:border-[var(--color-border-strong)] hover:bg-[var(--color-field)] focus-visible:border-primary data-[state=open]:border-[var(--color-border-strong)] data-[state=open]:bg-[var(--color-field)]'
    )}
>
    <span
        class="size-5 shrink-0 self-center rounded-full shadow-[inset_0_0_0_var(--border-size)_var(--color-border)]"
        style:background={isValidHex(ctx.value) ? ctx.value : '#888888'}
    ></span>
    <span
        class={cn(
            'min-w-0 flex-1 truncate text-start text-foreground',
            selectedLabel ? '[font-size:var(--font-size-button)]' : 'font-mono text-xs'
        )}
    >
        {valueLabel}
    </span>
</Popover.Trigger>
