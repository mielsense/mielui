<script lang="ts">
    import { cn, pressable } from '@mielui/svelte/utils';
    import { ToggleGroup as BitsToggleGroup } from 'bits-ui';
    import { getContext } from 'svelte';
    import type { ToggleGroupContext, ToggleGroupItemProps } from '.';

    let { class: className, value, disabled, children, ...rest }: ToggleGroupItemProps = $props();
    const ctx = getContext<ToggleGroupContext>('toggle-group');

    const active = $derived(ctx.isActive(value));
    const isDisabled = $derived(disabled || ctx.disabled);
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
                'mielui-press inline-flex select-none items-center justify-center gap-1.5 rounded-[var(--radius-control)] [font-weight:var(--font-weight-label)] [letter-spacing:var(--tracking-label)] transition-[background-color,color,transform,scale] [transition-duration:var(--motion-duration-press)] ease-[var(--ease-press)] motion-reduce:transition-none focus-visible:outline-none focus-visible:shadow-[var(--focus-ring)] disabled:cursor-not-allowed disabled:opacity-[var(--opacity-disabled)]',
                sizes[ctx.size],
                active
                    ? 'bg-secondary text-foreground'
                    : 'relative z-10 bg-transparent text-foreground-muted hover:text-foreground'
            )}
        >
            {@render children?.()}
        </button>
    {/snippet}
</BitsToggleGroup.Item>
