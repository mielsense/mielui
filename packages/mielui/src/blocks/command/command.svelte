<script lang="ts">
    import * as Dialog from '@mielui/svelte/components/dialog';
    import { untrack } from 'svelte';
    import type { CommandProps } from '.';
    import { resetCommand, setCommandContext } from './context.svelte';
    import { createCommandController } from './controller.svelte';

    let { open = $bindable(false), onOpenChange, children }: CommandProps = $props();
    const id = $props.id();

    const controller = createCommandController(id);
    const command = controller.state;
    setCommandContext(controller);

    $effect(() => {
        if (open) {
            untrack(() => resetCommand(command));
        }
    });
</script>

<Dialog.Root bind:open {onOpenChange}>{@render children?.()} </Dialog.Root>
