<script lang="ts">
    import { untrack } from 'svelte';
    import { createDocsFontState } from '$lib/fonts.svelte';

    let { initial }: { initial?: string } = $props();
    const selectedFont = createDocsFontState();
    const initialFont = untrack(() => initial);
    if (initialFont) {
        selectedFont.current = initialFont;
    }
</script>

<output data-testid="selected-font">{selectedFont.current}</output>
<button type="button" onclick={() => { selectedFont.current = 'Inter'; }}>Choose Inter</button>
