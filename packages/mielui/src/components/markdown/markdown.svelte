<script lang="ts">
    import { cn } from '@mielui/svelte/utils';
    import { marked } from 'marked';
    import type { MarkdownProps } from '.';
    import type { MarkdownToken } from './_types';
    import TokenRenderer from './markdown-token.svelte';

    let { content, streaming = false, class: className, ...rest }: MarkdownProps = $props();

    const tokens = $derived(
        marked.lexer(content, { gfm: true, breaks: false }) as unknown as MarkdownToken[]
    );
</script>

<div
    {...rest}
    data-ui="markdown"
    data-state={streaming ? 'streaming' : 'complete'}
    aria-busy={streaming}
    class={cn(
        className,
        'min-w-0 w-full select-text [font-size:var(--font-size-body)] leading-body [font-weight:var(--font-weight-body)] [letter-spacing:var(--tracking-body)] text-foreground [overflow-wrap:break-word] [&>*:first-child]:mt-0 [&>*:last-child]:mb-0'
    )}
>
    <TokenRenderer {tokens} />
    {#if streaming}
        <span
            aria-hidden="true"
            class="mielui-markdown-caret ms-0.5 inline-block h-4 w-px -translate-y-px bg-foreground-muted align-middle"
        ></span>
    {/if}
</div>

<style>
    .mielui-markdown-caret {
        animation: mielui-markdown-caret 1.1s steps(1, end) infinite;
    }

    @keyframes mielui-markdown-caret {
        50% {
            opacity: 0;
        }
    }

    @media (prefers-reduced-motion: reduce) {
        .mielui-markdown-caret {
            animation: none;
        }
    }
</style>
