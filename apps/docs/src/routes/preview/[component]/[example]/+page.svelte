<script lang="ts">
    import Activity from '../../../docs/components/notch/examples/activity.svelte';
    import Glass from '../../../docs/components/notch/examples/glass.svelte';
    import Hero from '../../../docs/components/notch/examples/hero.svelte';
    import Peek from '../../../docs/components/notch/examples/peek.svelte';
    import NotchToast from '../../../docs/components/toast/examples/notch.svelte';
    import type { PageData } from './$types';

    let { data }: { data: PageData } = $props();
</script>

<svelte:head><meta name="robots" content="noindex" /></svelte:head>

<div class="flex min-h-dvh items-center justify-center p-6">
    {#if data.example === 'notch/hero'}
        <Hero />
    {:else if data.example === 'notch/peek'}
        <Peek />
    {:else if data.example === 'notch/activity'}
        <Activity />
    {:else if data.example === 'notch/glass'}
        <Glass />
    {:else if data.example === 'toast/notch'}
        <NotchToast />
    {/if}
</div>
