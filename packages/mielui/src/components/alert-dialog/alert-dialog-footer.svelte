<script lang="ts">
    import * as Dialog from '@mielui/svelte/components/dialog';
    import type { DefaultProps } from '@mielui/svelte/utils';

    let { class: className, children, ...rest }: DefaultProps = $props();
</script>

<Dialog.Footer class={className} {...rest}> {@render children?.()} </Dialog.Footer>
