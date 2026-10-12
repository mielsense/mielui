<script lang="ts">
    import type { ButtonProps } from '@mielui/svelte/components/button';
    import * as Dialog from '@mielui/svelte/components/dialog';

    let { children, class: className, ...rest }: ButtonProps = $props();
</script>

<Dialog.Trigger {...rest} class={className}>
    {#if children}
        {@render children?.()}
    {/if}
</Dialog.Trigger>
