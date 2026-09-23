<script lang="ts">
    import { ScrollArea } from '@mielui/svelte/components/scroll-area';
    import * as Tabs from '@mielui/svelte/components/tabs';
    import { onDestroy } from 'svelte';
    import Header from './app-preview/header.svelte';
    import Invoices from './app-preview/invoices.svelte';
    import { AppPreviewModel } from './app-preview/model.svelte';
    import Navigation from './app-preview/navigation.svelte';
    import Overview from './app-preview/overview.svelte';
    import Settings from './app-preview/settings.svelte';

    const model = new AppPreviewModel();
    onDestroy(() => {
        model.destroy();
    });
</script>

<ScrollArea class="h-full min-h-0" showCues={false}>
    <div class="@container flex w-full flex-col">
        <Header {model} />
        <Tabs.Root bind:value={model.studioView} variant="ghost">
            <Navigation {model} />
            <Overview {model} />
            <Invoices {model} />
            <Settings {model} />
        </Tabs.Root>
    </div>
</ScrollArea>
