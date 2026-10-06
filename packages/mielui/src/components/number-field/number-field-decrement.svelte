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
        'size-[calc(var(--size-icon-md)-var(--border-size)*2)] min-w-[calc(var(--size-icon-md)-var(--border-size)*2)]'
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
