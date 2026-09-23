<script lang="ts">
    import { cn } from '@mielui/svelte/utils';
    import type { DialogBodyProps } from '.';

    let { class: className, children, ...rest }: DialogBodyProps = $props();
</script>

<div {...rest} data-ui="dialog-body" class={cn(className, 'flex flex-col')}>
    {@render children?.()}
</div>
