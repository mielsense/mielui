<script lang="ts">
    import { ArrowDown01Icon as ChevronDown } from '@hugeicons/core-free-icons';
    import type { ButtonVariant } from '@mielui/svelte/components/button';
    import { Button } from '@mielui/svelte/components/button';
    import type * as Popover from '@mielui/svelte/components/popover';
    import { cn } from '@mielui/svelte/utils';
    import { Select as BitsSelect, mergeProps } from 'bits-ui';
    import type { Snippet } from 'svelte';
    import type { HTMLButtonAttributes } from 'svelte/elements';
    import HugeiconsIcon from '../../hugeicons-icon.svelte';
    import { buttonAttributes } from '../_internal/button-attributes';
    import { getSelectContext } from './context.svelte';
    import SelectValue from './select-value.svelte';

    const context = getSelectContext();
    const { state } = context;

    type Props = {
        children?: Snippet;
        class?: string;
        variant?: ButtonVariant;
        'aria-labelledby'?: string;
    } & Omit<Popover.PopoverTriggerProps, 'children' | 'class' | 'variant'>;

    let {
        children,
        class: className,
        variant = 'outline',
        onopen,
        onclick,
        ...rest
    }: Props = $props();
    $effect.pre(() => {
        context.triggerId = rest.id ?? `${context.id}-trigger`;
    });
    $effect(() => {
        context.onTriggerOpen = onopen;
        return () => {
            context.onTriggerOpen = undefined;
        };
    });
</script>

<BitsSelect.Trigger {...rest} id={rest.id ?? `${context.id}-trigger`}>
    {#snippet child({ props })}
        <Button
            {...buttonAttributes(mergeProps(rest, { ...props as HTMLButtonAttributes }))}
            role="combobox"
            aria-labelledby={rest['aria-labelledby'] ?? (rest['aria-label'] ? undefined : `${context.id}-value`)}
            aria-controls={`${context.id}-content`}
            onpointerdown={undefined}
            onpointerup={undefined}
            onclick={(event) => {
                onclick?.(event);
                if (event.defaultPrevented || rest.disabled) {
                    return;
                }
                if (event.currentTarget instanceof HTMLElement) {
                    event.currentTarget.focus();
                }
                context.setOpen(!context.open);
            }}
            {variant}
            class={cn(
                className,
                'flex flex-row items-center justify-between',
                variant === 'outline' &&
                    'px-[calc(var(--spacing)*3.5)] [font-weight:var(--font-weight-body)] hover:border-[var(--color-border-strong)] hover:bg-[var(--color-field)] focus-visible:border-primary data-[state=open]:border-[var(--color-border-strong)] data-[state=open]:bg-[var(--color-field)] aria-invalid:border-error aria-invalid:focus-visible:shadow-[0_0_0_calc(var(--border-size)*3)_color-mix(in_srgb,var(--color-error)_30%,transparent)]'
            )}
        >
            <div
                id={`${context.id}-value`}
                class={cn(
                    'flex min-w-0 flex-1 items-center gap-2 overflow-hidden pe-2 text-start leading-normal [&_svg]:shrink-0',
                    state.value.length > 0 ? 'text-foreground' : 'text-foreground-muted'
                )}
            >
                {#if children}
                    {@render children()}
                {:else}
                    <SelectValue />
                {/if}
            </div>
            <HugeiconsIcon
                icon={ChevronDown}
                aria-hidden="true"
                class={cn(
                    'shrink-0 text-foreground-muted transition-transform [transition-duration:var(--motion-duration-flick)] ease-[var(--ease-spring-flick)] motion-reduce:transition-none',
                    context.open && 'rotate-180'
                )}
            />
        </Button>
    {/snippet}
</BitsSelect.Trigger>
