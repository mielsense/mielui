<script lang="ts">
    import { cn } from '@mielui/svelte/utils';
    import { Separator as Primitive } from 'bits-ui';
    import type { SeparatorProps } from '.';

    let {
        element = $bindable(null),
        orientation = 'horizontal',
        class: className,
        ...rest
    }: SeparatorProps = $props();
</script>
<Primitive.Root
    {...rest}
    bind:ref={element}
    {orientation}
    data-ui="separator"
    class={cn(className, 'shrink-0 bg-border', orientation === 'horizontal' ? 'h-px w-full' : 'h-full min-h-4 w-px')}
/>
