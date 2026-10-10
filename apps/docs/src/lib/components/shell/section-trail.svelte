<script lang="ts">
    import { ArrowRight01Icon as ChevronRight } from '@hugeicons/core-free-icons';
    import HugeiconsIcon from '@mielui/svelte/hugeicons-icon';
    import { getShell } from './shell.svelte';

    const shell = getShell();
    const trail = $derived(shell.outline?.trail ?? []);
</script>

<!--
    @component
    Names the section of the docs page under the top bar, and the subsection when there is one.
    Each name jumps back to the start of its section.
-->

{#if trail.length}
    <nav aria-label="Current section" class="flex min-w-0 items-center gap-1 ps-2.5 text-[13px]">
        {#each trail as heading, index (heading.id)}
            {#if index > 0}
                <HugeiconsIcon
                    icon={ChevronRight}
                    size={12}
                    aria-hidden="true"
                    class="shrink-0 text-foreground-muted"
                />
            {/if}
            <a
                href={`#${heading.id}`}
                onclick={(event) => shell.outline?.navigate(event, heading)}
                class={`max-w-44 truncate rounded-[var(--radius-control)] px-1 py-0.5 transition-colors [transition-duration:var(--motion-duration-hover)] hover:text-foreground focus-visible:outline-none focus-visible:shadow-[var(--focus-ring)] motion-reduce:transition-none ${index === trail.length - 1 ? 'text-foreground' : 'text-foreground-muted'}`}
            >
                {heading.label}
            </a>
        {/each}
        <span aria-hidden="true" class="ms-1.5 h-4 w-px shrink-0 bg-border"></span>
    </nav>
{/if}
