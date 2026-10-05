<script lang="ts">
    import { Button } from '@mielui/svelte/components/button';
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
        context.value !== undefined && context.max !== undefined && context.value >= context.max
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
    aria-label={rest['aria-label'] ?? 'Increase value'}
    disabled={disabled || context.disabled || context.readonly || atBound}
    class={cn(
        rest.class,
        'size-[calc(var(--size-icon-md)-var(--border-size)*2)] min-w-[calc(var(--size-icon-md)-var(--border-size)*2)]'
    )}
    onclick={(event) => {
        onclick?.(event);
        if (!event.defaultPrevented) {
            context.change(1);
        }
    }}
>
    {#if children}
        {@render children()}
    {:else}
        <span aria-hidden="true">+</span>
    {/if}
</Button>
