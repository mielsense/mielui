import Fuse from 'fuse.js';
import { onDestroy, tick, untrack } from 'svelte';
import { SvelteSet } from 'svelte/reactivity';
import type { Placement } from '../popover';
import type { ComboboxItem, ComboboxState } from '.';

export type RegisteredComboboxItem = ComboboxItem & {
    readonly disabled: boolean;
};

type ControllerOptions = {
    getValue: () => string | undefined;
    setValue: (value: string) => void;
    getOpen: () => boolean;
    setOpen: (open: boolean) => void;
    getPlacement: () => Placement;
    getInert: () => boolean;
    getHoverable: () => boolean;
    getDelay: () => number;
    getCloseDelay: () => number;
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
    const selected = $derived.by(() => {
        const value = options.getValue();
        if (!value) {
            return undefined;
        }
        return (
            entries.find((entry) => entry.value === value)?.item ?? {
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
        if (options.getOpen() === next || (next && disabled)) {
            return;
        }
        if (next) {
            beforeOpen?.();
        }
        options.setOpen(next);
        synchronizeOpen(next);
    }

    function synchronizeOpen(next: boolean) {
        previousOpen = next;
        cancelHover();
        if (next) {
            query =
                appearance === 'input' && searchPlacement === 'trigger'
                    ? (selected?.label ?? '')
                    : '';
        }
        if (next) {
            void tick().then(() => {
                if (options.getOpen()) {
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
        const open = options.getOpen();
        if (open !== previousOpen) {
            untrack(() => {
                synchronizeOpen(open);
            });
        }
    });

    function commitValue(value: string) {
        const entry = entries.find((candidate) => candidate.value === value);
        if (disabled || entry?.disabled) {
            return;
        }
        options.setValue(value);
        entry?.item.callback?.();
    }

    function selectItem(item: ComboboxItem) {
        commitValue(item.value);
        setOpen(false);
    }

    function clearSelection() {
        if (disabled) {
            return;
        }
        query = '';
        activeValue = undefined;
        options.setValue('');
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
        if (!options.getHoverable() || disabled) {
            return;
        }
        hoverTimer = setTimeout(() => {
            setOpen(true);
        }, options.getDelay());
    }

    function hoverLeave() {
        cancelHover();
        if (!options.getHoverable()) {
            return;
        }
        hoverTimer = setTimeout(() => {
            setOpen(false);
        }, options.getCloseDelay());
    }

    const state: ComboboxState = {
        get open() {
            return options.getOpen();
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
        get items() {
            return entries;
        },
        get inputValue() {
            return options.getOpen() ? query : (selected?.label ?? '');
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
            return options.getPlacement();
        },
        get inert() {
            return options.getInert();
        },
        get hoverable() {
            return options.getHoverable();
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
        selectItem,
        clearSelection,
        handleInput,
        handleKeydown,
        hoverEnter,
        hoverLeave,
        cancelHover
    };
}
