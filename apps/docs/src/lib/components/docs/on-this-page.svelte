<script lang="ts">
    import { createPageOutline } from './page-outline.svelte';
    import TocRail from './toc-rail.svelte';

    let { content }: { content: HTMLElement | undefined } = $props();
    const outline = createPageOutline(() => content);
</script>

{#if outline.headings.length}
    <nav aria-label="On this page" class="min-h-full pb-6">
        <div class="px-5 py-3">
            <div bind:this={outline.list} class="relative flex flex-col gap-0.5">
                <TocRail y={outline.previewY} from={outline.previewFrom} muted />
                <TocRail y={outline.activeY} />
                {#each outline.headings as heading (heading.id)}
                    <a
                        href={`#${heading.id}`}
                        data-heading={heading.id}
                        onclick={(event) => outline.navigate(event, heading)}
                        aria-current={outline.active === heading.id ? 'location' : undefined}
                        onmouseenter={() => { outline.hovered = heading.id; }}
                        onmouseleave={() => { outline.hovered = null; }}
                        onfocus={() => { outline.focused = heading.id; }}
                        onblur={() => { outline.focused = null; }}
                        class={`${heading.id === 'api-reference' ? 'mt-2' : ''} relative rounded-md py-1.5 pr-1 text-sm leading-5 transition-colors motion-reduce:transition-none focus-visible:outline-2 focus-visible:outline-primary ${heading.level === 3 ? 'pl-9' : 'pl-6'} ${outline.active === heading.id ? 'text-foreground' : 'text-foreground-muted hover:text-foreground'}`}
                    >
                        {heading.label}
                    </a>
                {/each}
            </div>
        </div>
    </nav>
{/if}
