<script lang="ts">
    import * as ColorPicker from '@mielui/svelte/components/color-picker';

    let value = $state('#5e6ad2');
</script>

<ColorPicker.Root bind:value label="Highlight color">
    <ColorPicker.Trigger />
    <ColorPicker.Content surface="glass" />
</ColorPicker.Root>
