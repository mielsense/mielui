<script lang="ts">
    import { Add01Icon, MinusSignIcon } from '@hugeicons/core-free-icons';
    import { Button } from '@mielui/svelte/components/button';
    import { cn } from '@mielui/svelte/utils';
    import HugeiconsIcon from '../../hugeicons-icon.svelte';
    import { buttonAttributes } from '../_internal/button-attributes';
    import type { NumberFieldStepperProps } from '.';
    import { getNumberFieldContext } from './context';

    type Props = NumberFieldStepperProps & {
        direction: 1 | -1;
    };

    let {
        direction,
        children,
        element = $bindable(),
        disabled,
        onclick,
        ...rest
    }: Props = $props();

    const context = getNumberFieldContext();
    const decreasing = $derived(direction < 0);
    const atBound = $derived.by(() => {
        if (context.value === undefined) {
            return false;
        }

        if (decreasing) {
            return context.min !== undefined && context.value <= context.min;
        }

        return context.max !== undefined && context.value >= context.max;
    });

    function setElement(node: HTMLButtonElement | HTMLAnchorElement | undefined) {
        element = node?.tagName === 'BUTTON' ? (node as HTMLButtonElement) : undefined;
    }
</script>

<Button
    {...buttonAttributes(rest)}
    bind:element={() => element, setElement}
    href={undefined}
    variant="ghost"
    size="icon"
    type="button"
    aria-label={rest['aria-label'] ?? (decreasing ? 'Decrease value' : 'Increase value')}
    disabled={disabled || context.disabled || context.readonly || atBound}
    class={cn(
        rest.class,
        'relative h-auto w-[var(--size-control-md)] min-w-[var(--size-control-md)] shrink-0 rounded-none border-0 border-[var(--color-input)] text-foreground-muted hover:text-foreground focus-visible:z-10 first:rounded-s-[calc(var(--radius-control)-var(--border-size))] first:ps-0.5 not-first:border-s-[length:var(--border-size)] last:rounded-e-[calc(var(--radius-control)-var(--border-size))] last:pe-0.5 has-[+input]:border-e-[length:var(--border-size)]'
    )}
    onclick={(event) => {
        onclick?.(event);

        if (!event.defaultPrevented) {
            context.change(direction);
        }
    }}
>
    {#if children}
        {@render children()}
    {:else}
        <HugeiconsIcon icon={decreasing ? MinusSignIcon : Add01Icon} size={14} aria-hidden="true" />
    {/if}
</Button>
