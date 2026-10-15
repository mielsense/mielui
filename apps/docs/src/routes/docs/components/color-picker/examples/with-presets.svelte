<script lang="ts">
    import type { ColorOption } from '@mielui/svelte/components/color-picker';
    import * as ColorPicker from '@mielui/svelte/components/color-picker';

    const options: ColorOption[] = [
        {
            label: 'Blue',
            value: '#2563eb'
        },
        {
            label: 'Indigo',
            value: '#4f46e5'
        },
        {
            label: 'Violet',
            value: '#7c3aed'
        },
        {
            label: 'Pink',
            value: '#db2777'
        },
        {
            label: 'Rose',
            value: '#e11d48'
        }
    ];

    let value = $state('#4f46e5');
</script>

<ColorPicker.Root bind:value {options} label="Label color">
    <ColorPicker.Trigger />
    <ColorPicker.Content />
</ColorPicker.Root>
