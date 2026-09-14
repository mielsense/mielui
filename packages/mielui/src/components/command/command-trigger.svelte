<script lang="ts">
    import type { ButtonProps } from '@mielui/svelte/components/button';
    import * as Modal from '@mielui/svelte/components/modal';

    const { children, class: classProp, ...rest }: ButtonProps = $props();
</script>

<Modal.Trigger {...rest} class={classProp}>
    {#if children}
        {@render children?.()}
    {/if}
</Modal.Trigger>
