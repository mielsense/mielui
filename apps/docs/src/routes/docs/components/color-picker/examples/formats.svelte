<script lang="ts">
    import * as ColorPicker from '@mielui/svelte/components/color-picker';

    let hsl = $state('#5e6ad2');
    let rgb = $state('#5e6ad2');
    let hsv = $state('#5e6ad2');
</script>

<div class="flex flex-wrap items-start justify-center gap-4">
    <ColorPicker.Root bind:value={hsl} format="hsl" label="HSL">
        <ColorPicker.Trigger />
        <ColorPicker.Content />
    </ColorPicker.Root>
    <ColorPicker.Root bind:value={rgb} format="rgb" label="RGB">
        <ColorPicker.Trigger />
        <ColorPicker.Content />
    </ColorPicker.Root>
    <ColorPicker.Root bind:value={hsv} format="hsv" label="HSV">
        <ColorPicker.Trigger />
        <ColorPicker.Content />
    </ColorPicker.Root>
</div>
