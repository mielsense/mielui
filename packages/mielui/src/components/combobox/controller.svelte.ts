import Fuse from 'fuse.js';
import { onDestroy, tick, untrack } from 'svelte';
import { SvelteSet } from 'svelte/reactivity';
import type { Placement } from '../popover';
import type { ComboboxItem, ComboboxState } from '.';

export type RegisteredComboboxItem = ComboboxItem & {
    readonly disabled: boolean;
};

type ControllerOptions = {
    value: string | string[] | undefined;
    readonly multiple: boolean;
    open: boolean;
    readonly placement: Placement;
    readonly inert: boolean;
    readonly hoverable: boolean;
    readonly delay: number;
    readonly closeDelay: number;
};

export function createComboboxController(options: ControllerOptions) {
    const items = new SvelteSet<RegisteredComboboxItem>();
    let query = $state('');
    let searchPlacement = $state<'trigger' | 'menu'>('trigger');
    let appearance = $state<'button' | 'input'>('button');
    let threshold = $state(0.28);
    let activeValue = $state<string | undefined>();
    let disabled = $state(false);
    let name = $state<string | undefined>();
    let anchor = $state<HTMLElement | null>(null);
    let trigger = $state<HTMLElement | null>(null);
    let input = $state<HTMLInputElement | null>(null);
    let panel = $state<HTMLElement | null>(null);
    let beforeOpen: (() => void) | undefined;
    let hoverTimer: ReturnType<typeof setTimeout> | undefined;
    let suppressReturnFocus = false;
    let previousOpen = false;

    const entries = $derived(
        Array.from(items).map((item) => ({
            value: item.value,
            label: item.label,
            disabled: item.disabled,
            item
        }))
    );
    const entriesByValue = $derived(new Map(entries.map((entry) => [entry.value, entry])));
    const selectedValues = $derived.by(() => {
        const value = options.value;
        return Array.isArray(value) ? value : value ? [value] : [];
    });
    const selectedValueSet = $derived(new Set(selectedValues));
    const selectionLabel = $derived(
        selectedValues
            .map((value) => {
                return entriesByValue.get(value)?.label ?? value;
            })
            .join(', ')
    );
    const selected = $derived.by(() => {
        const value = selectedValues[0];
        if (value === undefined) {
            return undefined;
        }
        return (
            entriesByValue.get(value)?.item ?? {
                id: '',
                value,
                label: value,
                ref: undefined
            }
        );
    });
    const fuse = $derived(
        new Fuse(entries, {
            keys: ['value', 'label'],
            threshold,
            ignoreLocation: true,
            minMatchCharLength: 1
        })
    );
    const matches = $derived(query ? fuse.search(query).map((result) => result.item) : entries);
    const resultValues = $derived(new Set(matches.map((entry) => entry.value)));
    const results = $derived(new Set<ComboboxItem>(matches.map((entry) => entry.item)));

    function cancelHover() {
        clearTimeout(hoverTimer);
        hoverTimer = undefined;
    }

    function setOpen(next: boolean) {
        if (options.open === next || (next && disabled)) {
            return;
        }
        if (next) {
            beforeOpen?.();
        }
        options.open = next;
        synchronizeOpen(next);
    }

    function synchronizeOpen(next: boolean) {
        previousOpen = next;
        cancelHover();
        if (next) {
            query =
                !options.multiple && appearance === 'input' && searchPlacement === 'trigger'
                    ? (selected?.label ?? '')
                    : '';
            void tick().then(() => {
                if (options.open) {
                    input?.focus({ preventScroll: true });
                    if (searchPlacement === 'trigger') {
                        input?.select();
                    }
                }
            });
        } else {
            const returnFocus = !suppressReturnFocus && searchPlacement === 'menu';
            suppressReturnFocus = false;
            if (returnFocus) {
                void tick().then(() => {
                    trigger?.focus({ preventScroll: true });
                });
            }
        }
    }

    $effect(() => {
        const open = options.open;
        if (open !== previousOpen) {
            untrack(() => {
                synchronizeOpen(open);
            });
        }
    });

    function commitValue(value: string) {
        const entry = entriesByValue.get(value);
        if (disabled || entry?.disabled) {
            return;
        }
        options.value = value;
        entry?.item.callback?.();
    }

    function commitValues(next: string[]) {
        if (disabled) {
            return;
        }
        const nextValues = new Set(next);
        const values = [...nextValues];
        const changed = entries.filter((entry) => {
            return nextValues.has(entry.value) !== selectedValueSet.has(entry.value);
        });
        if (changed.some((entry) => entry.disabled)) {
            return;
        }
        if (
            values.length === selectedValues.length &&
            values.every((value) => selectedValueSet.has(value))
        ) {
            return;
        }
        options.value = values;
        query = '';
        for (const entry of changed) {
            entry.item.callback?.();
        }
    }

    function clearSelection() {
        if (disabled) {
            return;
        }
        query = '';
        activeValue = undefined;
        options.value = options.multiple ? [] : '';
    }

    function handleInput(event: Event) {
        const target = event.currentTarget;
        if (!(target instanceof HTMLInputElement)) {
            return;
        }
        setOpen(true);
        query = target.value;
    }

    function handleKeydown(event: KeyboardEvent) {
        if (event.key === 'Tab') {
            suppressReturnFocus = true;
            if (searchPlacement === 'menu') {
                trigger?.focus({ preventScroll: true });
            }
        }
    }

    function hoverEnter() {
        cancelHover();
        if (!options.hoverable || disabled) {
            return;
        }
        hoverTimer = setTimeout(() => {
            setOpen(true);
        }, options.delay);
    }

    function hoverLeave() {
        cancelHover();
        if (!options.hoverable) {
            return;
        }
        hoverTimer = setTimeout(() => {
            setOpen(false);
        }, options.closeDelay);
    }

    const state: ComboboxState = {
        get open() {
            return options.open;
        },
        set open(value) {
            setOpen(value);
        },
        get items() {
            return items;
        },
        get results() {
            return results;
        },
        get searchContent() {
            return query;
        },
        set searchContent(value) {
            query = value;
        },
        get searchPlacement() {
            return searchPlacement;
        },
        set searchPlacement(value) {
            searchPlacement = value;
        },
        get threshold() {
            return threshold;
        },
        set threshold(value) {
            threshold = value;
        },
        get appearance() {
            return appearance;
        },
        set appearance(value) {
            appearance = value;
        },
        get activeValue() {
            return activeValue;
        },
        set activeValue(value) {
            activeValue = value;
        },
        get selected() {
            return selected;
        }
    };

    onDestroy(cancelHover);

    return {
        state,
        get multiple() {
            return options.multiple;
        },
        get selectionLabel() {
            return selectionLabel;
        },
        get items() {
            return entries;
        },
        get inputValue() {
            return options.open ? query : selectionLabel;
        },
        get disabled() {
            return disabled;
        },
        set disabled(value: boolean) {
            disabled = value;
        },
        get name() {
            return name;
        },
        set name(value: string | undefined) {
            name = value;
        },
        get anchor() {
            return anchor;
        },
        set anchor(value: HTMLElement | null) {
            anchor = value;
        },
        get trigger() {
            return trigger;
        },
        set trigger(value: HTMLElement | null) {
            trigger = value;
        },
        get input() {
            return input;
        },
        set input(value: HTMLInputElement | null) {
            input = value;
        },
        get panel() {
            return panel;
        },
        set panel(value: HTMLElement | null) {
            panel = value;
        },
        get placement() {
            return options.placement;
        },
        get inert() {
            return options.inert;
        },
        get hoverable() {
            return options.hoverable;
        },
        set beforeOpen(value: (() => void) | undefined) {
            beforeOpen = value;
        },
        matches(value: string) {
            return resultValues.has(value);
        },
        register(item: RegisteredComboboxItem) {
            items.add(item);
            return () => {
                items.delete(item);
            };
        },
        suppressReturnFocus() {
            suppressReturnFocus = true;
        },
        setOpen,
        commitValue,
        commitValues,
        clearSelection,
        handleInput,
        handleKeydown,
        hoverEnter,
        hoverLeave,
        cancelHover
    };
}
