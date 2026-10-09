<script lang="ts">
    import { cn } from '@mielui/svelte/utils';
    import { Switch as BitsSwitch } from 'bits-ui';
    import type { HTMLButtonAttributes } from 'svelte/elements';
    import { fieldMetadata } from '../_internal/field-metadata';
    import type { SwitchProps } from '.';

    let {
        checked = $bindable(false),
        label,
        description,
        disabled = false,
        class: className,
        element = $bindable<HTMLButtonElement | undefined>(),
        onclick: userOnclick,
        id: suppliedId,
        ...rest
    }: SwitchProps & { onclick?: (e: MouseEvent) => void } = $props();

    const isOn = $derived(checked ?? false);

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
        'group relative inline-flex h-5 w-11 shrink-0 items-center rounded-full p-[var(--size-hairline)] hover:cursor-[var(--ui-cursor-interactive)] transition-[background-color,box-shadow] [transition-duration:var(--motion-duration-hover)] ease-[var(--ease-out)] motion-reduce:transition-none focus-visible:outline-none focus-visible:ring-0 focus-visible:shadow-[var(--focus-ring)] disabled:cursor-not-allowed disabled:opacity-[var(--opacity-disabled)]';

    function getElement() {
        return element ?? null;
    }

    function setElement(next: HTMLButtonElement | null) {
        element = next ?? undefined;
    }

    function updateChecked(next: boolean) {
        checked = next;
    }
</script>

<div
    class={cn(
        'flex min-h-[var(--size-touch)] flex-row gap-2.5 md:min-h-0',
        description ? 'items-start' : 'items-center'
    )}
>
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
            isOn ? 'bg-primary' : 'bg-[var(--color-border-strong)]'
        )}
        onclick={userOnclick}
    >
        <span
            aria-hidden="true"
            data-state={isOn ? 'checked' : 'unchecked'}
            class={cn(
                'mielui-glow mielui-glow-neutral block h-full w-6 shrink-0 rounded-full shadow-[var(--mielui-glow-shadow)] dark:[--mielui-glow-color:var(--color-foreground)] will-change-transform transition-[translate,scale] [transition-duration:var(--motion-duration-spring)] ease-[var(--ease-spring-layout)] motion-reduce:transition-none',
                isOn
                    ? 'origin-right translate-x-[calc(var(--spacing)*5-var(--size-hairline)*2)] rtl:origin-left rtl:-translate-x-[calc(var(--spacing)*5-var(--size-hairline)*2)]'
                    : 'origin-left translate-x-0 rtl:origin-right',
                !disabled && 'group-active:scale-x-110 motion-reduce:group-active:scale-x-100'
            )}
        ></span>
    </BitsSwitch.Root>

    {#if label || description}
        <label
            for={metadata.controlId}
            class={`flex min-w-0 flex-col gap-0.5 select-none ${disabled ? 'cursor-not-allowed opacity-[var(--opacity-disabled)]' : 'cursor-[var(--ui-cursor-interactive)]'}`}
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
