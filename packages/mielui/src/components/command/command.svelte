<script lang="ts">
    import * as Dialog from '@mielui/svelte/components/dialog';
    import { untrack } from 'svelte';
    import type { CommandProps, CommandState } from '.';
    import { resetCommand, setCommandContext } from './context.svelte';

    let { open = $bindable(false), onOpenChange, children }: CommandProps = $props();
    const id = $props.id();

    const command = $state<CommandState>({
        id,
        items: [],
        results: [],
        searchContent: '',
        activeId: undefined,
        itemsVersion: 0
    });
    setCommandContext(command);

    $effect(() => {
        if (open) {
            untrack(() => resetCommand(command));
        }
    });
</script>

<Dialog.Root bind:open {onOpenChange}> {@render children?.()} </Dialog.Root>
