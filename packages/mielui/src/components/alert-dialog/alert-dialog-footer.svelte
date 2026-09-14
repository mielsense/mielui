<script lang="ts">
    import * as Modal from '@mielui/svelte/components/modal';
    import type { DefaultProps } from '@mielui/svelte/utils';

    let { class: className, children, ...rest }: DefaultProps = $props();
</script>

<Modal.Footer class={className} {...rest}> {@render children?.()} </Modal.Footer>
