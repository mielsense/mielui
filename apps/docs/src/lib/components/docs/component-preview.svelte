<script lang="ts">
    import { RefreshIcon as RefreshCw } from '@hugeicons/core-free-icons';
    import Button from '@mielui/svelte/components/button';
    import * as CodeBlock from '@mielui/svelte/components/code-block';
    import * as Tabs from '@mielui/svelte/components/tabs';
    import * as Tooltip from '@mielui/svelte/components/tooltip';
    import HugeiconsIcon from '@mielui/svelte/hugeicons-icon';
    import { cn } from '@mielui/svelte/utils';
    import type { Snippet } from 'svelte';

    let {
        children,
        controls,
        code,
        class: classProp,
        refreshable = false,
        ...rest
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
            { rootMargin: '300px' }
        );
        function activate() {
            activated = true;
            observer.disconnect();
        }
        node.addEventListener('docs-activate-preview', activate);
        observer.observe(node);
        return {
            destroy() {
                observer.disconnect();
                node.removeEventListener('docs-activate-preview', activate);
            }
        };
    }

    let refreshVersion = $state(0);

    function refreshPreview() {
        previewVersion += 1;
        refreshVersion += 1;
    }
</script>

<div
    use:activatePreview
    data-component-preview
    class="mielui-inset-frame relative isolate overflow-hidden [--mielui-modal-inset:var(--spacing)]"
>
    <div {...rest} class={cn(classProp, 'w-full min-w-0')}>
        <div
            data-preview-toolbar
            class="flex min-h-10 flex-wrap items-center justify-between gap-2 bg-[var(--docs-chrome)] px-3 py-1"
        >
            <Tabs.Root bind:value variant="ghost">
                <Tabs.List class="w-fit">
                    <Tabs.Trigger value="preview">Preview</Tabs.Trigger>
                    <Tabs.Trigger value="code">Code</Tabs.Trigger>
                </Tabs.List>
            </Tabs.Root>
            <div class="flex min-w-0 items-center gap-2">
                {#if controls}
                    {@render controls()}
                {/if}
                {#if refreshable && value === 'preview'}
                    <Tooltip.Root>
                        <Tooltip.Trigger>
                            <Button
                                size="icon"
                                variant="ghost"
                                class="size-8"
                                aria-label="Replay preview"
                                onclick={refreshPreview}
                            >
                                {#key refreshVersion}
                                    <HugeiconsIcon
                                        icon={RefreshCw}
                                        size={15}
                                        class={refreshVersion > 0 ? 'animate-[spin_360ms_ease-out_1] motion-reduce:animate-none' : undefined}
                                    />
                                {/key}
                            </Button>
                        </Tooltip.Trigger>
                        <Tooltip.Content>Replay preview</Tooltip.Content>
                    </Tooltip.Root>
                {/if}
            </div>
        </div>
        <div hidden={value !== 'preview'} inert={value !== 'preview'}>
            <div
                tabindex="-1"
                data-preview-canvas
                class="mielui-inset-surface flex min-h-48 w-full min-w-0 items-center justify-center overflow-x-auto p-6 sm:p-8 has-[iframe]:p-0 has-[iframe]:sm:p-0 focus:outline-none"
            >
                {#key previewVersion}
                    {#if activated}
                        {@render children?.()}
                    {/if}
                {/key}
            </div>
        </div>
        {#if value === 'code'}
            <div data-preview-code class="mielui-inset-surface overflow-hidden">
                <CodeBlock.Root
                    {code}
                    lang="svelte"
                    copy="overlay"
                    class="w-full max-h-[40rem] overflow-auto rounded-none border-0 bg-transparent p-0 shadow-none [--code-block-padding-x:1.5rem] [--code-block-padding-y:1.5rem] [&_[data-ui=code-block-surface]]:rounded-none [&_[data-ui=code-block-surface]]:border-0 [&_[data-ui=code-block-surface]]:bg-transparent [&_[data-ui=code-block-surface]]:shadow-none"
                />
            </div>
        {/if}
    </div>
</div>
