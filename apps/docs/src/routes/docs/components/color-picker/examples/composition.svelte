<script lang="ts">
    import type { ColorOption } from '@mielui/svelte/components/color-picker';
    import * as ColorPicker from '@mielui/svelte/components/color-picker';

    const options: ColorOption[] = [
        {
            label: 'Indigo',
            value: '#5e6ad2'
        },
        {
            label: 'Rose',
            value: '#e65c86'
        },
        {
            label: 'Green',
            value: '#36a375'
        }
    ];

    let value = $state('#5e6ad2');
</script>

<ColorPicker.Root bind:value {options} format="rgb" label="Accent color">
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
