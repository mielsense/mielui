<script lang="ts">
    import { cn } from '@mielui/svelte/utils';
    import { Toolbar as Primitive } from 'bits-ui';
    import type { ToolbarGroupProps } from '.';

    let {
        element = $bindable(null),
        value = $bindable<string | string[]>(),
        children,
        class: className,
        ...rest
    }: ToolbarGroupProps = $props();

    function updateMultiple(next: string[]) {
        value = next;
        if (rest.type === 'multiple') {
            rest.onValueChange?.(next);
        }
    }

    function updateSingle(next: string) {
        value = next;
        if (rest.type === 'single') {
            rest.onValueChange?.(next);
        }
    }
</script>
{#if rest.type === 'multiple'}
    <Primitive.Group
        {...rest}
        type="multiple"
        value={Array.isArray(value) ? value : []}
        onValueChange={updateMultiple}
        bind:ref={element}
        data-ui="toolbar-group"
        class={cn(className, 'flex items-center gap-1')}
    >
        {@render children?.()}
    </Primitive.Group>
{:else}
    <Primitive.Group
        {...rest}
        type="single"
        value={typeof value === 'string' ? value : ''}
        onValueChange={updateSingle}
        bind:ref={element}
        data-ui="toolbar-group"
        class={cn(className, 'flex items-center gap-1')}
    >
        {@render children?.()}
    </Primitive.Group>
{/if}
