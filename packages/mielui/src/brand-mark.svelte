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
        viewBox="0 4 32 28"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linejoin="round"
        stroke-linecap="round"
        class="block size-full"
        aria-hidden="true"
    >
        <path d="M4 18v-8l5 4 5-4v5c6-5 14-1 14 5 0 5-4 7-10 7h-5c-5 0-9-3-9-9Z" />
    </svg>
</span>
