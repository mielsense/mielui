<script lang="ts">
    import { prefersReducedMotion, Spring } from 'svelte/motion';

    let {
        y,
        from = 0,
        muted = false
    }: { y: number | null; from?: number; muted?: boolean } = $props();
    const position = new Spring({ from: 0, y: 0 }, { stiffness: 0.2, damping: 0.8 });
    $effect(() => {
        void position.set({ from, y: y ?? 0 }, { instant: prefersReducedMotion.current });
    });
</script>

<div
    aria-hidden="true"
    class={`pointer-events-none absolute inset-0 ${muted ? 'text-foreground-muted/40' : 'text-primary'}`}
>
    <span
        style:top={`${position.current.from}px`}
        style:height={`${Math.max(0, position.current.y - 6 - position.current.from)}px`}
        style:opacity={y === null ? 0 : 1}
        class="absolute left-0.5 w-px bg-current"
    ></span>
    <svg
        style:top={`${position.current.y - 6}px`}
        style:opacity={y === null ? 0 : 1}
        width="12"
        height="7"
        viewBox="0 0 12 7"
        fill="none"
        class="absolute left-0.5"
    >
        <path d="M0.5 0a6 6 0 0 0 6 6H12" stroke="currentColor" />
    </svg>
</div>
