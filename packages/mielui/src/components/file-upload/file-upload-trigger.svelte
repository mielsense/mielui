<script lang="ts">
    import { Button } from '@mielui/svelte/components/button';
    import type { FileUploadButtonProps } from '.';
    import { getRoot } from './context.svelte';

    let { children, disabled, onclick, ...rest }: FileUploadButtonProps = $props();
    const root = getRoot();
</script>
<Button
    {...rest}
    type="button"
    disabled={disabled || root.disabled}
    onclick={(event) => { onclick?.(event); if (!event.defaultPrevented) {
    root.open();
} }}
>
    {#if children}
        {@render children()}
    {:else}
        Choose files
    {/if}
</Button>
