<script lang="ts">
    import BrandMark from '@mielui/svelte/brand-mark';
    import { resolve } from '$app/paths';
</script>

<a
    href={resolve('/')}
    class="flex items-center gap-2.5 rounded-[var(--radius-md)] no-underline focus-visible:outline-none focus-visible:shadow-[var(--focus-ring)]"
    aria-label="mielui Home"
>
    <span
        class="grid size-7 place-items-center rounded-[8px] bg-primary [--color-foreground:var(--color-on-primary)]"
    >
        <BrandMark size={19} />
    </span>
    <span class="font-semibold tracking-[-0.02em] text-foreground">mielui</span>
</a>
