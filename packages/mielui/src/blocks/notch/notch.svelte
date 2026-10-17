<script lang="ts">
    import type { NotchProps } from '.';
    import { setNotchContext } from './context';
    import { createNotchController } from './controller.svelte';

    let {
        open = $bindable(false),
        side = 'top',
        surface,
        mode = 'triggered',
        duration = 5000,
        labels,
        children
    }: NotchProps = $props();

    setNotchContext(
        createNotchController({
            get open() {
                return open;
            },
            set open(value) {
                open = value;
            },
            get side() {
                return side;
            },
            get surface() {
                return surface;
            },
            get mode() {
                return mode;
            },
            get duration() {
                return duration;
            },
            get labels() {
                return labels;
            }
        })
    );
</script>

{@render children?.()}
