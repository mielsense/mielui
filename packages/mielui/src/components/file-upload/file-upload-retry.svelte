<script lang="ts">
    import { RefreshIcon } from '@hugeicons/core-free-icons';
    import { Button } from '@mielui/svelte/components/button';
    import * as Tooltip from '@mielui/svelte/components/tooltip';
    import HugeiconsIcon from '../../hugeicons-icon.svelte';
    import type { FileUploadButtonProps } from '.';
    import { getItem, getRoot } from './context.svelte';

    let { children, disabled, onclick, ...rest }: FileUploadButtonProps = $props();
    const item = getItem();
    const root = getRoot();
    const label = 'Retry upload';
</script>
{#if item().status === 'error' && item().retryable}
    <Tooltip.Root>
        <Tooltip.Trigger>
            <Button
                variant="ghost"
                size="icon"
                {...rest}
                type="button"
                aria-label={`${label}: ${item().file.name}`}
                disabled={disabled || root.disabled}
                onclick={(event) => {
                    onclick?.(event);
                    if (!event.defaultPrevented) {
                        root.retry(item().id);
                    }
                }}
            >
                {#if children}
                    {@render children()}
                {:else}
                    <HugeiconsIcon icon={RefreshIcon} size={16} />
                {/if}
            </Button>
        </Tooltip.Trigger>
        <Tooltip.Content>{label}</Tooltip.Content>
    </Tooltip.Root>
{/if}
