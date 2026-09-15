<script lang="ts">
    import { cn } from '@mielui/svelte/utils';
    import type { DialogHeaderProps } from '.';
    import { getDialogContext } from './context.svelte';

    let { class: className, children, ...rest }: DialogHeaderProps = $props();
    const dialog = getDialogContext();
</script>

<div
    {...rest}
    data-ui="dialog-header"
    data-orientation={dialog.state.orientation}
    class={cn(className, 'flex flex-col gap-1.5')}
>
    {@render children?.()}
</div>
