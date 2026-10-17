<script lang="ts">
    import type { ButtonProps } from '@mielui/svelte/components/button';
    import * as Dialog from '@mielui/svelte/components/dialog';

    let { children, ...rest }: ButtonProps = $props();
</script>

<Dialog.Trigger {...rest}> {@render children?.()} </Dialog.Trigger>
