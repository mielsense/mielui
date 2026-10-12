import { onMount, tick, untrack } from 'svelte';
import type { SliderProps } from '.';
import { normalizeValue, valuePercent } from './range';

type ModeKey = 'range' | 'variant' | 'onValueChange' | 'onValueCommit' | 'editable' | 'parse';
type RangeProps = Extract<SliderProps, { range: true }>;
type SingleProps = Exclude<SliderProps, RangeProps>;
type SliderMode = Pick<SingleProps, ModeKey> | Pick<RangeProps, ModeKey>;
type SliderValue = number | [number, number];

type ControllerOptions = {
    getValue: () => SliderValue | undefined;
    setValue: (value: SliderValue) => void;
    getMin: () => number;
    getMax: () => number;
    getStep: () => number;
    getDisabled: () => boolean;
    getDir: () => 'ltr' | 'rtl' | undefined;
    getForm: () => string | undefined;
    getMode: () => SliderMode;
    getElement: () => HTMLDivElement | undefined;
    getFormInput: () => HTMLInputElement | undefined;
    getEditor: () => HTMLInputElement | undefined;
};

export function createSliderController(options: ControllerOptions) {
    const minimum = $derived.by(() => {
        const min = options.getMin();

        return Number.isFinite(min) ? min : 0;
    });
    const maximum = $derived.by(() => {
        const max = options.getMax();

        return Math.max(minimum, Number.isFinite(max) ? max : 100);
    });
    const increment = $derived.by(() => {
        const step = options.getStep();

        return Number.isFinite(step) && step > 0 ? step : 1;
    });
    const unavailable = $derived(options.getDisabled() || maximum <= minimum);
    const values = $derived.by(() => {
        const value = options.getValue();

        if (options.getMode().range) {
            const pair = Array.isArray(value) ? value : [minimum, maximum];
            const first = normalizeValue(pair[0], minimum, maximum, increment);
            const second = normalizeValue(pair[1], minimum, maximum, increment);

            return [Math.min(first, second), Math.max(first, second)];
        }

        return [
            normalizeValue(typeof value === 'number' ? value : minimum, minimum, maximum, increment)
        ];
    });

    options.setValue(
        options.getValue() ??
            untrack((): SliderValue => {
                return options.getMode().range ? [values[0], values[1]] : values[0];
            })
    );

    const initialValue = untrack(() => {
        const value = options.getValue();

        return Array.isArray(value) ? [...value] : value;
    });

    let inheritedDirection = $state<'ltr' | 'rtl'>('ltr');
    let activeThumb = $state(0);
    let dragPointer = $state<number | undefined>();
    let dragOffset = 0;
    let pointerPosition: number | undefined;
    let pointerThumb = $state<number | undefined>();
    let interactionRevision = $state(0);
    let pointerStart: string | undefined;
    let editing = $state(false);

    const direction = $derived(options.getDir() ?? inheritedDirection);
    const field = $derived.by(() => {
        const mode = options.getMode();

        return !mode.range && mode.variant === 'field';
    });
    const fieldFill = $derived(valuePercent(values[0], minimum, maximum) / 100);
    const canEdit = $derived(field && options.getMode().editable === true && !unavailable);

    onMount(() => {
        function updateDirection() {
            const element = options.getElement();

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
        const mode = options.getMode();
        const normalized = normalizeValue(pointerPosition ?? next, minimum, maximum, increment);

        if (unavailable || mode.range || normalized === values[0]) {
            return;
        }

        options.setValue(normalized);
        mode.onValueChange?.(normalized);

        if (dragPointer === undefined) {
            mode.onValueCommit?.(normalized);
        }
    }

    function updateRange(next: number[]) {
        const mode = options.getMode();

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

        options.setValue(pair);
        mode.onValueChange?.(pair);

        if (dragPointer === undefined) {
            mode.onValueCommit?.(pair);
        }
    }

    function commitPointer() {
        const mode = options.getMode();
        const start = pointerStart;

        pointerStart = undefined;

        if (start === undefined || start === JSON.stringify(values)) {
            return;
        }

        if (mode.range) {
            mode.onValueCommit?.([values[0], values[1]]);
        } else {
            mode.onValueCommit?.(values[0]);
        }
    }

    function trackElement() {
        return options.getElement()?.querySelector<HTMLElement>('[data-slider-root]');
    }

    function pointerValue(clientX: number, rect: DOMRect) {
        const percent = (clientX - rect.left) / Math.max(rect.width, 1);
        const logical = direction === 'rtl' ? 1 - percent : percent;

        return minimum + logical * (maximum - minimum);
    }

    function focusThumbAfterTick(resolveIndex: () => number | undefined) {
        void tick().then(() => {
            const index = resolveIndex();

            if (index === undefined) {
                return;
            }

            options
                .getElement()
                ?.querySelector<HTMLElement>(`[data-thumb="${index}"]`)
                ?.focus({ preventScroll: true });
        });
    }

    function focusFirstThumb() {
        focusThumbAfterTick(() => 0);
    }

    function stepLarge(event: KeyboardEvent, thumb: HTMLElement) {
        const forward = event.key === 'ArrowUp' || event.key === 'ArrowRight';
        const horizontal = event.key === 'ArrowLeft' || event.key === 'ArrowRight';
        const sign = (forward ? 1 : -1) * (horizontal && direction === 'rtl' ? -1 : 1);
        const distance = sign * increment * 10;

        event.preventDefault();
        event.stopPropagation();

        if (options.getMode().range) {
            const index = Number(thumb.dataset.thumb) === 1 ? 1 : 0;
            const pair = [values[0], values[1]];

            pair[index] += distance;
            activeThumb = index;
            pointerThumb = index;
            updateRange(pair);
            pointerThumb = undefined;

            return;
        }

        updateSingle(values[0] + distance);
    }

    function beginEdit() {
        if (canEdit) {
            editing = true;
        }
    }

    function parseTyped(text: string) {
        const mode = options.getMode();

        if (!mode.range && mode.parse) {
            return mode.parse(text);
        }

        const match = text.match(/-?(?:\d+\.?\d*|\.\d+)(?:e[+-]?\d+)?/i);

        return match ? Number(match[0]) : null;
    }

    function commitEdit(text: string) {
        if (!editing) {
            return;
        }

        editing = false;
        focusFirstThumb();

        const parsed = parseTyped(text);

        if (parsed === null || !Number.isFinite(parsed)) {
            return;
        }

        updateSingle(parsed);
    }

    function cancelEdit() {
        if (!editing) {
            return;
        }

        editing = false;
        focusFirstThumb();
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
        pointerStart = JSON.stringify(values);

        const thumb =
            event.target instanceof Element
                ? event.target.closest<HTMLElement>('[data-thumb]')
                : null;
        const track = trackElement();

        dragOffset = 0;

        if (thumb && track) {
            pointerThumb = Number(thumb.dataset.thumb);
            activeThumb = pointerThumb;
            dragOffset =
                pointerValue(event.clientX, track.getBoundingClientRect()) - values[activeThumb];
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
        options.getElement()?.setPointerCapture(event.pointerId);

        const index = pointerThumb ?? 0;

        focusThumbAfterTick(() => {
            return dragPointer === event.pointerId ? index : undefined;
        });
    }

    function updatePointerPosition(event: PointerEvent) {
        if (dragPointer !== event.pointerId) {
            return;
        }

        const rect = trackElement()?.getBoundingClientRect();

        if (!rect) {
            return;
        }

        pointerPosition = pointerValue(event.clientX, rect) - dragOffset;

        if (options.getMode().range) {
            updateRange(values);
        } else {
            updateSingle(values[0]);
        }
    }

    function finishPointer(event: PointerEvent) {
        if (event.pointerId !== dragPointer) {
            return;
        }

        const element = options.getElement();

        dragPointer = undefined;
        dragOffset = 0;
        pointerPosition = undefined;
        pointerThumb = undefined;

        if (element?.hasPointerCapture(event.pointerId)) {
            element.releasePointerCapture(event.pointerId);
        }

        commitPointer();
    }

    function cancelPointer(event?: PointerEvent) {
        if (dragPointer === undefined || (event && event.pointerId !== dragPointer)) {
            return;
        }

        const element = options.getElement();
        const shouldRestoreFocus = element?.contains(document.activeElement) ?? false;
        const pointer = dragPointer;

        dragPointer = undefined;
        dragOffset = 0;
        pointerPosition = undefined;
        pointerThumb = undefined;

        if (element?.hasPointerCapture(pointer)) {
            element.releasePointerCapture(pointer);
        }

        interactionRevision += 1;

        if (shouldRestoreFocus && !unavailable) {
            focusThumbAfterTick(() => activeThumb);
        }
    }

    function handleKeydown(event: KeyboardEvent) {
        cancelPointer();

        if (
            !unavailable &&
            event.shiftKey &&
            event.key.startsWith('Arrow') &&
            event.target instanceof HTMLElement &&
            event.target.dataset.ui === 'slider-thumb'
        ) {
            stepLarge(event, event.target);

            return;
        }

        if (
            canEdit &&
            !editing &&
            event.key === 'Enter' &&
            event.target instanceof HTMLElement &&
            event.target.dataset.ui === 'slider-thumb'
        ) {
            event.preventDefault();
            beginEdit();
        }
    }

    function resetValue(): SliderValue {
        if (options.getMode().range) {
            return Array.isArray(initialValue)
                ? [initialValue[0], initialValue[1]]
                : [minimum, maximum];
        }

        return typeof initialValue === 'number' ? initialValue : minimum;
    }

    function formOwner() {
        const associated = options.getFormInput()?.form;

        if (associated) {
            return associated;
        }

        const form = options.getForm();

        return form ? document.getElementById(form) : options.getElement()?.closest('form');
    }

    $effect(() => {
        const owner = formOwner();

        if (!(owner instanceof HTMLFormElement)) {
            return;
        }

        function reset(event: Event) {
            queueMicrotask(() => {
                if (event.defaultPrevented) {
                    return;
                }

                cancelPointer();
                options.setValue(resetValue());
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

    $effect(() => {
        if (editing) {
            const editor = options.getEditor();

            editor?.focus({ preventScroll: true });
            editor?.select();
        }
    });

    return {
        get minimum() {
            return minimum;
        },
        get maximum() {
            return maximum;
        },
        get increment() {
            return increment;
        },
        get unavailable() {
            return unavailable;
        },
        get values() {
            return values;
        },
        get direction() {
            return direction;
        },
        get field() {
            return field;
        },
        get fieldFill() {
            return fieldFill;
        },
        get canEdit() {
            return canEdit;
        },
        get editing() {
            return editing;
        },
        get activeThumb() {
            return activeThumb;
        },
        set activeThumb(index: number) {
            activeThumb = index;
        },
        get dragPointer() {
            return dragPointer;
        },
        get pointerThumb() {
            return pointerThumb;
        },
        get interactionRevision() {
            return interactionRevision;
        },
        singleValue,
        rangeValue,
        updateSingle,
        updateRange,
        beginEdit,
        commitEdit,
        cancelEdit,
        startPointer,
        updatePointerPosition,
        finishPointer,
        cancelPointer,
        handleKeydown
    };
}
