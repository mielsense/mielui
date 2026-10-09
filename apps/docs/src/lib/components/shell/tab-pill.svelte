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
        `flex h-full min-w-0 flex-1 items-center gap-2 rounded-[var(--radius-control)] ps-3 text-[13px] font-medium focus-visible:outline-none focus-visible:shadow-[var(--focus-ring)] ${onclose ? 'pe-7' : 'pe-3.5'}`
    );
</script>

<div
    data-current={current || undefined}
    class={`group/tab relative flex h-8 max-w-52 shrink-0 items-center rounded-[var(--radius-control)] transition-colors [transition-duration:var(--motion-duration-hover)] motion-reduce:transition-none ${current ? 'bg-secondary text-foreground' : 'text-foreground-muted hover:bg-[var(--color-wash)] hover:text-foreground'}`}
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
            class="absolute end-1.5 flex size-5 items-center justify-center rounded-full text-foreground-muted opacity-0 transition-[opacity,background-color,color] [transition-duration:var(--motion-duration-hover)] group-hover/tab:opacity-100 hover:bg-[var(--color-wash)] hover:text-foreground focus-visible:opacity-100 focus-visible:outline-none focus-visible:shadow-[var(--focus-ring)] motion-reduce:transition-none"
            onclick={onclose}
        >
            <HugeiconsIcon icon={X} size={11} />
        </button>
    {/if}
</div>
