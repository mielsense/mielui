<script lang="ts">
    import { cn } from '@mielui/svelte/utils';
    import type { ColorPickerPreviewProps } from '.';
    import { getColorPickerController } from './controller.svelte';

    let { class: className, ...rest }: ColorPickerPreviewProps = $props();
    const controller = getColorPickerController();
</script>

<span
    {...rest}
    data-ui="color-picker-preview"
    aria-hidden="true"
    class={cn(className, 'block size-7 shrink-0 rounded-[var(--radius-md)] ring-1 ring-inset ring-border')}
    style:background={controller.previewHex}
></span>
