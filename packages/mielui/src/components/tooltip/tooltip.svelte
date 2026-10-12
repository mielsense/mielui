<script lang="ts">
    import type { TooltipProps, TooltipState } from '.';
    import { setTooltipContext, type TooltipContentState } from './manager-context';

    let { children, delay = 125, closeDelay = 100, placement = 'top' }: TooltipProps = $props();

    const id = $props.id();
    let text = $state('');
    let className = $state('');
    const content = $state<TooltipContentState>({ rich: false, revision: 0 });

    const tip: TooltipState = {
        get text() {
            return text;
        },
        set text(next) {
            text = next;
        },
        get className() {
            return className;
        },
        set className(next) {
            className = next;
        },
        get placement() {
            return placement;
        },
        get delay() {
            return delay;
        },
        get closeDelay() {
            return closeDelay;
        }
    };

    setTooltipContext({
        descriptionId: `tooltip-${id}`,
        tip,
        content
    });
</script>

{@render children?.()}
