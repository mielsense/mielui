<script lang="ts">
    import { getContext, onMount } from 'svelte';
    import { overlaySurface } from '../_internal/surface';
    import type { TooltipContentProps, TooltipState } from '.';
    import type { TooltipContentState } from './manager-context';

    let { children, class: className, surface, rich = false }: TooltipContentProps = $props();

    const tip = getContext('mielui-tooltip') as TooltipState;

    const content = getContext<TooltipContentState>('mielui-tooltip-content');

    const descriptionId = getContext<string>('mielui-tooltip-id');
    let el = $state<HTMLElement>();

    $effect(() => {
        content.node = el;
        content.rich = rich;
        tip.className = [overlaySurface(surface), className ?? ''].join(' ');
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

<span bind:this={el} id={descriptionId} role="tooltip" hidden>
    {@render children?.()}
</span>
