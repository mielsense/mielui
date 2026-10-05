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
        'group w-full justify-start gap-2 px-2.5 shadow-none focus-visible:shadow-[var(--focus-ring)]'
    )}
>
    <span
        class="size-5 shrink-0 self-center rounded-full ring-1 ring-inset ring-[color-mix(in_srgb,var(--color-foreground)_10%,transparent)]"
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
