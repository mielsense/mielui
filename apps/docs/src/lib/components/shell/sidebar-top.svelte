<script lang="ts">
    import { GithubIcon as Github, Search01Icon as Search } from '@hugeicons/core-free-icons';
    import { Button } from '@mielui/svelte/components/button';
    import Kbd from '@mielui/svelte/components/kbd';
    import * as Tooltip from '@mielui/svelte/components/tooltip';
    import HugeiconsIcon from '@mielui/svelte/hugeicons-icon';
    import Logo from '#lib/components/logo.svelte';
    import { getSearch } from '#lib/components/search/context.js';
    import { formatStarCount, GITHUB_URL } from '#lib/github.js';
    import ThemeToggle from './theme-toggle.svelte';

    let { starCount = null }: { starCount?: number | null } = $props();

    const search = getSearch();
</script>

<!--
    @component
    The top of the sidebar, which stands in for a header: the brand with GitHub and the
    theme toggle beside it, then the search field.
-->

<div class="flex shrink-0 flex-col gap-4 pt-4 pb-4">
    <div class="flex items-center gap-1 ps-4 pe-3">
        <div class="me-auto">
            <Logo />
        </div>
        <Tooltip.Root>
            <Tooltip.Trigger>
                <Button
                    variant="ghost"
                    size="icon"
                    href={GITHUB_URL}
                    target="_blank"
                    rel="noreferrer"
                    aria-label="Mielui on GitHub"
                    class="size-8 text-foreground-muted hover:text-foreground"
                >
                    <HugeiconsIcon icon={Github} size={16} />
                </Button>
            </Tooltip.Trigger>
            <Tooltip.Content>
                <span class="tabular-nums">GitHub · {formatStarCount(starCount)}</span>
            </Tooltip.Content>
        </Tooltip.Root>
        <ThemeToggle />
    </div>
    <div class="px-3">
        <button
            type="button"
            onclick={() => {
                search.open = true;
            }}
            class="press flex h-9 w-full items-center gap-2.5 rounded-[10px] border-[length:var(--border-size)] border-border bg-card ps-3 pe-1.5 text-[13px] text-foreground-muted shadow-[0_1px_2px_rgb(0_0_0/0.03)] hover:border-border-strong hover:text-foreground focus-visible:shadow-[var(--focus-ring)] focus-visible:outline-none"
        >
            <HugeiconsIcon icon={Search} size={14} />
            <span class="me-auto">Search the docs</span>
            <Kbd shortcut="cmd+K" />
        </button>
    </div>
</div>
