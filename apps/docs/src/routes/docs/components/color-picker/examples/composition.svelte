<script lang="ts">
    import * as ColorPicker from '@mielui/svelte/components/color-picker';

    let value = $state('#5e6ad2');
    const options = [
        { label: 'Indigo', value: '#5e6ad2' },
        { label: 'Rose', value: '#e65c86' },
        { label: 'Green', value: '#36a375' }
    ];
</script>

<ColorPicker.Root label="Accent color" bind:value {options} format="rgb">
    <ColorPicker.Trigger />
    <ColorPicker.Content>
        <ColorPicker.Presets />
        <div class="flex items-center gap-2 px-2">
            <ColorPicker.Preview />
            <ColorPicker.HexInput class="flex-1" />
        </div>
        <ColorPicker.Channels />
    </ColorPicker.Content>
</ColorPicker.Root>
