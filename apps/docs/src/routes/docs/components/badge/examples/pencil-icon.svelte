<script lang="ts">
    import { PencilEdit02Icon } from '@hugeicons/core-free-icons';
    import HugeiconsIcon from '@mielui/svelte/hugeicons-icon';

    let {
        size = 13,
        class: className
    }: {
        size?: number | string;
        class?: string;
    } = $props();
</script>

<HugeiconsIcon icon={PencilEdit02Icon} {size} class={className} />
