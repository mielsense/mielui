<script lang="ts">
    import { cn } from '@mielui/svelte/utils';
    import { Slider as SliderPrimitive } from 'bits-ui';
    import { onMount, tick, untrack } from 'svelte';
    import type { SliderProps } from '.';
    import { normalizeValue, valuePercent } from './range';

    const generatedId = $props.id();

    let {
        class: className,
        value = $bindable(),
        min = 0,
        max = 100,
        step = 1,
        disabled = false,
        label,
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

    const minimum = $derived(Number.isFinite(min) ? min : 0);
    const maximum = $derived(Math.max(minimum, Number.isFinite(max) ? max : 100));
    const increment = $derived(Number.isFinite(step) && step > 0 ? step : 1);
    const unavailable = $derived(disabled || maximum <= minimum);
    const rootAttributes = $derived.by(() => {
        const { range, variant, thumbLabels, onValueChange, children, ...attributes } = mode;
        return attributes;
    });
    const values = $derived.by(() => {
        if (mode.range) {
            const pair = Array.isArray(value) ? value : [minimum, maximum];
            const first = normalizeValue(pair[0], minimum, maximum, increment);
            const second = normalizeValue(pair[1], minimum, maximum, increment);
            return [Math.min(first, second), Math.max(first, second)];
        }
        return [
            normalizeValue(typeof value === 'number' ? value : minimum, minimum, maximum, increment)
        ];
    });

    value ??= untrack((): number | [number, number] => {
        return mode.range ? [values[0], values[1]] : values[0];
    });

    const initialValue = untrack(() => (Array.isArray(value) ? [...value] : value));
    let formInput = $state<HTMLInputElement>();
    let inheritedDirection = $state<'ltr' | 'rtl'>('ltr');
    let activeThumb = $state(0);
    let dragPointer = $state<number | undefined>();
    let dragOffset = 0;
    let pointerPosition: number | undefined;
    let pointerThumb = $state<number | undefined>();
    let interactionRevision = $state(0);
    const direction = $derived(dir ?? inheritedDirection);
    const field = $derived(!mode.range && mode.variant === 'field');
    const fieldFill = $derived(valuePercent(values[0], minimum, maximum) / 100);
    let fieldWidth = $state(0);
    let fieldLabelWidth = $state(0);
    const fieldTickHidden = $derived.by(() => {
        if (!field || !label || fieldWidth === 0) {
            return false;
        }
        const inset = 6;
        const tick = inset + fieldFill * (fieldWidth - inset * 2);

        return tick < fieldLabelWidth + inset * 3;
    });
    const rootClasses = $derived(
        field
            ? 'absolute inset-x-1.5 inset-y-0 flex select-none items-center'
            : 'relative flex min-h-[var(--size-touch)] w-full select-none items-center md:min-h-6'
    );
    const fieldThumbClasses =
        'h-3.5 w-0.5 shrink-0 rounded-full bg-foreground/25 outline-none transition-colors [transition-duration:var(--motion-duration-hover)] ease-[var(--ease-out)] group-hover:bg-foreground/40 data-active:bg-foreground/60 motion-reduce:transition-none';
    const thumbClasses =
        'h-4 w-6 shrink-0 cursor-grab rounded-full border-[length:var(--border-size)] border-border-strong bg-background shadow-[var(--elevation-control-edge)] outline-none transition-shadow [transition-duration:var(--motion-duration-press)] ease-[var(--ease-out)] dark:bg-foreground focus-visible:shadow-[var(--focus-ring),var(--elevation-control-edge)] data-active:cursor-grabbing data-active:shadow-[var(--focus-ring),var(--elevation-control-edge)] data-disabled:cursor-not-allowed motion-reduce:transition-none';

    onMount(() => {
        function updateDirection() {
            if (element) {
                inheritedDirection = getComputedStyle(element).direction === 'rtl' ? 'rtl' : 'ltr';
            }
        }
        updateDirection();
        const observer = new MutationObserver(updateDirection);
        observer.observe(document.documentElement, {
            attributes: true,
            subtree: true,
            attributeFilter: ['dir']
        });
        return () => {
            observer.disconnect();
        };
    });

    function singleValue() {
        return values[0];
    }

    function rangeValue() {
        return values;
    }

    function updateSingle(next: number) {
        const normalized = normalizeValue(pointerPosition ?? next, minimum, maximum, increment);
        if (unavailable || mode.range || normalized === values[0]) {
            return;
        }
        value = normalized;
        mode.onValueChange?.(normalized);
    }

    function updateRange(next: number[]) {
        if (unavailable || !mode.range) {
            return;
        }
        const changedIndex = pointerThumb ?? (next[0] !== values[0] ? 0 : 1);
        const candidate = normalizeValue(
            pointerPosition ?? next[changedIndex],
            minimum,
            maximum,
            increment
        );
        const pair: [number, number] = [values[0], values[1]];
        pair[changedIndex] =
            changedIndex === 0 ? Math.min(candidate, pair[1]) : Math.max(candidate, pair[0]);
        if (pair[0] === values[0] && pair[1] === values[1]) {
            return;
        }
        value = pair;
        mode.onValueChange?.(pair);
    }

    function startPointer(event: PointerEvent) {
        if (
            event.defaultPrevented ||
            unavailable ||
            event.button !== 0 ||
            dragPointer !== undefined
        ) {
            return;
        }
        dragPointer = event.pointerId;
        const thumb =
            event.target instanceof Element
                ? event.target.closest<HTMLElement>('[data-thumb]')
                : null;
        const track = element?.querySelector<HTMLElement>('[data-slider-root]');
        dragOffset = 0;
        if (thumb && track) {
            pointerThumb = Number(thumb.dataset.thumb);
            activeThumb = pointerThumb;
            const rect = track.getBoundingClientRect();
            const percent = (event.clientX - rect.left) / Math.max(rect.width, 1);
            const logical = direction === 'rtl' ? 1 - percent : percent;
            dragOffset = minimum + logical * (maximum - minimum) - values[activeThumb];
        }
        if (!thumb && track) {
            const handles = Array.from(track.querySelectorAll<HTMLElement>('[data-thumb]'));
            const distances = handles.map((handle) => {
                const rect = handle.getBoundingClientRect();
                return Math.abs(event.clientX - (rect.left + rect.right) / 2);
            });
            pointerThumb = distances.indexOf(Math.min(...distances));
        }
        updatePointerPosition(event);
        element?.setPointerCapture(event.pointerId);
        const index = pointerThumb ?? 0;
        void tick().then(() => {
            if (dragPointer === event.pointerId) {
                element
                    ?.querySelector<HTMLElement>(`[data-thumb="${index}"]`)
                    ?.focus({ preventScroll: true });
            }
        });
    }

    function updatePointerPosition(event: PointerEvent) {
        if (dragPointer !== event.pointerId) {
            return;
        }
        const rect = element
            ?.querySelector<HTMLElement>('[data-slider-root]')
            ?.getBoundingClientRect();
        if (!rect) {
            return;
        }
        const percent = (event.clientX - rect.left) / Math.max(rect.width, 1);
        const logical = direction === 'rtl' ? 1 - percent : percent;
        pointerPosition = minimum + logical * (maximum - minimum) - dragOffset;
        if (mode.range) {
            updateRange(values);
        } else {
            updateSingle(values[0]);
        }
    }

    function finishPointer(event: PointerEvent) {
        if (event.pointerId !== dragPointer) {
            return;
        }
        dragPointer = undefined;
        dragOffset = 0;
        pointerPosition = undefined;
        pointerThumb = undefined;
        if (element?.hasPointerCapture(event.pointerId)) {
            element.releasePointerCapture(event.pointerId);
        }
    }

    function cancelPointer(event?: PointerEvent) {
        if (dragPointer === undefined || (event && event.pointerId !== dragPointer)) {
            return;
        }
        const shouldRestoreFocus = element?.contains(document.activeElement) ?? false;
        const pointer = dragPointer;
        dragPointer = undefined;
        dragOffset = 0;
        pointerPosition = undefined;
        pointerThumb = undefined;
        if (pointer !== undefined && element?.hasPointerCapture(pointer)) {
            element.releasePointerCapture(pointer);
        }
        interactionRevision += 1;
        if (shouldRestoreFocus && !unavailable) {
            void tick().then(() => {
                element
                    ?.querySelector<HTMLElement>(`[data-thumb="${activeThumb}"]`)
                    ?.focus({ preventScroll: true });
            });
        }
    }

    $effect(() => {
        const owner =
            formInput?.form ?? (form ? document.getElementById(form) : element?.closest('form'));
        if (!(owner instanceof HTMLFormElement)) {
            return;
        }
        function reset(event: Event) {
            queueMicrotask(() => {
                if (event.defaultPrevented) {
                    return;
                }
                cancelPointer();
                value = mode.range
                    ? Array.isArray(initialValue)
                        ? [initialValue[0], initialValue[1]]
                        : [minimum, maximum]
                    : typeof initialValue === 'number'
                      ? initialValue
                      : minimum;
            });
        }
        owner.addEventListener('reset', reset);
        return () => {
            owner.removeEventListener('reset', reset);
        };
    });

    $effect(() => {
        if (unavailable) {
            cancelPointer();
        }
    });
</script>

{#snippet track()}
    {#if !field}
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
    {#each values as current, index (index)}
        <SliderPrimitive.Thumb {index}>
            {#snippet child({ props, active })}
                <span
                    {...props}
                    aria-label={mode.range ? (mode.thumbLabels?.[index] ?? `${ariaLabel ?? label ?? 'Range'} ${index === 0 ? 'minimum' : 'maximum'}`) : (ariaLabel ?? label)}
                    aria-labelledby={labelledBy ? (mode.range ? `${labelledBy} ${id}-label-${index}` : labelledBy) : undefined}
                    aria-describedby={describedBy}
                    aria-valuemin={mode.range && index === 1 ? values[0] : minimum}
                    aria-valuemax={mode.range && index === 0 ? values[1] : maximum}
                    aria-valuenow={current}
                    aria-valuetext={format?.(current)}
                    data-ui="slider-thumb"
                    data-thumb={index}
                    data-active={(dragPointer !== undefined ? pointerThumb === index : active) || undefined}
                    data-dragging={(dragPointer !== undefined && pointerThumb === index) || undefined}
                    style:z-index={activeThumb === index ? 2 : 1}
                    onfocus={() => {
                        activeThumb = index;
                    }}
                    class={cn(
                        field ? fieldThumbClasses : thumbClasses,
                        fieldTickHidden && 'opacity-0'
                    )}
                ></span>
            {/snippet}
        </SliderPrimitive.Thumb>
        {#if mode.range && labelledBy}
            <span id={`${id}-label-${index}`} class="sr-only">
                {mode.thumbLabels?.[index] ?? (index === 0 ? 'minimum' : 'maximum')}
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
    data-variant={field ? 'field' : 'default'}
    class={cn(
        className,
        field
            ? 'group relative flex h-[var(--size-control-md)] w-full touch-pan-y items-center overflow-hidden rounded-[var(--radius-lg)] bg-secondary select-none has-[[data-ui=slider-thumb]:focus-visible]:shadow-[var(--focus-ring)]'
            : 'w-full px-3',
        field && (unavailable ? 'cursor-not-allowed' : 'cursor-ew-resize'),
        unavailable && 'opacity-[var(--opacity-disabled)]'
    )}
    onpointerdown={startPointer}
    onpointermove={updatePointerPosition}
    onpointerup={finishPointer}
    onpointercancel={cancelPointer}
    onlostpointercapture={cancelPointer}
    onkeydowncapture={() => {
        cancelPointer();
    }}
>
    {#if name}
        <input
            bind:this={formInput}
            type="hidden"
            {name}
            {form}
            disabled={unavailable}
            value={values[0]}
        />
        {#if mode.range}
            <input type="hidden" {name} {form} disabled={unavailable} value={values[1]} />
        {/if}
    {/if}
    {#if field}
        {#if fieldFill > 0}
            <span
                data-ui="slider-range"
                aria-hidden="true"
                class="pointer-events-none absolute inset-y-0 start-0 bg-foreground/[0.07] transition-colors [transition-duration:var(--motion-duration-hover)] ease-[var(--ease-out)] group-hover:bg-foreground/[0.09] motion-reduce:transition-none"
                style:width={`calc(${fieldFill} * (100% - 0.75rem) + 0.75rem)`}
            ></span>
        {/if}
        <span
            class="pointer-events-none relative z-10 flex w-full min-w-0 items-center justify-between gap-3 px-3"
        >
            <span
                bind:clientWidth={fieldLabelWidth}
                data-ui="slider-label"
                class="min-w-0 truncate text-sm text-foreground-muted"
            >
                {label}
            </span>
            <span
                data-ui="slider-value"
                aria-hidden="true"
                class="shrink-0 font-mono text-xs tabular-nums text-foreground"
            >
                {format ? format(values[0]) : values[0]}
            </span>
        </span>
    {/if}
    {#key interactionRevision}
        {#if mode.range}
            <SliderPrimitive.Root
                type="multiple"
                bind:value={rangeValue, updateRange}
                autoSort={false}
                min={minimum}
                max={maximum}
                step={increment}
                disabled={unavailable}
                dir={direction}
                thumbPositioning="exact"
                class={rootClasses}
            >
                {@render track()}
            </SliderPrimitive.Root>
        {:else}
            <SliderPrimitive.Root
                type="single"
                bind:value={singleValue, updateSingle}
                min={minimum}
                max={maximum}
                step={increment}
                disabled={unavailable}
                dir={direction}
                thumbPositioning="exact"
                class={rootClasses}
            >
                {@render track()}
            </SliderPrimitive.Root>
        {/if}
    {/key}
</div>
