<script lang="ts">
    import type { ButtonProps } from '@mielui/svelte/components/button';
    import * as Dialog from '@mielui/svelte/components/dialog';

    const { children, class: classProp, ...rest }: ButtonProps = $props();
</script>

<Dialog.Trigger {...rest} class={classProp}>
    {#if children}
        {@render children?.()}
    {/if}
</Dialog.Trigger>
