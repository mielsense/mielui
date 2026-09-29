<script lang="ts">
    import BrandMark from '@mielui/svelte/brand-mark';
    import { resolve } from '$app/paths';
</script>

<a
    href={resolve('/')}
    class="flex items-center gap-2.5 rounded-[var(--radius-md)] no-underline focus-visible:outline-none focus-visible:shadow-[var(--focus-ring)]"
    aria-label="mielui Home"
>
    <BrandMark size={28} />
    <span class="font-semibold tracking-[-0.02em] text-foreground">mielui</span>
</a>
