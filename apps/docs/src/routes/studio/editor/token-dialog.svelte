<script lang="ts">
    import * as Dialog from '@mielui/svelte/components/dialog';
    import type { Snippet } from 'svelte';
    import { modalDoneFooter } from './controls.svelte';

    let {
        open = $bindable(false),
        title,
        description,
        children
    }: {
        open?: boolean;
        title: string;
        description: string;
        children: Snippet;
    } = $props();
</script>

<Dialog.Root bind:open orientation="vertical">
    <Dialog.Content
        size="xl"
        contentClass="!h-[min(44rem,calc(var(--mielui-viewport-height)-2rem))] !max-h-[min(44rem,calc(var(--mielui-viewport-height)-2rem))] !max-w-5xl"
        surfaceClass="!overflow-hidden"
    >
        <Dialog.Header class="shrink-0">
            <Dialog.Title>{title}</Dialog.Title>
            <Dialog.Description>{description}</Dialog.Description>
        </Dialog.Header>
        {@render children()}
        {@render modalDoneFooter()}
    </Dialog.Content>
</Dialog.Root>
