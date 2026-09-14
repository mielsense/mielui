<script lang="ts">
    import * as Modal from '@mielui/svelte/components/modal';
    import { cn, type DefaultProps } from '@mielui/svelte/utils';

    let { class: className, children, ...rest }: DefaultProps = $props();
</script>

<Modal.Header {...rest} class={cn(className, 'data-[orientation=vertical]:gap-3')}>
    {@render children?.()}
</Modal.Header>
