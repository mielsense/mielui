<script lang="ts">
    import { RefreshIcon as RefreshCw } from '@hugeicons/core-free-icons';
    import Button from '@mielui/svelte/components/button';
    import * as Card from '@mielui/svelte/components/card';
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
        observer.observe(node);
        return {
            destroy() {
                observer.disconnect();
            }
        };
    }

    let refreshVersion = $state(0);

    function refreshPreview() {
        previewVersion += 1;
        refreshVersion += 1;
    }
</script>

<div use:activatePreview class="flex flex-col gap-3.5" data-component-preview>
    <!-- Tabs (using library Tabs component; segmented = pill-on-track switcher) -->
    <div class="flex items-center justify-between gap-3">
        <Tabs.Root bind:value variant="segmented">
            <Tabs.List class="w-fit">
                <Tabs.Trigger value="preview">Preview</Tabs.Trigger>
                <Tabs.Trigger value="code">Code</Tabs.Trigger>
            </Tabs.List>
        </Tabs.Root>
    </div>

    <div hidden={value !== 'preview'} inert={value !== 'preview'}>
        <!-- Preview sits on Card's panel surface. -->
        <Card.Root
            {...rest}
            variant={refreshable ? "inset" : "panel"}
            class={cn(
                classProp,
                refreshable && '[&>[data-ui=card-surface]]:contents',
                'w-full max-h-[40rem] overflow-hidden [&>[data-ui=card-surface]]:p-0'
            )}
        >
            {#if refreshable}
                <Card.Header class="m-0 flex-row items-center justify-end gap-2 px-1 py-0.5">
                    {#if controls}
                        <div class="mr-auto">{@render controls()}</div>
                    {/if}
                    <Tooltip.Root>
                        <Tooltip.Trigger>
                            <Button
                                size="icon"
                                variant="ghost"
                                class="size-7 rounded-md"
                                aria-label="Replay preview"
                                onclick={refreshPreview}
                            >
                                {#key refreshVersion}
                                    <HugeiconsIcon
                                        icon={RefreshCw}
                                        size={14}
                                        class={refreshVersion > 0 ? 'animate-[spin_360ms_ease-out_1] motion-reduce:animate-none' : undefined}
                                    />
                                {/key}
                            </Button>
                        </Tooltip.Trigger>
                        <Tooltip.Content>Replay preview</Tooltip.Content>
                    </Tooltip.Root>
                </Card.Header>
            {/if}
            <div
                tabindex="-1"
                class={cn(refreshable && "mielui-inset-surface", "flex min-h-[20rem] w-full items-center justify-center overflow-hidden p-6 sm:p-10 focus:outline-none")}
            >
                {#key previewVersion}
                    {#if activated}
                        {@render children?.()}
                    {/if}
                {/key}
            </div>
        </Card.Root>
    </div>
    {#if value === 'code'}
        <!-- Code is a CodeBlock — it carries its own panel frame, so it stands alone. -->
        <CodeBlock.Root
            {...rest}
            {code}
            lang="svelte"
            copy="overlay"
            class={cn(classProp, 'w-full max-h-[40rem] overflow-auto')}
        />
    {/if}
</div>
