<script lang="ts">
    import { ArrowDown01Icon as ChevronDown } from '@hugeicons/core-free-icons';
    import { morph } from '@mielui/svelte/actions/morph';
    import Button from '@mielui/svelte/components/button';
    import * as CodeBlock from '@mielui/svelte/components/code-block';
    import { CopyButton } from '@mielui/svelte/components/copy-button';
    import HugeiconsIcon from '@mielui/svelte/hugeicons-icon';
    import { springEase, themedSlide } from '@mielui/svelte/transition';
    import { cn } from '@mielui/svelte/utils';
    import type { TransitionConfig } from 'svelte/transition';

    const COLLAPSED_LINES = 12;
    const COLLAPSED_HEIGHT = 256;
    const layoutSpring = springEase(550, 40);

    let {
        id,
        code,
        open
    }: {
        id: string;
        code: string;
        open: boolean;
    } = $props();

    let expanded = $state(false);
    let height = $state(0);

    const collapsible = $derived(code.trim().split('\n').length > COLLAPSED_LINES);
    const clipHeight = $derived.by(() => {
        if (!collapsible) {
            return undefined;
        }
        if (!expanded) {
            return `${COLLAPSED_HEIGHT}px`;
        }

        return height ? `${height}px` : undefined;
    });

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
</script>

{#if open}
    <div
        {id}
        data-preview-code
        transition:reveal
        class="relative border-t-[length:var(--border-size)] border-border"
    >
        <div
            class="overflow-hidden transition-[height] duration-[var(--motion-duration-spring)] ease-[var(--ease-spring-layout)] motion-reduce:transition-none"
            style:height={clipHeight}
            inert={collapsible && !expanded}
        >
            <div bind:clientHeight={height} class={collapsible ? 'pb-12' : undefined}>
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
            labels={{ copy: 'Copy code', copied: 'Copied' }}
            class="absolute end-2 top-2 text-foreground-muted hover:text-foreground"
        />
        {#if collapsible}
            <div
                aria-hidden="true"
                class={cn(
                    'pointer-events-none absolute inset-x-0 bottom-0 h-28 bg-linear-to-t from-background to-transparent transition-opacity duration-[var(--motion-duration-panel)] ease-[var(--ease-out)] motion-reduce:transition-none',
                    expanded && 'opacity-0'
                )}
            ></div>
            <div class="absolute inset-x-0 bottom-3 flex justify-center">
                <Button
                    size="sm"
                    variant="outline"
                    aria-expanded={expanded}
                    onclick={() => {
                        expanded = !expanded;
                    }}
                >
                    <span class="inline-block w-24 text-center" use:morph={{ key: expanded }}>
                        {expanded ? 'Collapse code' : 'Expand code'}
                    </span>
                    <HugeiconsIcon
                        icon={ChevronDown}
                        size={14}
                        class={cn(
                            'text-foreground-muted transition-transform duration-[var(--motion-duration-spring)] ease-[var(--ease-spring-layout)] motion-reduce:transition-none',
                            expanded && 'rotate-180'
                        )}
                    />
                </Button>
            </div>
        {/if}
    </div>
{/if}
