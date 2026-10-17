import { type ClassValue, clsx, twMerge } from 'cnfast';
import { getContext, hasContext, type Snippet, setContext } from 'svelte';

export type DefaultProps = {
    /** Classes added to the element. */
    class?: string;
    /** Content rendered inside. */
    children?: Snippet;
} & Partial<Record<`data-${string}`, string | boolean | null>>;

/** Swaps a primitive's `ref` prop for the library's bindable `element`. */
export type WithElement<Props, Node extends Element = HTMLElement> = Omit<Props, 'ref'> & {
    /** Bindable reference to the DOM element. */
    element?: Node | null;
};

/** The visual intents every interactive surface shares. */
export type Intent = 'primary' | 'secondary' | 'ghost' | 'outline' | 'destructive';

/**
 * Merges class values and resolves Tailwind conflicts via cnfast.
 *
 * Mielui uses the `cn(className, extraClasses)` convention -- the consumer's
 * `className` first, library-side classes after. `.reverse()` flips the order
 * into twMerge so the first argument wins on conflicts, which keeps consumer
 * overrides ahead of library defaults.
 */
export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs.reverse()));
}

/**
 * Builds typed Svelte context helpers for one component family.
 *
 * `name` is the kebab-case component name; it becomes both the context key
 * and the PascalCase name in the "used outside its root" error, so
 * `createContext('context-menu')` reports `<ContextMenu.Root>`.
 *
 * `get` throws outside the root. `find` returns `undefined` there, for parts
 * that also work on their own.
 */
export function createContext<T>(name: string) {
    const key = Symbol(`mielui.${name}`);
    const label = name.replace(/(^|-)(\w)/g, (_match, _sep, char: string) => char.toUpperCase());

    return {
        set(value: T) {
            setContext(key, value);
            return value;
        },
        get(): T {
            if (!hasContext(key)) {
                throw new Error(`${label} components must be used within <${label}.Root>.`);
            }
            return getContext<T>(key);
        },
        find(): T | undefined {
            return hasContext(key) ? getContext<T>(key) : undefined;
        }
    };
}

export {
    dynamicWidth,
    pressable,
    travelingHighlight,
    visualViewportBounds
} from './components/_internal/utils/actions';
export {
    clickOutside,
    getFocusableElements,
    inertOutside,
    lockBodyBackground,
    lockBodyScroll,
    pushEscapeLayer,
    resetBodyLocksForTests,
    resetClickOutsideForTests,
    resetEscapeStackForTests,
    trapFocus
} from './components/_internal/utils/overlays';
export {
    isPointInSubmenuTriangle,
    positionFloatingPanel,
    submenuPanelOffset
} from './components/_internal/utils/positioning';
