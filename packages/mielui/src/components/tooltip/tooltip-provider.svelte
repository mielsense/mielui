<script lang="ts">
    import { onDestroy } from 'svelte';
    import type { TooltipProviderProps } from '.';
    import { setTooltipManager } from './manager-context';
    import { createTooltipManager } from './shared-tooltip';

    let { children }: TooltipProviderProps = $props();
    const manager = createTooltipManager();
    setTooltipManager(manager);
    onDestroy(manager.destroy);
</script>

{@render children?.()}
