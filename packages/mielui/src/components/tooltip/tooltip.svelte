<script lang="ts">
    import { setContext, untrack } from 'svelte';
    import type { TooltipProps, TooltipState } from '.';
    import type { TooltipContentState } from './manager-context';

    let { children, delay = 125, closeDelay = 100, placement = 'top' }: TooltipProps = $props();

    const tip = $state<TooltipState>(
        untrack(() => ({
            text: '',
            placement,
            delay,
            closeDelay,
            className: ''
        }))
    );

    $effect(() => {
        tip.placement = placement;
        tip.delay = delay;
        tip.closeDelay = closeDelay;
    });

    const content = $state<TooltipContentState>({ rich: false, revision: 0 });
    setContext('mielui-tooltip-content', content);
    setContext('mielui-tooltip', tip);
    const id = $props.id();
    setContext('mielui-tooltip-id', `tooltip-${id}`);
</script>

{@render children?.()}
