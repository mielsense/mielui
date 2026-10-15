<script lang="ts">
    import * as Dialog from '@mielui/svelte/components/dialog';
    import { cn } from '@mielui/svelte/utils';
    import type { Snippet } from 'svelte';
    import { getDialogContext } from '../../components/dialog/context.svelte';
    import { findCommandLabels } from './context.svelte';

    const dialog = getDialogContext();
    dialog.motion = 'none';
    const labels = findCommandLabels();

    type Props = {
        surface?: 'solid' | 'glass';
        children?: Snippet;
        class?: string;
        allowClickOutside?: boolean;
    };

    let { children, class: className, allowClickOutside = true, ...rest }: Props = $props();
</script>

<Dialog.Content
    {allowClickOutside}
    size="xl"
    showClose={false}
    panelIdPrefix="command"
    data-ui="command-content"
    aria-label={labels?.()?.palette ?? 'Command palette'}
    aria-labelledby={undefined}
    aria-describedby={undefined}
    class={cn(
        className,
        // token-lint-disable-next-line no-literal-length: command palette overlay bounds
        'fixed top-[var(--mielui-viewport-center)] flex max-h-[min(28rem,calc(var(--mielui-viewport-height)-var(--overlay-gutter)))] min-h-20 w-[calc(100%-var(--overlay-gutter))] max-w-[32.5rem] flex-col overflow-hidden [--mielui-plate-radius:calc(var(--radius-2xl)*1.5*var(--mielui-squircle,1))]'
    )}
    surfaceClass="min-h-0 flex-1 gap-0 overflow-hidden p-0"
    {...rest}
>
    {@render children?.()}
</Dialog.Content>
