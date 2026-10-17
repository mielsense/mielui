<script lang="ts">
    import { cn } from '@mielui/svelte/utils';
    import type { DialogHeaderProps } from '.';

    let { class: className, children, ...rest }: DialogHeaderProps = $props();
</script>

<div {...rest} data-ui="dialog-header" class={cn(className, 'flex flex-col gap-1.5')}>
    {@render children?.()}
</div>
