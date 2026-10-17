<script lang="ts">
    import { Button } from '@mielui/svelte/components/button';
    import type { FileUploadButtonProps } from '.';
    import { getFileUploadContext } from './context';

    let { children, disabled, onclick, ...rest }: FileUploadButtonProps = $props();

    const root = getFileUploadContext();
</script>

<Button
    {...rest}
    type="button"
    disabled={disabled || root.disabled}
    onclick={(event) => {
        onclick?.(event);

        if (!event.defaultPrevented) {
            root.open();
        }
    }}
>
    {#if children}
        {@render children()}
    {:else}
        {root.labels?.choose ?? 'Choose files'}
    {/if}
</Button>
