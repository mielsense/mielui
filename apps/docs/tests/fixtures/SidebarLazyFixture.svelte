<script lang="ts">
    import SidebarFixture from './SidebarFixture.svelte';

    let visible = $state(false);
</script>

<button
    type="button"
    onclick={() => {
        visible = !visible;
    }}
>
    Toggle fixture
</button>
{#if visible}
    <SidebarFixture />
{/if}
