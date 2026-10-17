<script lang="ts">
    import { cn, travelingHighlight } from '@mielui/svelte/utils';
    import { ToggleGroup as BitsToggleGroup } from 'bits-ui';
    import type { ToggleGroupProps } from '.';
    import { setToggleGroupContext } from './context';

    let {
        class: className,
        value = $bindable<string | string[] | undefined>(),
        disabled = false,
        size = 'sm',
        children,
        ...mode
    }: ToggleGroupProps = $props();

    const type = $derived(mode.type ?? 'single');
    const attributes = $derived.by(() => {
        const { type, onValueChange, ...rest } = mode;
        return rest;
    });

    function isActive(itemValue: string) {
        if (type === 'multiple') {
            return Array.isArray(value) && value.includes(itemValue);
        }
        return value === itemValue;
    }

    function updateValue(next: string | string[]) {
        if (mode.type === 'multiple') {
            if (!Array.isArray(next)) {
                return;
            }
            value = next;
            mode.onValueChange?.(next);
        } else {
            if (Array.isArray(next)) {
                return;
            }
            const selected = next === '' ? undefined : next;
            value = selected;
            mode.onValueChange?.(selected);
        }
    }

    setToggleGroupContext({
        get type() {
            return type;
        },
        get disabled() {
            return disabled;
        },
        get size() {
            return size;
        },
        isActive,
        setValue: updateValue
    });

    const selection = {
        itemSelector: '[data-collection-item][data-collection-active="true"]'
    };
    const track =
        'relative inline-flex items-center gap-1 rounded-[min(var(--radius-control),calc(var(--mielui-toggle-group-item)/2+var(--spacing)))] bg-secondary p-1 data-[size=sm]:[--mielui-toggle-group-item:var(--size-control-sm)] data-[size=md]:[--mielui-toggle-group-item:var(--size-control-md)] data-[size=lg]:[--mielui-toggle-group-item:var(--size-control-lg)]';

    /**
     * Dresses the shared traveling highlight as the neutral lit pill. Must run
     * after `travelingHighlight`, which creates the element.
     */
    function litPill(node: HTMLElement) {
        const pill = node.querySelector(':scope > .mielui-item-highlight');

        pill?.classList.add(
            'mielui-glow',
            'mielui-glow-neutral',
            'absolute',
            'rounded-[min(calc(var(--radius-control)-var(--spacing)),calc(var(--mielui-toggle-group-item)/2))]',
            'shadow-[var(--mielui-glow-shadow)]'
        );
    }
</script>

{#snippet group(props: Record<string, unknown>)}
    <div
        {...props}
        data-ui="toggle-group"
        data-size={size}
        use:travelingHighlight={selection}
        use:litPill
        class={cn(className, track)}
    >
        {@render children?.()}
    </div>
{/snippet}

{#if type === 'multiple'}
    <BitsToggleGroup.Root
        type="multiple"
        value={Array.isArray(value) ? value : []}
        onValueChange={updateValue}
        {disabled}
        {...attributes}
    >
        {#snippet child({ props })}
            {@render group(props)}
        {/snippet}
    </BitsToggleGroup.Root>
{:else}
    <BitsToggleGroup.Root
        type="single"
        value={typeof value === 'string' ? value : ''}
        onValueChange={updateValue}
        {disabled}
        {...attributes}
    >
        {#snippet child({ props })}
            {@render group(props)}
        {/snippet}
    </BitsToggleGroup.Root>
{/if}
