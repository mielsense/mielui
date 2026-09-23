<script lang="ts">
    import Content from './catalog/content.svelte';
    import Controls from './catalog/controls.svelte';
    import Data from './catalog/data.svelte';
    import Surfaces from './catalog/surfaces.svelte';

    let { slug }: { slug: string } = $props();
</script>

<div
    aria-hidden="true"
    inert
    class="pointer-events-none flex h-40 w-full select-none items-center justify-center overflow-hidden px-6 py-4 text-xs text-foreground"
>
    {#if ['button', 'calendar', 'range-calendar', 'date-picker', 'date-range-picker', 'checkbox', 'radio-group', 'select', 'native-select', 'combobox', 'dropdown-menu', 'context-menu', 'command', 'input', 'label', 'field', 'textarea', 'number-field', 'tag-input', 'otp-field', 'fieldset', 'form', 'file-upload', 'group', 'toggle-group', 'toolbar', 'toggle', 'progress', 'slider', 'switch', 'color-picker', 'copy-button'].includes(slug)}
        <Controls {slug} />
    {:else if ['accordion', 'collapsible', 'alert', 'toast', 'alert-dialog', 'dialog', 'card', 'empty-state', 'hover-card', 'popover', 'tooltip', 'scroll-area', 'sheet', 'drawer', 'notch'].includes(slug)}
        <Surfaces {slug} />
    {:else if ['avatar', 'badge', 'breadcrumb', 'kbd', 'pagination', 'separator', 'skeleton', 'spinner', 'tabs', 'typography', 'markdown', 'code-block', 'file-diff', 'reorder-list', 'task-steps', 'show-more', 'attachment', 'composer', 'conversation', 'message', 'question', 'reasoning', 'response-stream', 'tool', 'morph', 'shimmer'].includes(slug)}
        <Content {slug} />
    {:else if ['table', 'data-table', 'chart', 'gauge', 'heatmap', 'pie-chart'].includes(slug)}
        <Data {slug} />
    {/if}
</div>
