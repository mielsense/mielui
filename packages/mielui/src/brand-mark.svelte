<script lang="ts">
    import { cn } from '@mielui/svelte/utils';

    let {
        size = 30,
        class: className,
        label
    }: { size?: number; class?: string; label?: string } = $props();
</script>

<span
    data-ui="brand-mark"
    class={cn(
        className,
        'inline-grid shrink-0 place-items-center bg-transparent text-[var(--color-foreground,#252220)] shadow-none'
    )}
    style:width={`${size}px`}
    style:height={`${size}px`}
    role={label ? 'img' : undefined}
    aria-label={label}
    aria-hidden={label ? undefined : 'true'}
>
    <svg
        viewBox="0 0 52 44"
        fill="none"
        stroke="currentColor"
        stroke-width="2.5"
        stroke-linejoin="round"
        stroke-linecap="round"
        class="block size-full"
        aria-hidden="true"
    >
        <path d="M14 23c1-8 8-13 17-12 10 0 17 7 16 15-1 6-7 9-16 9H17" />
        <path d="m7 21 1-10 8 6 8-3 3 10c0 6-5 10-11 10S5 30 7 21Z" />
        <path d="M11 24c1 2 3 2 4 0m5 0c1 2 3 2 4 0m-9 5h3m27-5c-7-3-15 0-14 5 1 4 7 4 10 2" />
    </svg>
</span>
