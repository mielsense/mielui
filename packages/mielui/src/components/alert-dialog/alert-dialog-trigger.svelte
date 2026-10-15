<script lang="ts">
    import type { ButtonProps } from '@mielui/svelte/components/button';
    import * as Dialog from '@mielui/svelte/components/dialog';

    let { element = $bindable(), children, ...rest }: ButtonProps = $props();
</script>

<Dialog.Trigger {...rest} bind:element> {@render children?.()} </Dialog.Trigger>
