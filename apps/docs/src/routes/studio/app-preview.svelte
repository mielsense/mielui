<script lang="ts">
    import * as Tabs from '@mielui/svelte/components/tabs';
    import { onDestroy } from 'svelte';
    import DemoFrame from '$lib/components/demos/demo-frame.svelte';
    import FadeScrollArea from '$lib/components/shell/fade-scroll-area.svelte';
    import Header from './app-preview/header.svelte';
    import Invoices from './app-preview/invoices.svelte';
    import { AppPreviewModel } from './app-preview/model.svelte';
    import Overview from './app-preview/overview.svelte';
    import Settings from './app-preview/settings.svelte';
    import Sidebar from './app-preview/sidebar.svelte';

    const model = new AppPreviewModel();
    onDestroy(() => {
        model.destroy();
    });
</script>

<div class="h-full min-h-0 w-full p-4 pt-16 sm:p-5 sm:pt-16">
    <h2 class="sr-only">App preview</h2>
    <DemoFrame title="Ledger app" description="A sidebar, a data table, dialogs, and settings" fill>
        <Tabs.Root bind:value={model.studioView} variant="ghost" class="flex h-full min-h-0">
            <Sidebar {model} />
            <div class="flex min-w-0 flex-1 flex-col">
                <Header {model} />
                <FadeScrollArea class="min-h-0 flex-1" start>
                    <Overview {model} />
                    <Invoices {model} />
                    <Settings {model} />
                </FadeScrollArea>
            </div>
        </Tabs.Root>
    </DemoFrame>
</div>
