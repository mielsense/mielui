<script lang="ts">
    import type { Snippet } from 'svelte';

    const {
        leading,
        children,
        actions
    }: {
        leading?: Snippet;
        children?: Snippet;
        actions?: Snippet;
    } = $props();
</script>

<!--
    @component
    A strip of controls on a frame, above the inset it acts on.
-->

<div class="flex h-10 w-full min-w-0 shrink-0 items-center gap-1.5 px-1.5">
    {@render leading?.()}
    <div class="flex min-w-0 flex-1 items-center gap-1.5">
        {@render children?.()}
    </div>
    <div class="flex shrink-0 items-center gap-1">
        {@render actions?.()}
    </div>
</div>
