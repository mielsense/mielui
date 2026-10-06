<script lang="ts">
    import { RefreshIcon as RefreshCw } from '@hugeicons/core-free-icons';
    import Button from '@mielui/svelte/components/button';
    import * as CodeBlock from '@mielui/svelte/components/code-block';
    import { CopyButton } from '@mielui/svelte/components/copy-button';
    import * as Tabs from '@mielui/svelte/components/tabs';
    import * as Tooltip from '@mielui/svelte/components/tooltip';
    import HugeiconsIcon from '@mielui/svelte/hugeicons-icon';
    import { cn } from '@mielui/svelte/utils';
    import type { Snippet } from 'svelte';
    import { fadeX, scrollFade } from '$lib/components/shell/scroll-fade';
    import { stayOnPage } from './stay-on-page';

    let {
        children,
        controls,
        code,
        class: classProp,
        refreshable = false
    }: {
        children?: Snippet;
        controls?: Snippet;
        code: string;
        class?: string;
        refreshable?: boolean;
    } = $props();

    let value = $state<string>('preview');
    let previewVersion = $state(0);
    let activated = $state(false);

    function activatePreview(node: HTMLElement) {
        if (typeof IntersectionObserver === 'undefined') {
            activated = true;
            return;
        }

        const observer = new IntersectionObserver(
            (entries) => {
                if (entries.some((entry) => entry.isIntersecting)) {
                    activated = true;
                    observer.disconnect();
                }
            },
            {
                rootMargin: '300px'
            }
        );

        function activate() {
            activated = true;
            observer.disconnect();
        }

        node.addEventListener('docs-activate-preview', activate);
        observer.observe(node);

        return () => {
            observer.disconnect();
            node.removeEventListener('docs-activate-preview', activate);
        };
    }

    function refreshPreview() {
        previewVersion += 1;
    }
</script>

<div
    {@attach activatePreview}
    data-component-preview
    class="mielui-inset-frame relative isolate overflow-hidden [--mielui-modal-inset:var(--spacing)] has-[iframe]:p-0!"
>
    <div class={cn(classProp, 'w-full min-w-0')}>
        <div
            data-preview-toolbar
            class="flex min-w-0 items-center justify-between gap-3 bg-[var(--docs-chrome)] px-2 py-1 [--size-icon-md:var(--size-control-sm)] [&_[data-ui=tabs-trigger]]:inline-flex [&_[data-ui=tabs-trigger]]:min-h-[var(--size-control-sm)] [&_[data-ui=tabs-trigger]]:items-center [&_[data-ui=tabs-trigger]]:py-0 [&_[data-ui=tabs-list][data-variant=ghost]>div[aria-hidden]]:bg-card [&_[data-ui=tabs-list][data-variant=ghost]>div[aria-hidden]]:shadow-[var(--elevation-control-edge)] dark:[&_[data-ui=tabs-list][data-variant=ghost]>div[aria-hidden]]:bg-secondary"
        >
            <Tabs.Root bind:value variant="ghost" class="shrink-0">
                <Tabs.List class="w-fit">
                    <Tabs.Trigger value="preview">Preview</Tabs.Trigger>
                    <Tabs.Trigger value="code">Code</Tabs.Trigger>
                </Tabs.List>
            </Tabs.Root>
            {#if controls || refreshable || value === 'code'}
                <div class="flex min-w-0 items-center gap-1">
                    {#if controls}
                        <div
                            {@attach scrollFade({ axis: 'x', size: 24 })}
                            class={`-m-1 flex min-w-0 items-center overflow-x-auto overscroll-x-contain p-1 ${fadeX}`}
                        >
                            {@render controls()}
                        </div>
                    {/if}
                    {#if refreshable && value === 'preview'}
                        <Tooltip.Root>
                            <Tooltip.Trigger>
                                <Button
                                    size="icon"
                                    variant="ghost"
                                    class="shrink-0 text-foreground-muted hover:text-foreground"
                                    aria-label="Replay preview"
                                    onclick={refreshPreview}
                                >
                                    {#key previewVersion}
                                        <HugeiconsIcon
                                            icon={RefreshCw}
                                            size={15}
                                            class={previewVersion > 0
                                                ? 'animate-[spin_360ms_ease-out_1] motion-reduce:animate-none'
                                                : undefined}
                                        />
                                    {/key}
                                </Button>
                            </Tooltip.Trigger>
                            <Tooltip.Content>Replay preview</Tooltip.Content>
                        </Tooltip.Root>
                    {/if}
                    {#if value === 'code'}
                        <CopyButton
                            text={code}
                            label="Copy code"
                            copiedLabel="Copied"
                            class="shrink-0 text-foreground-muted hover:text-foreground"
                        />
                    {/if}
                </div>
            {/if}
        </div>
        <div hidden={value !== 'preview'} inert={value !== 'preview'}>
            <div
                tabindex="-1"
                role="presentation"
                onclickcapture={stayOnPage}
                data-preview-canvas
                class="mielui-inset-surface flex min-h-48 w-full min-w-0 items-center justify-center overflow-x-auto p-6 has-[iframe]:p-0 focus:outline-none sm:p-8 has-[iframe]:sm:p-0"
            >
                {#key previewVersion}
                    {#if activated}
                        {@render children?.()}
                    {/if}
                {/key}
            </div>
        </div>
        {#if value === 'code'}
            <div data-preview-code>
                <CodeBlock.Root
                    {code}
                    lang="svelte"
                    copy={false}
                    class="w-full rounded-none border-0 bg-transparent p-0 shadow-none [--code-block-max-height:40rem] [--code-block-padding-x:1.5rem] [--code-block-padding-y:1.5rem]"
                />
            </div>
        {/if}
    </div>
</div>
