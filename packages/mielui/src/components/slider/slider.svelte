<script lang="ts">
    import { cn } from '@mielui/svelte/utils';
    import { untrack } from 'svelte';
    import type { SliderProps } from '.';
    import { normalizeValue, valuePercent } from './range';

    let {
        class: className,
        value = $bindable(),
        min = 0,
        max = 100,
        step = 1,
        disabled = false,
        label,
        dir,
        ...mode
    }: SliderProps = $props();

    const minimum = $derived(Number.isFinite(min) ? min : 0);
    const maximum = $derived(Math.max(minimum, Number.isFinite(max) ? max : 100));
    const increment = $derived(Number.isFinite(step) && step > 0 ? step : 1);
    const unavailable = $derived(disabled || maximum <= minimum);
    const rootAttributes = $derived.by(() => {
        const { range, thumbLabels, onValueChange, children, ...attributes } = mode;
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
    const start = $derived(mode.range ? valuePercent(values[0], minimum, maximum) : 0);
    const end = $derived(valuePercent(values[values.length - 1], minimum, maximum));

    value ??= untrack((): number | [number, number] => {
        return mode.range ? [values[0], values[1]] : values[0];
    });

    let element: HTMLDivElement;
    let inputs = $state<HTMLInputElement[]>([]);
    let activeThumb = $state(0);
    let dragging = $state<number | null>(null);
    let pointerId: number | undefined;
    let grabOffset = 0;

    const thumbClasses =
        'absolute inset-x-0 top-1/2 m-0 h-6 w-full -translate-y-1/2 appearance-none bg-transparent outline-none pointer-events-none disabled:cursor-not-allowed [&::-webkit-slider-runnable-track]:bg-transparent [&::-moz-range-track]:bg-transparent [&::-webkit-slider-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-6 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:border-[length:var(--border-size)] [&::-webkit-slider-thumb]:border-border-strong [&::-webkit-slider-thumb]:bg-background dark:[&::-webkit-slider-thumb]:bg-foreground [&::-webkit-slider-thumb]:shadow-[var(--elevation-control)] [&::-webkit-slider-thumb]:cursor-grab [&::-webkit-slider-thumb]:transition-shadow [&::-webkit-slider-thumb]:[transition-duration:var(--motion-duration-press)] [&::-webkit-slider-thumb]:ease-[var(--ease-out)] motion-reduce:[&::-webkit-slider-thumb]:transition-none [&:focus-visible::-webkit-slider-thumb]:shadow-[var(--focus-ring)] [&[data-dragging]::-webkit-slider-thumb]:cursor-grabbing [&[data-dragging]::-webkit-slider-thumb]:shadow-[var(--focus-ring)] [&:disabled::-webkit-slider-thumb]:cursor-not-allowed [&::-moz-range-thumb]:pointer-events-auto [&::-moz-range-thumb]:h-4 [&::-moz-range-thumb]:w-6 [&::-moz-range-thumb]:box-border [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:border-[length:var(--border-size)] [&::-moz-range-thumb]:border-border-strong [&::-moz-range-thumb]:bg-background dark:[&::-moz-range-thumb]:bg-foreground [&::-moz-range-thumb]:shadow-[var(--elevation-control)] [&::-moz-range-thumb]:cursor-grab [&::-moz-range-thumb]:transition-shadow [&::-moz-range-thumb]:[transition-duration:var(--motion-duration-press)] [&::-moz-range-thumb]:ease-[var(--ease-out)] motion-reduce:[&::-moz-range-thumb]:transition-none [&:focus-visible::-moz-range-thumb]:shadow-[var(--focus-ring)] [&[data-dragging]::-moz-range-thumb]:cursor-grabbing [&[data-dragging]::-moz-range-thumb]:shadow-[var(--focus-ring)] [&:disabled::-moz-range-thumb]:cursor-not-allowed';

    function commit(index: number, candidate: number) {
        if (unavailable) {
            return;
        }
        const next = normalizeValue(candidate, minimum, maximum, increment);
        if (mode.range) {
            const pair: [number, number] = [values[0], values[1]];
            pair[index] = index === 0 ? Math.min(next, pair[1]) : Math.max(next, pair[0]);
            if (pair[0] === values[0] && pair[1] === values[1]) {
                return;
            }
            value = pair;
            mode.onValueChange?.(pair);
        } else {
            if (next === values[0]) {
                return;
            }
            value = next;
            mode.onValueChange?.(next);
        }
    }

    function pointerValue(clientX: number) {
        const rect = element.getBoundingClientRect();
        const inset = inputs[0]?.offsetHeight / 2 || 12;
        const width = Math.max(rect.width - inset * 2, 1);
        const ratio = Math.min(1, Math.max(0, (clientX - rect.left - inset) / width));
        const logical = getComputedStyle(element).direction === 'rtl' ? 1 - ratio : ratio;
        return minimum + logical * (maximum - minimum);
    }

    function startDrag(event: PointerEvent) {
        if (
            unavailable ||
            dragging !== null ||
            (event.button !== undefined && event.button !== 0)
        ) {
            return;
        }
        const target = event.target;
        const candidate =
            typeof event.clientX === 'number' ? pointerValue(event.clientX) : values[0];
        let index = target instanceof HTMLInputElement ? Number(target.dataset.thumb) : activeThumb;
        if (mode.range && !(target instanceof HTMLInputElement)) {
            const firstDistance = Math.abs(candidate - values[0]);
            const secondDistance = Math.abs(candidate - values[1]);
            if (firstDistance !== secondDistance) {
                index = firstDistance < secondDistance ? 0 : 1;
            } else if (values[0] === values[1]) {
                index = candidate > values[0] ? 1 : 0;
            }
        }
        grabOffset = target instanceof HTMLInputElement ? candidate - values[index] : 0;
        dragging = index;
        activeThumb = index;
        pointerId = event.pointerId;
        inputs[index]?.setAttribute('data-dragging', '');
        inputs[index]?.focus({ preventScroll: true });
        if (pointerId !== undefined) {
            element.setPointerCapture?.(pointerId);
        }
        event.preventDefault();
        if (typeof event.clientX === 'number' && !(target instanceof HTMLInputElement)) {
            commit(index, candidate);
        }
    }

    function moveDrag(event: PointerEvent) {
        if (dragging !== null && event.pointerId === pointerId) {
            commit(dragging, pointerValue(event.clientX) - grabOffset);
        }
    }

    function endDrag() {
        for (const input of inputs) {
            input?.removeAttribute('data-dragging');
        }
        dragging = null;
        if (pointerId !== undefined && element?.hasPointerCapture?.(pointerId)) {
            element.releasePointerCapture(pointerId);
        }
        pointerId = undefined;
    }

    $effect(() => {
        if (unavailable) {
            endDrag();
        }
    });
</script>

<div
    {...rootAttributes}
    bind:this={element}
    {dir}
    data-ui="slider"
    data-range={mode.range || undefined}
    class={cn(className, 'relative flex min-h-[var(--size-touch)] w-full touch-pan-y select-none items-center md:min-h-6', unavailable && 'opacity-50')}
    onpointerdown={startDrag}
    onpointermove={moveDrag}
    onpointerup={endDrag}
    onpointercancel={endDrag}
    onlostpointercapture={endDrag}
>
    <div
        aria-hidden="true"
        class="relative mx-3 h-1.5 flex-1 overflow-hidden rounded-full bg-secondary"
    >
        <div
            class="absolute inset-y-0 rounded-full bg-primary"
            style:inset-inline-start={`${start}%`}
            style:width={`${end - start}%`}
        ></div>
    </div>
    {#each values as current, index (index)}
        <input
            bind:this={inputs[index]}
            type="range"
            min={minimum}
            max={maximum}
            step={increment}
            disabled={unavailable}
            value={current}
            aria-label={mode.range ? (mode.thumbLabels?.[index] ?? `${label ?? 'Range'} ${index === 0 ? 'minimum' : 'maximum'}`) : label}
            aria-valuemin={mode.range && index === 1 ? values[0] : minimum}
            aria-valuemax={mode.range && index === 0 ? values[1] : maximum}
            aria-valuenow={current}
            data-thumb={index}
            data-dragging={dragging === index || undefined}
            style:z-index={activeThumb === index ? 2 : 1}
            onfocus={() => {
                activeThumb = index;
            }}
            oninput={(event) => {
                commit(index, Number(event.currentTarget.value));
                event.currentTarget.value = String(values[index]);
            }}
            class={thumbClasses}
        />
    {/each}
</div>
