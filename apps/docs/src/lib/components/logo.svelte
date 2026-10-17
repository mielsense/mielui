<script lang="ts">
    import BrandMark from '@mielui/svelte/brand-mark';
    import { resolve } from '$app/paths';
</script>

<a
    href={resolve('/')}
    class="flex shrink-0 items-center gap-2.5 rounded-[var(--radius-control)] pe-2 no-underline focus-visible:outline-none focus-visible:shadow-[var(--focus-ring)]"
    aria-label="mielui Home"
>
    <span
        class="grid size-7 place-items-center rounded-[8px] bg-primary [--color-foreground:white]"
    >
        <BrandMark size={19} />
    </span>
    <span class="text-[15px] font-medium tracking-[-0.02em] text-foreground">mielui</span>
</a>
