<script lang="ts">
    import {
        ArrowDown01Icon as ChevronDown,
        Cancel01Icon as Close,
        SourceCodeIcon as Code,
        ArrowExpand01Icon as Expand,
        RefreshIcon as RefreshCw
    } from '@hugeicons/core-free-icons';
    import { morph } from '@mielui/svelte/actions/morph';
    import Button from '@mielui/svelte/components/button';
    import * as CodeBlock from '@mielui/svelte/components/code-block';
    import { CopyButton } from '@mielui/svelte/components/copy-button';
    import * as Tooltip from '@mielui/svelte/components/tooltip';
    import HugeiconsIcon from '@mielui/svelte/hugeicons-icon';
    import { springEase, themedSlide } from '@mielui/svelte/transition';
    import { cn, lockBodyScroll } from '@mielui/svelte/utils';
    import type { Snippet } from 'svelte';
    import type { TransitionConfig } from 'svelte/transition';
    import { fadeX, scrollFade } from '$lib/components/shell/scroll-fade';
    import { stayOnPage } from './stay-on-page';

    const COLLAPSED_LINES = 12;
    const COLLAPSED_HEIGHT = 256;
    const layoutSpring = springEase(550, 40);

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

    const id = $props.id();
    let codeOpen = $state(false);
    let codeExpanded = $state(false);
    let codeHeight = $state(0);
    let fullscreen = $state(false);
    let previewVersion = $state(0);
    let activated = $state(false);
    let expandButton = $state<HTMLButtonElement | HTMLAnchorElement>();
    let closeButton = $state<HTMLButtonElement | HTMLAnchorElement>();

    const collapsible = $derived(code.trim().split('\n').length > COLLAPSED_LINES);
    const clipHeight = $derived.by(() => {
        if (!collapsible) {
            return undefined;
        }
        if (!codeExpanded) {
            return `${COLLAPSED_HEIGHT}px`;
        }

        return codeHeight ? `${codeHeight}px` : undefined;
    });

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

    function reveal(node: Element): TransitionConfig {
        const slide = themedSlide(node, {
            durationVar: '--motion-duration-spring',
            fallback: 350
        });

        return {
            ...slide,
            easing: layoutSpring
        };
    }

    function refreshPreview() {
        previewVersion += 1;
    }

    function toBody(node: HTMLElement) {
        document.body.appendChild(node);

        return () => {
            node.remove();
        };
    }

    function layerIsOpen() {
        return Boolean(
            document.querySelector(
                '[data-bits-floating-content-wrapper] [data-state="open"], [data-dialog-panel], [data-ui="sheet-content"], [data-ui="popover-content"]'
            )
        );
    }

    $effect(() => {
        if (!fullscreen) {
            return;
        }

        const releaseScroll = lockBodyScroll();
        const returnTo = expandButton;

        function onKeydown(event: KeyboardEvent) {
            if (event.key === 'Escape' && !layerIsOpen()) {
                fullscreen = false;
            }
        }

        window.addEventListener('keydown', onKeydown, true);
        closeButton?.focus({ preventScroll: true });

        return () => {
            window.removeEventListener('keydown', onKeydown, true);
            releaseScroll();
            returnTo?.focus({ preventScroll: true });
        };
    });
</script>

{#snippet preview()}
    {#key previewVersion}
        {#if activated}
            {@render children?.()}
        {/if}
    {/key}
{/snippet}

<div
    {@attach activatePreview}
    data-component-preview
    class="mielui-inset-frame relative isolate overflow-hidden bg-[var(--docs-chrome)]! has-[iframe]:p-0!"
>
    <div class={cn(classProp, 'w-full min-w-0')}>
        <div
            data-preview-toolbar
            class="flex min-w-0 items-center justify-between gap-3 px-2 py-1 [--size-icon-md:var(--size-control-sm)]"
        >
            <div
                {@attach scrollFade({ axis: 'x', size: 24 })}
                class={`-m-1 flex min-w-0 items-center gap-1 overflow-x-auto overscroll-x-contain p-1 ${fadeX}`}
            >
                {@render controls?.()}
            </div>
            <div class="flex shrink-0 items-center gap-0.5">
                {#if refreshable}
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
                                            ? 'animate-[spin_var(--motion-duration-spring)_var(--ease-out)_1] motion-reduce:animate-none'
                                            : undefined}
                                    />
                                {/key}
                            </Button>
                        </Tooltip.Trigger>
                        <Tooltip.Content>Replay preview</Tooltip.Content>
                    </Tooltip.Root>
                {/if}
                <Tooltip.Root>
                    <Tooltip.Trigger>
                        <Button
                            bind:element={expandButton}
                            size="icon"
                            variant="ghost"
                            class="shrink-0 text-foreground-muted hover:text-foreground"
                            aria-label="Open preview in full screen"
                            onclick={() => {
                                activated = true;
                                fullscreen = true;
                            }}
                        >
                            <HugeiconsIcon icon={Expand} size={15} />
                        </Button>
                    </Tooltip.Trigger>
                    <Tooltip.Content>Full screen</Tooltip.Content>
                </Tooltip.Root>
                <Tooltip.Root>
                    <Tooltip.Trigger>
                        <Button
                            size="icon"
                            variant="ghost"
                            class="shrink-0 text-foreground-muted hover:text-foreground aria-pressed:bg-secondary aria-pressed:text-foreground"
                            aria-label="Show code"
                            aria-pressed={codeOpen}
                            aria-controls={`${id}-code`}
                            onclick={() => {
                                codeOpen = !codeOpen;
                            }}
                        >
                            <HugeiconsIcon icon={Code} size={15} />
                        </Button>
                    </Tooltip.Trigger>
                    <Tooltip.Content>Code</Tooltip.Content>
                </Tooltip.Root>
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
                {#if !fullscreen}
                    {@render preview()}
                {/if}
            </div>
            {#if codeOpen}
                <div
                    id={`${id}-code`}
                    data-preview-code
                    transition:reveal
                    class="relative border-t-[length:var(--border-size)] border-border"
                >
                    <div
                        class="overflow-hidden transition-[height] duration-[var(--motion-duration-spring)] ease-[var(--ease-spring-layout)] motion-reduce:transition-none"
                        style:height={clipHeight}
                        inert={collapsible && !codeExpanded}
                    >
                        <div
                            bind:clientHeight={codeHeight}
                            class={collapsible ? 'pb-12' : undefined}
                        >
                            <CodeBlock.Root
                                value="code"
                                class="w-full rounded-none border-0 bg-transparent p-0 shadow-none [--code-block-max-height:40rem] [--code-block-padding-x:1.5rem] [--code-block-padding-y:1.25rem]"
                            >
                                <CodeBlock.Content value="code" {code} lang="svelte" />
                            </CodeBlock.Root>
                        </div>
                    </div>
                    <CopyButton
                        text={code}
                        label="Copy code"
                        copiedLabel="Copied"
                        class="absolute end-2 top-2 text-foreground-muted hover:text-foreground"
                    />
                    {#if collapsible}
                        <div
                            aria-hidden="true"
                            class={cn(
                                'pointer-events-none absolute inset-x-0 bottom-0 h-28 bg-linear-to-t from-background to-transparent transition-opacity duration-[var(--motion-duration-panel)] ease-[var(--ease-out)] motion-reduce:transition-none',
                                codeExpanded && 'opacity-0'
                            )}
                        ></div>
                        <div class="absolute inset-x-0 bottom-3 flex justify-center">
                            <Button
                                size="sm"
                                variant="outline"
                                aria-expanded={codeExpanded}
                                onclick={() => {
                                    codeExpanded = !codeExpanded;
                                }}
                            >
                                <span
                                    class="inline-block w-24 text-center"
                                    use:morph={{ key: codeExpanded }}
                                >
                                    {codeExpanded ? 'Collapse code' : 'Expand code'}
                                </span>
                                <HugeiconsIcon
                                    icon={ChevronDown}
                                    size={14}
                                    class={cn(
                                        'text-foreground-muted transition-transform duration-[var(--motion-duration-spring)] ease-[var(--ease-spring-layout)] motion-reduce:transition-none',
                                        codeExpanded && 'rotate-180'
                                    )}
                                />
                            </Button>
                        </div>
                    {/if}
                </div>
            {/if}
        </div>
    </div>
</div>

{#if fullscreen}
    <div
        {@attach toBody}
        role="dialog"
        aria-modal="true"
        aria-label="Preview"
        data-preview-fullscreen
        class="fixed inset-0 z-[90] flex flex-col bg-background text-foreground"
    >
        <div
            class="flex min-h-12 shrink-0 items-center justify-between gap-3 px-3 [--size-icon-md:var(--size-control-sm)]"
        >
            <div class="flex min-w-0 items-center gap-1 overflow-x-auto p-1">
                {@render controls?.()}
            </div>
            <Button
                bind:element={closeButton}
                size="icon"
                variant="ghost"
                class="shrink-0 text-foreground-muted hover:text-foreground"
                aria-label="Close full screen"
                onclick={() => {
                    fullscreen = false;
                }}
            >
                <HugeiconsIcon icon={Close} size={16} />
            </Button>
        </div>
        <div
            role="presentation"
            onclickcapture={stayOnPage}
            class="flex min-h-0 flex-1 items-center justify-center overflow-auto p-6 has-[iframe]:p-0 sm:p-10"
        >
            {@render preview()}
        </div>
    </div>
{/if}
