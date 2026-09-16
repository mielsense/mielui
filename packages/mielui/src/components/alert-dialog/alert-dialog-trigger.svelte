<script lang="ts">
    import type { ButtonProps } from '@mielui/svelte/components/button';
    import * as Dialog from '@mielui/svelte/components/dialog';

    let { class: className, children, onclick, ...rest }: ButtonProps = $props();
</script>

<Dialog.Trigger {onclick} class={className} {...rest}>{@render children?.()} </Dialog.Trigger>
