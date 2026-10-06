<script lang="ts">
    import { fadeY, scrollFade } from '$lib/components/shell/scroll-fade';
    import { createPageOutline } from './page-outline.svelte';

    let { content }: { content: HTMLElement | undefined } = $props();
    const outline = createPageOutline(() => content);
</script>

{#if outline.headings.length}
    <nav aria-label="On this page" class="flex flex-col gap-4">
        <h2 class="text-xs font-semibold text-foreground">On this page</h2>
        <div
            {@attach scrollFade({ size: 28 })}
            class={`flex max-h-[calc(100svh-var(--spacing)*56)] flex-col overflow-y-auto overscroll-contain ${fadeY}`}
        >
            {#each outline.headings as heading (heading.id)}
                <a
                    href={`#${heading.id}`}
                    onclick={(event) => outline.navigate(event, heading)}
                    aria-current={outline.active === heading.id ? 'location' : undefined}
                    class={`rounded-[var(--radius-sm)] py-1 text-[13px] leading-5 transition-colors motion-reduce:transition-none focus-visible:outline-none focus-visible:shadow-[var(--focus-ring)] ${heading.level === 3 ? 'ps-3' : ''} ${heading.id === 'api-reference' ? 'mt-5' : ''} ${outline.active === heading.id ? 'font-medium text-foreground' : 'text-foreground-muted hover:text-foreground'}`}
                >
                    {heading.label}
                </a>
            {/each}
        </div>
    </nav>
{/if}
