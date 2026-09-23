<script lang="ts">
    import { Toaster } from '@mielui/svelte/components/toast';
    import Activity from '../../../docs/components/notch/examples/activity.svelte';
    import Glass from '../../../docs/components/notch/examples/glass.svelte';
    import Hero from '../../../docs/components/notch/examples/hero.svelte';
    import Peek from '../../../docs/components/notch/examples/peek.svelte';
    import ToastActions from '../../../docs/components/toast/examples/actions.svelte';
    import ToastTypes from '../../../docs/components/toast/examples/all-types.svelte';
    import ToastComposition from '../../../docs/components/toast/examples/composition.svelte';
    import ToastGlass from '../../../docs/components/toast/examples/glass.svelte';
    import ToastHero from '../../../docs/components/toast/examples/hero.svelte';
    import NotchToast from '../../../docs/components/toast/examples/notch.svelte';
    import ToastPromise from '../../../docs/components/toast/examples/promise.svelte';
    import type { PageData } from './$types';

    let { data }: { data: PageData } = $props();
</script>

<svelte:head><meta name="robots" content="noindex" /></svelte:head>

{#if data.example.startsWith('toast/') && data.example !== 'toast/notch'}
    <Toaster />
{/if}

<div class="flex min-h-dvh items-center justify-center p-6">
    {#if data.example === 'notch/hero'}
        <Hero />
    {:else if data.example === 'notch/peek'}
        <Peek />
    {:else if data.example === 'notch/activity'}
        <Activity />
    {:else if data.example === 'notch/glass'}
        <Glass />
    {:else if data.example === 'toast/hero'}
        <ToastHero />
    {:else if data.example === 'toast/actions'}
        <ToastActions />
    {:else if data.example === 'toast/all-types'}
        <ToastTypes />
    {:else if data.example === 'toast/composition'}
        <ToastComposition />
    {:else if data.example === 'toast/glass'}
        <ToastGlass />
    {:else if data.example === 'toast/promise'}
        <ToastPromise />
    {:else if data.example === 'toast/notch'}
        <NotchToast />
    {/if}
</div>
