<script lang="ts">
    import { cn } from '@mielui/svelte/utils';
    import { Slider as SliderPrimitive } from 'bits-ui';
    import type { SliderProps } from '.';
    import { createSliderController } from './controller.svelte';

    const generatedId = $props.id();

    let {
        class: className,
        value = $bindable(),
        min = 0,
        max = 100,
        step = 1,
        disabled = false,
        label,
        labels,
        format,
        id = generatedId,
        name,
        form,
        element = $bindable(),
        'aria-label': ariaLabel,
        'aria-labelledby': labelledBy,
        'aria-describedby': describedBy,
        dir,
        ...mode
    }: SliderProps = $props();

    const named = $derived(ariaLabel ?? label);
    const thumbNames = $derived([labels?.minimum ?? 'minimum', labels?.maximum ?? 'maximum']);

    const rootAttributes = $derived.by(() => {
        const {
            range,
            variant,
            thumbLabels,
            onValueChange,
            onValueCommit,
            editable,
            parse,
            ...attributes
        } = mode;

        return attributes;
    });

    let formInput = $state<HTMLInputElement>();
    let editor = $state<HTMLInputElement>();
    let fieldWidth = $state(0);
    let fieldLabelWidth = $state(0);

    const slider = createSliderController({
        getValue: () => value,
        setValue: (next) => {
            value = next;
        },
        getMin: () => min,
        getMax: () => max,
        getStep: () => step,
        getDisabled: () => disabled,
        getDir: () => dir,
        getForm: () => form,
        getMode: () => mode,
        getElement: () => element,
        getFormInput: () => formInput,
        getEditor: () => editor
    });

    const fieldTickHidden = $derived.by(() => {
        if (!slider.field || !label || fieldWidth === 0) {
            return false;
        }

        const inset = 6;
        const tick = inset + slider.fieldFill * (fieldWidth - inset * 2);

        return tick < fieldLabelWidth + inset * 3;
    });
    const rootClasses = $derived(
        slider.field
            ? 'absolute inset-x-1.5 inset-y-0 flex select-none items-center'
            : 'relative flex min-h-[var(--size-touch)] w-full select-none items-center md:min-h-6'
    );

    function thumbLabel(index: number) {
        if (!mode.range) {
            return named;
        }

        return (
            mode.thumbLabels?.[index] ?? `${named ?? labels?.range ?? 'Range'} ${thumbNames[index]}`
        );
    }

    function thumbLabelledBy(index: number) {
        if (!labelledBy) {
            return undefined;
        }

        return mode.range ? `${labelledBy} ${id}-label-${index}` : labelledBy;
    }

    function thumbActive(index: number, active: boolean) {
        if (slider.dragPointer !== undefined) {
            return slider.pointerThumb === index;
        }

        return active;
    }

    const fieldThumbClasses =
        'h-3.5 w-0.5 shrink-0 rounded-full bg-[var(--color-border-strong)] outline-none transition-colors [transition-duration:var(--motion-duration-hover)] ease-[var(--ease-out)] group-hover:bg-foreground-muted data-active:bg-foreground motion-reduce:transition-none';
    const thumbClasses =
        'mielui-glow mielui-glow-neutral h-4 w-6 shrink-0 cursor-grab rounded-full shadow-[var(--mielui-glow-shadow)] outline-none transition-shadow [transition-duration:var(--motion-duration-hover)] ease-[var(--ease-out)] [--mielui-glow-ring:var(--color-border-strong)] dark:[--mielui-glow-color:var(--color-foreground)] focus-visible:shadow-[var(--focus-ring),var(--mielui-glow-shadow)] data-active:cursor-grabbing data-active:shadow-[var(--focus-ring),var(--mielui-glow-shadow)] data-disabled:cursor-not-allowed motion-reduce:transition-none';
</script>

{#snippet track()}
    {#if !slider.field}
        <span
            data-ui="slider-track"
            aria-hidden="true"
            class="relative h-1.5 w-full overflow-hidden rounded-full bg-secondary"
        >
            <SliderPrimitive.Range
                data-ui="slider-range"
                class="absolute inset-y-0 rounded-full bg-primary"
            />
        </span>
    {/if}
    {#each slider.values as current, index (index)}
        <SliderPrimitive.Thumb {index}>
            {#snippet child({ props, active })}
                <span
                    {...props}
                    aria-label={thumbLabel(index)}
                    aria-labelledby={thumbLabelledBy(index)}
                    aria-describedby={describedBy}
                    aria-valuemin={mode.range && index === 1 ? slider.values[0] : slider.minimum}
                    aria-valuemax={mode.range && index === 0 ? slider.values[1] : slider.maximum}
                    aria-valuenow={current}
                    aria-valuetext={format?.(current)}
                    data-ui="slider-thumb"
                    data-thumb={index}
                    data-active={thumbActive(index, active) || undefined}
                    data-dragging={(slider.dragPointer !== undefined && slider.pointerThumb === index) || undefined}
                    style:z-index={slider.activeThumb === index ? 2 : 1}
                    onfocus={() => {
                        slider.activeThumb = index;
                    }}
                    class={cn(
                        slider.field ? fieldThumbClasses : thumbClasses,
                        fieldTickHidden && 'opacity-0'
                    )}
                ></span>
            {/snippet}
        </SliderPrimitive.Thumb>
        {#if mode.range && labelledBy}
            <span id={`${id}-label-${index}`} class="sr-only">
                {mode.thumbLabels?.[index] ?? thumbNames[index]}
            </span>
        {/if}
    {/each}
{/snippet}

<div
    {...rootAttributes}
    bind:this={element}
    bind:clientWidth={fieldWidth}
    {id}
    {dir}
    data-ui="slider"
    data-range={mode.range || undefined}
    data-variant={slider.field ? 'field' : 'default'}
    class={cn(
        className,
        slider.field
            ? 'group relative flex h-[var(--size-control-md)] w-full touch-pan-y items-center overflow-hidden rounded-[var(--radius-control)] bg-secondary select-none has-[[data-ui=slider-thumb]:focus-visible]:shadow-[var(--focus-ring)]'
            : 'w-full px-3',
        slider.field && (slider.unavailable ? 'cursor-not-allowed' : 'cursor-ew-resize'),
        slider.unavailable && 'opacity-[var(--opacity-disabled)]'
    )}
    onpointerdown={slider.startPointer}
    onpointermove={slider.updatePointerPosition}
    onpointerup={slider.finishPointer}
    onpointercancel={slider.cancelPointer}
    onlostpointercapture={slider.cancelPointer}
    onkeydowncapture={slider.handleKeydown}
>
    {#if name}
        <input
            bind:this={formInput}
            type="hidden"
            {name}
            {form}
            disabled={slider.unavailable}
            value={slider.values[0]}
        />
        {#if mode.range}
            <input
                type="hidden"
                {name}
                {form}
                disabled={slider.unavailable}
                value={slider.values[1]}
            />
        {/if}
    {/if}
    {#if slider.field}
        {#if slider.fieldFill > 0}
            <span
                data-ui="slider-range"
                aria-hidden="true"
                class="pointer-events-none absolute inset-y-0 start-0 bg-[var(--color-border)] transition-colors [transition-duration:var(--motion-duration-hover)] ease-[var(--ease-out)] group-hover:bg-[var(--color-input)] motion-reduce:transition-none"
                style:width={`calc(${slider.fieldFill} * (100% - 0.75rem) + 0.75rem)`}
            ></span>
        {/if}
        <span
            class="pointer-events-none relative z-10 flex w-full min-w-0 items-center justify-between gap-3 px-3.5"
        >
            <span
                bind:clientWidth={fieldLabelWidth}
                data-ui="slider-label"
                class="min-w-0 truncate text-sm text-foreground-muted"
            >
                {label}
            </span>
            {#if slider.editing}
                <input
                    bind:this={editor}
                    type="text"
                    inputmode="decimal"
                    autocomplete="off"
                    spellcheck="false"
                    aria-label={labels?.value?.(named) ?? `${named ?? 'Slider'} value`}
                    data-ui="slider-value-input"
                    value={String(slider.values[0])}
                    class="pointer-events-auto m-0 min-w-[3ch] shrink-0 cursor-text border-0 bg-transparent p-0 text-end font-mono text-xs tabular-nums text-foreground outline-none [field-sizing:content]"
                    onpointerdown={(event) => {
                        event.stopPropagation();
                    }}
                    onkeydown={(event) => {
                        event.stopPropagation();
                        if (event.key === 'Enter') {
                            event.preventDefault();
                            slider.commitEdit(event.currentTarget.value);
                        }
                        if (event.key === 'Escape') {
                            event.preventDefault();
                            slider.cancelEdit();
                        }
                    }}
                    onblur={(event) => {
                        slider.commitEdit(event.currentTarget.value);
                    }}
                />
            {:else if slider.canEdit}
                <button
                    type="button"
                    tabindex={-1}
                    aria-label={labels?.edit?.(named) ?? `Edit ${named ?? 'slider'} value`}
                    data-ui="slider-value"
                    data-editable
                    class="pointer-events-auto m-0 shrink-0 cursor-text border-0 bg-transparent p-0 font-mono text-xs tabular-nums text-foreground decoration-foreground-muted/50 underline-offset-4 hover:underline hover:decoration-dotted"
                    onpointerdown={(event) => {
                        event.stopPropagation();
                    }}
                    onclick={slider.beginEdit}
                >
                    {format ? format(slider.values[0]) : slider.values[0]}
                </button>
            {:else}
                <span
                    data-ui="slider-value"
                    aria-hidden="true"
                    class="shrink-0 font-mono text-xs tabular-nums text-foreground"
                >
                    {format ? format(slider.values[0]) : slider.values[0]}
                </span>
            {/if}
        </span>
    {/if}
    {#key slider.interactionRevision}
        {#if mode.range}
            <SliderPrimitive.Root
                type="multiple"
                bind:value={slider.rangeValue, slider.updateRange}
                autoSort={false}
                min={slider.minimum}
                max={slider.maximum}
                step={slider.increment}
                disabled={slider.unavailable}
                dir={slider.direction}
                thumbPositioning="exact"
                class={rootClasses}
            >
                {@render track()}
            </SliderPrimitive.Root>
        {:else}
            <SliderPrimitive.Root
                type="single"
                bind:value={slider.singleValue, slider.updateSingle}
                min={slider.minimum}
                max={slider.maximum}
                step={slider.increment}
                disabled={slider.unavailable}
                dir={slider.direction}
                thumbPositioning="exact"
                class={rootClasses}
            >
                {@render track()}
            </SliderPrimitive.Root>
        {/if}
    {/key}
</div>
