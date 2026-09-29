<script lang="ts">
    import { Moon02Icon as Moon, Sun03Icon as Sun } from '@hugeicons/core-free-icons';
    import { morph } from '@mielui/svelte/actions/morph';
    import { Button } from '@mielui/svelte/components/button';
    import * as Tooltip from '@mielui/svelte/components/tooltip';
    import HugeiconsIcon from '@mielui/svelte/hugeicons-icon';
    import { mode, toggleMode } from 'mode-watcher';
    import { fromAction } from 'svelte/attachments';
    import GitHubBlack from '$lib/assets/GitHub_Invertocat_Black.svg';
    import GitHubWhite from '$lib/assets/GitHub_Invertocat_White.svg';
    import { formatStarCount } from '$lib/github';

    const { starCount = null }: { starCount?: number | null } = $props();
    const themeLabel = $derived(
        mode.current === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'
    );
    const starLabel = $derived(
        starCount === null ? 'Star mielui on GitHub' : `${formatStarCount(starCount)} GitHub stars`
    );
</script>

<div class="flex shrink-0 items-center gap-1">
    <Button
        class="tabular-nums"
        variant="ghost"
        href="https://github.com/mielsense/mielui"
        target="_blank"
        rel="noreferrer"
        aria-label={starLabel}
    >
        <img src={GitHubBlack} alt="" class="size-4 dark:hidden" />
        <img src={GitHubWhite} alt="" class="hidden size-4 dark:block" />
        <span>{formatStarCount(starCount)}</span>
    </Button>

    <Tooltip.Root>
        <Tooltip.Trigger>
            <Button variant="ghost" onclick={toggleMode} size="icon" aria-label={themeLabel}>
                <span
                    class="inline-flex size-4"
                    aria-hidden="true"
                    {@attach fromAction(morph, () => ({ key: mode.current }))}
                >
                    <HugeiconsIcon icon={mode.current === 'dark' ? Moon : Sun} size={16} />
                </span>
            </Button>
        </Tooltip.Trigger>
        <Tooltip.Content>
            {themeLabel}
        </Tooltip.Content>
    </Tooltip.Root>
</div>
