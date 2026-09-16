<script lang="ts">
    import { cn, travelingHighlight } from '@mielui/svelte/utils';
    import { ToggleGroup as BitsToggleGroup } from 'bits-ui';
    import { setContext } from 'svelte';
    import type { ToggleGroupContext, ToggleGroupProps } from '.';

    let {
        class: className,
        type = 'single',
        value = $bindable<string | string[] | undefined>(),
        disabled = false,
        onValueChange,
        children,
        ...rest
    }: ToggleGroupProps = $props();

    function isActive(itemValue: string) {
        if (type === 'multiple') {
            return Array.isArray(value) && value.includes(itemValue);
        }
        return value === itemValue;
    }

    function updateValue(next: string | string[]) {
        value = next === '' ? undefined : next;
        onValueChange?.(value);
    }

    const ctx: ToggleGroupContext = {
        get type() {
            return type;
        },
        get disabled() {
            return disabled;
        },
        isActive,
        setValue: updateValue
    };
    setContext('toggle-group', ctx);
</script>

{#if type === 'multiple'}
    <BitsToggleGroup.Root
        type="multiple"
        value={Array.isArray(value) ? value : []}
        onValueChange={updateValue}
        {disabled}
        {...rest}
    >
        {#snippet child({ props })}
            <div
                {...props}
                data-ui="toggle-group"
                use:travelingHighlight
                class={cn(className, 'inline-flex items-center gap-1')}
            >
                {@render children?.()}
            </div>
        {/snippet}
    </BitsToggleGroup.Root>
{:else}
    <BitsToggleGroup.Root
        type="single"
        value={typeof value === 'string' ? value : ''}
        onValueChange={updateValue}
        {disabled}
        {...rest}
    >
        {#snippet child({ props })}
            <div
                {...props}
                data-ui="toggle-group"
                use:travelingHighlight
                class={cn(className, 'inline-flex items-center gap-1')}
            >
                {@render children?.()}
            </div>
        {/snippet}
    </BitsToggleGroup.Root>
{/if}
