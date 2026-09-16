<script lang="ts">
    import { getContext, onMount } from 'svelte';
    import { overlaySurface } from '../_internal/surface';
    import type { TooltipContentProps, TooltipState } from '.';

    let { children, class: className, surface = 'solid' }: TooltipContentProps = $props();

    const tip = getContext('mielui-tooltip') as TooltipState;

    const descriptionId = getContext<string>('mielui-tooltip-id');
    let el = $state<HTMLElement>();

    $effect(() => {
        tip.className = [overlaySurface(surface), className ?? ''].join(' ');
    });

    onMount(() => {
        if (!el) {
            return;
        }
        const sync = () => {
            tip.text = (el?.textContent ?? '').replace(/\s+/g, ' ').trim();
        };
        sync();
        const mo = new MutationObserver(sync);
        mo.observe(el, { childList: true, characterData: true, subtree: true });
        return () => mo.disconnect();
    });
</script>

<span bind:this={el} id={descriptionId} role="tooltip" class="sr-only">
    {@render children?.()}
</span>
