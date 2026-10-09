<script lang="ts">
    import { MinusSignIcon } from '@hugeicons/core-free-icons';
    import { Button } from '@mielui/svelte/components/button';
    import HugeiconsIcon from '@mielui/svelte/hugeicons-icon';
    import { cn } from '@mielui/svelte/utils';
    import { buttonAttributes } from '../_internal/button-attributes';
    import type { NumberFieldStepperProps } from '.';
    import { getNumberFieldContext } from './context';

    let {
        children,
        element = $bindable(),
        disabled,
        onclick,
        ...rest
    }: NumberFieldStepperProps = $props();
    const context = getNumberFieldContext();
    const atBound = $derived(
        context.value !== undefined && context.min !== undefined && context.value <= context.min
    );
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
    aria-label={rest['aria-label'] ?? 'Decrease value'}
    disabled={disabled || context.disabled || context.readonly || atBound}
    class={cn(
        rest.class,
        'relative h-auto w-[var(--size-control-md)] min-w-[var(--size-control-md)] shrink-0 rounded-none border-0 border-[var(--color-input)] text-foreground-muted hover:text-foreground focus-visible:z-10 first:rounded-s-[calc(var(--radius-control)-var(--border-size))] first:ps-0.5 not-first:border-s-[length:var(--border-size)] last:rounded-e-[calc(var(--radius-control)-var(--border-size))] last:pe-0.5 has-[+input]:border-e-[length:var(--border-size)]'
    )}
    onclick={(event) => {
        onclick?.(event);
        if (!event.defaultPrevented) {
            context.change(-1);
        }
    }}
>
    {#if children}
        {@render children()}
    {:else}
        <HugeiconsIcon icon={MinusSignIcon} size={14} aria-hidden="true" />
    {/if}
</Button>
