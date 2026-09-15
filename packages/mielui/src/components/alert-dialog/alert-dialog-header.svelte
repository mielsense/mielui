<script lang="ts">
    import * as Dialog from '@mielui/svelte/components/dialog';
    import { cn, type DefaultProps } from '@mielui/svelte/utils';

    let { class: className, children, ...rest }: DefaultProps = $props();
</script>

<Dialog.Header {...rest} class={cn(className, 'data-[orientation=vertical]:gap-3')}>
    {@render children?.()}
</Dialog.Header>
