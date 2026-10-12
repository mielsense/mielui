<script lang="ts">
    import { onMount } from 'svelte';
    import { tooltipSurface } from '../_internal/surface';
    import type { TooltipContentProps } from '.';
    import { getTooltipContext } from './manager-context';

    let { children, class: className, surface, rich = false }: TooltipContentProps = $props();

    const { tip, content, descriptionId } = getTooltipContext();
    let el = $state<HTMLElement>();

    $effect(() => {
        content.node = el;
        content.rich = rich;
        tip.className = [tooltipSurface(surface), className ?? ''].join(' ');
    });

    onMount(() => {
        if (!el) {
            return;
        }
        const sync = () => {
            tip.text = (el?.textContent ?? '').replace(/\s+/g, ' ').trim();
            content.revision += 1;
        };
        sync();
        const mo = new MutationObserver(sync);
        mo.observe(el, { childList: true, characterData: true, subtree: true, attributes: true });
        return () => mo.disconnect();
    });
</script>

<span bind:this={el} id={descriptionId} role="tooltip" hidden> {@render children?.()} </span>
