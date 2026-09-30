<script lang="ts">
    import { getSidebar } from '@mielui/svelte/components/sidebar';

    const state = getSidebar('navigation');
</script>

<output aria-label="Context state">
    {[state.open, state.pinned, state.width, state.mobile, state.resizing].join('/')}
</output>
<button
    type="button"
    onclick={() => {
        state.setWidth(1000);
    }}
>
    Set oversized width
</button>
<button
    type="button"
    onclick={() => {
        state.setMobileOpen(true);
    }}
>
    Open mobile navigation
</button>
<button
    type="button"
    onclick={() => {
        state.close();
    }}
>
    Close through context
</button>
