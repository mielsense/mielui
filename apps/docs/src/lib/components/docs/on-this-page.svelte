<script lang="ts">
    import { createPageOutline } from './page-outline.svelte';

    let { content }: { content: HTMLElement | undefined } = $props();
    const outline = createPageOutline(() => content);
</script>

{#if outline.headings.length}
    <nav aria-label="On this page" class="flex flex-col gap-2">
        <h2 class="text-xs font-medium text-foreground-muted">On this page</h2>
        <div class="flex flex-col">
            {#each outline.headings as heading (heading.id)}
                <a
                    href={`#${heading.id}`}
                    onclick={(event) => outline.navigate(event, heading)}
                    aria-current={outline.active === heading.id ? 'location' : undefined}
                    class={`rounded-[var(--radius-sm)] py-1 text-[13px] leading-5 transition-colors motion-reduce:transition-none focus-visible:outline-none focus-visible:shadow-[var(--focus-ring)] ${heading.level === 3 ? 'ps-3' : ''} ${outline.active === heading.id ? 'font-medium text-foreground' : 'text-foreground-muted hover:text-foreground'}`}
                >
                    {heading.label}
                </a>
            {/each}
        </div>
    </nav>
{/if}
