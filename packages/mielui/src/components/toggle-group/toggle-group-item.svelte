<script lang="ts">
    import { cn, pressable } from '@mielui/svelte/utils';
    import { ToggleGroup as BitsToggleGroup } from 'bits-ui';
    import { getContext } from 'svelte';
    import type { ToggleGroupContext, ToggleGroupItemProps } from '.';

    let { class: className, value, disabled, children, ...rest }: ToggleGroupItemProps = $props();
    const ctx = getContext<ToggleGroupContext>('toggle-group');

    const active = $derived(ctx.isActive(value));
    const isDisabled = $derived(disabled || ctx.disabled);
    const traveling = $derived(ctx.type === 'single' && !isDisabled);
    const sizes = {
        sm: 'h-[var(--size-control-sm)] px-3 [font-size:var(--font-size-label)]',
        md: 'h-[var(--size-control-md)] px-3.5 [font-size:var(--font-size-label)]',
        lg: 'h-[var(--size-control-lg)] px-4 [font-size:var(--font-size-button)]'
    };
</script>

<BitsToggleGroup.Item {value} disabled={isDisabled} {...rest} id={rest.id ?? undefined}>
    {#snippet child({ props })}
        <button
            {...props}
            type="button"
            use:pressable
            data-ui="toggle-group-item"
            data-collection-item
            data-collection-active={ctx.type === 'single' && active}
            data-state={active ? 'on' : 'off'}
            disabled={isDisabled}
            class={cn(
                className,
                'mielui-press relative z-10 inline-flex select-none items-center justify-center gap-1.5 rounded-[min(calc(var(--radius-control)-var(--spacing)),calc(var(--mielui-toggle-group-item)/2))] hover:cursor-[var(--ui-cursor-interactive)] [font-weight:var(--font-weight-label)] [letter-spacing:var(--tracking-label)] leading-none transition-[color,box-shadow,transform,scale] [transition-duration:var(--motion-duration-press)] ease-[var(--ease-press)] motion-reduce:transition-none focus-visible:outline-none focus-visible:shadow-[var(--focus-ring)] disabled:cursor-not-allowed disabled:opacity-[var(--opacity-disabled)] [&_svg]:pointer-events-none [&_svg]:shrink-0',
                sizes[ctx.size],
                active ? 'text-foreground' : 'bg-transparent text-foreground-muted hover:text-foreground',
                active &&
                    !traveling &&
                    'mielui-glow mielui-glow-neutral shadow-[var(--mielui-glow-shadow)] focus-visible:shadow-[var(--focus-ring),var(--mielui-glow-shadow)]'
            )}
        >
            {@render children?.()}
        </button>
    {/snippet}
</BitsToggleGroup.Item>
