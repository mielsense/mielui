<script lang="ts">
    import { Collapsible as BitsCollapsible } from 'bits-ui';
    import type { CollapsibleProps } from '.';

    let { open = $bindable(false), children, disabled = false }: CollapsibleProps = $props();
</script>

<BitsCollapsible.Root bind:open {disabled}>
    {#snippet child()}
        {@render children?.()}
    {/snippet}
</BitsCollapsible.Root>
