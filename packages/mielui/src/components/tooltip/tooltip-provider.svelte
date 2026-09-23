<script lang="ts">
    import { onDestroy, setContext } from 'svelte';
    import type { TooltipProviderProps } from '.';
    import { tooltipManagerKey } from './manager-context';
    import { createTooltipManager } from './shared-tooltip';

    let { children }: TooltipProviderProps = $props();
    const manager = createTooltipManager();
    setContext(tooltipManagerKey, manager);
    onDestroy(manager.destroy);
</script>

{@render children?.()}
