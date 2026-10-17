<script lang="ts">
    import * as Dialog from '@mielui/svelte/components/dialog';
    import type { DefaultProps } from '@mielui/svelte/utils';

    let { children, ...rest }: DefaultProps = $props();
</script>

<Dialog.Footer {...rest}> {@render children?.()} </Dialog.Footer>
