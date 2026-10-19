<script lang="ts">
    import {
        SourceCodeIcon as Code,
        ArrowExpand01Icon as Expand,
        RefreshIcon as RefreshCw
    } from '@hugeicons/core-free-icons';
    import HugeiconsIcon from '@mielui/svelte/hugeicons-icon';
    import { cn } from '@mielui/svelte/utils';
    import type { Snippet } from 'svelte';
    import { fadeX, scrollFade } from '$lib/components/shell/scroll-fade';
    import { rendersOnClient, revealAfterPaint } from './preview';
    import PreviewAction from './preview-action.svelte';
    import PreviewCode from './preview-code.svelte';
    import PreviewFullscreen from './preview-fullscreen.svelte';
    import { stayOnPage } from './stay-on-page';

    let {
        children,
        controls,
        code,
        class: className,
        refreshable = false
    }: {
        children?: Snippet;
        controls?: Snippet;
        code: string;
        class?: string;
        refreshable?: boolean;
    } = $props();

    const id = $props.id();
    let codeOpen = $state(false);
    let fullscreen = $state(false);
    let previewVersion = $state(0);
    let expandButton = $state<HTMLButtonElement | HTMLAnchorElement>();
    let ready = $state(!rendersOnClient());
</script>

{#snippet preview()}
    {#key previewVersion}
        {@render children?.()}
    {/key}
{/snippet}

<div
    {@attach ready
        ? undefined
        : revealAfterPaint(() => {
              ready = true;
          })}
    data-component-preview
    class="mielui-inset-frame relative isolate overflow-hidden bg-[var(--docs-chrome)]! has-[iframe]:p-0!"
>
    <div class={cn(className, 'w-full min-w-0')}>
        <div
            data-preview-toolbar
            class="flex min-w-0 items-center justify-between gap-3 px-2 py-1 [--size-icon-md:var(--size-control-sm)]"
        >
            <div
                {@attach scrollFade({ axis: 'x', size: 24 })}
                class={`-m-1 flex min-w-0 items-center gap-1 overflow-x-auto overscroll-x-contain p-1 ${fadeX}`}
            >
                {#if ready}
                    {@render controls?.()}
                {/if}
            </div>
            <div class="flex shrink-0 items-center gap-0.5">
                {#if refreshable}
                    <PreviewAction
                        label="Replay preview"
                        onclick={() => {
                            previewVersion += 1;
                        }}
                    >
                        {#key previewVersion}
                            <HugeiconsIcon
                                icon={RefreshCw}
                                size={15}
                                class={previewVersion > 0
                                    ? 'animate-[spin_var(--motion-duration-spring)_var(--ease-out)_1] motion-reduce:animate-none'
                                    : undefined}
                            />
                        {/key}
                    </PreviewAction>
                {/if}
                <PreviewAction
                    bind:element={expandButton}
                    label="Open preview in full screen"
                    tooltip="Full screen"
                    onclick={() => {
                        fullscreen = true;
                    }}
                >
                    <HugeiconsIcon icon={Expand} size={15} />
                </PreviewAction>
                <PreviewAction
                    label="Code"
                    class="aria-pressed:bg-secondary aria-pressed:text-foreground"
                    aria-pressed={codeOpen}
                    aria-controls={`${id}-code`}
                    onclick={() => {
                        codeOpen = !codeOpen;
                    }}
                >
                    <HugeiconsIcon icon={Code} size={15} />
                </PreviewAction>
            </div>
        </div>
        <div class="mielui-inset-surface overflow-hidden">
            <div
                tabindex="-1"
                role="presentation"
                onclickcapture={stayOnPage}
                data-preview-canvas
                class="flex min-h-48 w-full min-w-0 items-center justify-center overflow-x-auto p-6 has-[iframe]:p-0 focus:outline-none sm:p-8 has-[iframe]:sm:p-0"
            >
                {#if ready && !fullscreen}
                    {@render preview()}
                {/if}
            </div>
            <PreviewCode id={`${id}-code`} {code} open={codeOpen} />
        </div>
    </div>
</div>

<PreviewFullscreen bind:open={fullscreen} returnFocus={expandButton} {controls}>
    {@render preview()}
</PreviewFullscreen>
