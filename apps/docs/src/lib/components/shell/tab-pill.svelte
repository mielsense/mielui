<script lang="ts">
    import { Cancel01Icon as X } from '@hugeicons/core-free-icons';
    import HugeiconsIcon from '@mielui/svelte/hugeicons-icon';
    import type { ShellIcon } from './page-icon';

    const {
        label,
        icon,
        current = false,
        href,
        onclick,
        onclose
    }: {
        label: string;
        icon: ShellIcon;
        current?: boolean;
        href?: string;
        onclick?: () => void;
        onclose?: () => void;
    } = $props();

    const bodyClass = $derived(
        `flex h-full min-w-0 flex-1 items-center gap-2.5 rounded-[var(--radius-sm)] ps-3 text-sm font-medium focus-visible:outline-none focus-visible:shadow-[var(--focus-ring)] ${onclose ? 'pe-7' : 'pe-3'}`
    );
</script>

<div
    data-current={current || undefined}
    class={`group/tab relative flex h-8 max-w-56 shrink-0 items-center rounded-[var(--radius-sm)] transition-colors [transition-duration:var(--motion-duration-hover)] motion-reduce:transition-none ${current ? 'bg-[var(--docs-pill)] text-foreground' : 'bg-[color-mix(in_oklab,var(--docs-pill)_45%,transparent)] text-foreground-muted hover:bg-[var(--docs-pill)] hover:text-foreground'}`}
>
    {#if href}
        <a {href} aria-current={current ? 'page' : undefined} class={bodyClass}>
            <HugeiconsIcon {icon} size={15} class="shrink-0" aria-hidden="true" />
            <span class="truncate">{label}</span>
        </a>
    {:else}
        <button type="button" aria-pressed={current} class={bodyClass} {onclick}>
            <HugeiconsIcon {icon} size={15} class="shrink-0" aria-hidden="true" />
            <span class="truncate">{label}</span>
        </button>
    {/if}
    {#if onclose}
        <button
            type="button"
            aria-label={`Close ${label}`}
            class="absolute end-1.5 flex size-5 items-center justify-center rounded-[5px] text-foreground-muted opacity-0 transition-[opacity,background-color,color] [transition-duration:var(--motion-duration-hover)] group-hover/tab:opacity-100 hover:bg-foreground/[0.08] hover:text-foreground focus-visible:opacity-100 focus-visible:outline-none focus-visible:shadow-[var(--focus-ring)] motion-reduce:transition-none"
            onclick={onclose}
        >
            <HugeiconsIcon icon={X} size={11} />
        </button>
    {/if}
</div>
