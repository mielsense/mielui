<script lang="ts">
    import { cn } from '@mielui/svelte/utils';
    import { Switch as BitsSwitch } from 'bits-ui';
    import type { HTMLButtonAttributes } from 'svelte/elements';
    import { fieldMetadata } from '../_internal/field-metadata';
    import type { SwitchProps } from '.';

    let {
        switched = $bindable<boolean | undefined>(undefined),
        checked = $bindable<boolean | undefined>(undefined),
        label,
        description,
        disabled = false,
        class: className,
        element = $bindable<HTMLButtonElement | undefined>(),
        onclick: userOnclick,
        id: suppliedId,
        ...rest
    }: SwitchProps & { onclick?: (e: MouseEvent) => void } = $props();

    const isOn = $derived(checked ?? switched ?? false);

    const id = $props.id();
    const metadata = $derived(
        fieldMetadata({
            id: suppliedId ?? id,
            metadataId: id,
            label,
            description,
            ariaLabel: rest['aria-label'],
            labelledBy: rest['aria-labelledby'],
            describedBy: rest['aria-describedby']
        })
    );

    const buttonClasses =
        'group relative inline-flex h-5 w-11 shrink-0 items-center rounded-full border-[length:var(--border-size)] p-0.5 transition-[background-color,border-color,box-shadow] [transition-duration:var(--motion-duration-panel)] ease-[var(--ease-out)] motion-reduce:transition-none focus-visible:outline-none focus-visible:ring-0 shadow-[var(--elevation-control-edge)] focus-visible:shadow-[var(--focus-ring),var(--elevation-control-edge)] disabled:cursor-not-allowed disabled:opacity-[var(--opacity-disabled)]';

    function getElement() {
        return element ?? null;
    }

    function setElement(next: HTMLButtonElement | null) {
        element = next ?? undefined;
    }

    function updateChecked(next: boolean) {
        if (checked !== undefined || switched === undefined) {
            checked = next;
        }
        if (switched !== undefined) {
            switched = next;
        }
    }
</script>

<div class="flex min-h-[var(--size-touch)] flex-row items-start gap-2.5 md:min-h-0">
    <BitsSwitch.Root
        bind:ref={getElement, setElement}
        checked={isOn}
        onCheckedChange={updateChecked}
        id={metadata.controlId}
        {...rest}
        name={rest.name ?? undefined}
        value={rest.value ?? undefined}
        type={(rest as HTMLButtonAttributes).type ?? 'button'}
        role="switch"
        aria-label={rest['aria-label']}
        aria-checked={isOn}
        aria-labelledby={metadata.labelledBy}
        aria-describedby={metadata.describedBy}
        data-ui="switch"
        data-state={isOn ? 'checked' : 'unchecked'}
        {disabled}
        class={cn(
            className,
            buttonClasses,
            isOn
                ? 'border-[var(--color-primary-hover)] bg-primary'
                : 'border-[color-mix(in_srgb,var(--color-border-strong)_88%,transparent)] bg-[color-mix(in_srgb,var(--color-foreground)_18%,transparent)] dark:bg-[color-mix(in_srgb,var(--color-foreground)_24%,transparent)]'
        )}
        onclick={userOnclick}
    >
        <span
            aria-hidden="true"
            data-state={isOn ? 'checked' : 'unchecked'}
            class={cn(
                'block h-3.5 w-6 shrink-0 rounded-full bg-[var(--color-on-primary)] ring-1 ring-inset ring-[color-mix(in_srgb,var(--color-foreground)_8%,transparent)] will-change-transform transition-transform [transition-duration:var(--motion-duration-panel)] ease-[var(--ease-out)] motion-reduce:transition-none',
                isOn ? 'translate-x-3.5 rtl:-translate-x-3.5' : 'translate-x-0',
                !disabled && 'group-active:scale-x-110 motion-reduce:group-active:scale-x-100'
            )}
        ></span>
    </BitsSwitch.Root>

    {#if label || description}
        <label
            for={metadata.controlId}
            class={`flex min-w-0 flex-col gap-0.5 select-none ${disabled ? 'cursor-not-allowed opacity-60' : 'cursor-[var(--ui-cursor-interactive)]'}`}
        >
            {#if label}
                <span
                    id={metadata.labelId}
                    class="leading-5 [font-size:var(--font-size-label)] [font-weight:var(--font-weight-label)] [letter-spacing:var(--tracking-label)] text-foreground [font-family:var(--font-sans),sans-serif]"
                >
                    {label}
                </span>
            {/if}
            {#if description}
                <span
                    id={metadata.descriptionId}
                    class="leading-body [font-size:var(--font-size-body)] [font-weight:var(--font-weight-body)] [letter-spacing:var(--tracking-body)] text-foreground-muted"
                >
                    {description}
                </span>
            {/if}
        </label>
    {/if}
</div>
