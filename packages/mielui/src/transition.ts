import { cubicOut } from 'svelte/easing';
import { type EasingFunction, fade, type TransitionConfig } from 'svelte/transition';

/**
 * Reads a CSS duration variable and normalizes it to milliseconds.
 *
 * Each branch tests `Number.isFinite` rather than falling back with `||` so a
 * legitimate `0ms` -- the "None" motion preset -- survives instead of being
 * replaced by the fallback.
 */
export function getCssDuration(node: Element, variableName: string, fallback: number) {
    const raw = getComputedStyle(node).getPropertyValue(variableName).trim();
    if (!raw) {
        return fallback;
    }
    if (raw.endsWith('ms')) {
        const parsed = Number.parseFloat(raw);
        return Number.isFinite(parsed) ? parsed : fallback;
    }
    if (raw.endsWith('s')) {
        const parsed = Number.parseFloat(raw);
        return Number.isFinite(parsed) ? parsed * 1000 : fallback;
    }
    const parsed = Number.parseFloat(raw);
    return Number.isFinite(parsed) ? parsed : fallback;
}

function motionDuration(node: Element, variableName: string, fallback: number) {
    if (
        typeof window !== 'undefined' &&
        window.matchMedia?.('(prefers-reduced-motion: reduce)').matches
    ) {
        return 0;
    }
    return getCssDuration(node, variableName, fallback);
}

/**
 * Unit-interval cubic-bezier easing with CSS-compatible control points.
 * Used for the iOS drawer curve, which Svelte's built-in easings cannot express.
 */
export function cubicBezier(x1: number, y1: number, x2: number, y2: number): EasingFunction {
    return (t: number) => {
        if (t <= 0) {
            return 0;
        }
        if (t >= 1) {
            return 1;
        }
        let lo = 0;
        let hi = 1;
        let mid = t;
        for (let i = 0; i < 12; i++) {
            const x = sampleBezier(mid, x1, x2);
            if (Math.abs(x - t) < 1e-4) {
                break;
            }
            if (x < t) {
                lo = mid;
            } else {
                hi = mid;
            }
            mid = (lo + hi) / 2;
        }
        return sampleBezier(mid, y1, y2);
    };
}

/** Cubic bezier basis with p0=0 and p3=1: `B(t) = 3(1-t)²t·p1 + 3(1-t)t²·p2 + t³`. */
function sampleBezier(t: number, p1: number, p2: number) {
    const u = 1 - t;
    return 3 * u * u * t * p1 + 3 * u * t * t * p2 + t * t * t;
}

/** iOS-like drawer curve: cubic-bezier(0.32, 0.72, 0, 1) */
const drawerEase = cubicBezier(0.32, 0.72, 0, 1);

/**
 * Unit-step response of a damped spring, time-normalized so it settles at `t = 1`.
 * The transition helpers share one family with the `--ease-spring-*` curves in
 * ui.css: panel 550/38, layout 550/40, pop 400/26, pop exit 380/28.
 */
export function springEase(stiffness: number, damping: number): EasingFunction {
    const frequency = Math.sqrt(stiffness);
    const ratio = Math.min(damping / (2 * frequency), 0.999);
    const damped = frequency * Math.sqrt(1 - ratio * ratio);
    const position = (seconds: number) => {
        const decay = Math.exp(-ratio * frequency * seconds);
        const wave =
            Math.cos(damped * seconds) +
            ((ratio * frequency) / damped) * Math.sin(damped * seconds);

        return 1 - decay * wave;
    };
    let settle = 2;
    for (let seconds = 2; seconds > 0; seconds -= 0.005) {
        if (Math.abs(position(seconds) - 1) > 0.002) {
            settle = seconds;
            break;
        }
    }

    return (t: number) => {
        if (t <= 0) {
            return 0;
        }
        if (t >= 1) {
            return 1;
        }

        return position(t * settle);
    };
}

const panelSpring = springEase(550, 38);
const popSpring = springEase(400, 26);

function readCssEasing(node: Element, fallback: EasingFunction): EasingFunction {
    const value = getComputedStyle(node).getPropertyValue('--ease-out').trim();
    const match =
        /^cubic-bezier\(\s*([-+.\d]+)\s*,\s*([-+.\d]+)\s*,\s*([-+.\d]+)\s*,\s*([-+.\d]+)\s*\)$/.exec(
            value
        );
    if (match) {
        const [x1, y1, x2, y2] = match.slice(1).map(Number);
        if ([x1, y1, x2, y2].every(Number.isFinite) && x1 >= 0 && x1 <= 1 && x2 >= 0 && x2 <= 1) {
            return cubicBezier(x1, y1, x2, y2);
        }
    }
    if (value === 'linear') {
        return (value) => value;
    }
    return fallback;
}

function readCssNumber(node: Element, names: string[], fallback: number) {
    const style = getComputedStyle(node);
    for (const name of names) {
        const parsed = Number.parseFloat(style.getPropertyValue(name));
        if (Number.isFinite(parsed)) {
            return parsed;
        }
    }
    return fallback;
}

function panelTransition(
    node: Element,
    durationVariable: string,
    fallbackDuration: number,
    options?: {
        easing?: EasingFunction;
        offsetVars?: string[];
        offsetFallback?: number;
        scaleVars?: string[];
        scaleFallback?: number;
        blurVars?: string[];
        blurFallback?: number;
        opacityVars?: string[];
        opacityFallback?: number;
        /**
         * Moves on a spring while opacity and blur finish early on a plain fade,
         * so an overshoot never brightens or re-blurs the panel.
         */
        spring?: EasingFunction;
        /** Starts on the trigger's side of the panel, so it emerges from what opened it. */
        anchored?: boolean;
    }
): TransitionConfig {
    const style = getComputedStyle(node);
    const opacity = Number(style.opacity);
    const baseTransform = style.transform === 'none' ? '' : style.transform;
    const baseFilter = style.filter === 'none' ? '' : style.filter;
    const distance = readCssNumber(
        node,
        options?.offsetVars ?? ['--motion-panel-y'],
        options?.offsetFallback ?? 4
    );
    const offsetY = options?.anchored ? distance * anchoredDirection(node) : distance;
    const endScale = readCssNumber(
        node,
        options?.scaleVars ?? ['--motion-panel-scale-start'],
        options?.scaleFallback ?? 0.98
    );
    const blur = readCssNumber(node, options?.blurVars ?? [], options?.blurFallback ?? 2);
    const opacityStart = readCssNumber(
        node,
        options?.opacityVars ?? ['--motion-opacity-start'],
        options?.opacityFallback ?? 0
    );

    const spring = options?.spring;
    if (spring) {
        return {
            duration: motionDuration(node, durationVariable, fallbackDuration),
            css: (t) => {
                const move = spring(t);
                const fadeProgress = cubicOut(Math.min(t * 2.2, 1));
                const filter = blur > 0 ? `${baseFilter} blur(${(1 - fadeProgress) * blur}px)` : '';

                return `opacity:${(opacityStart + (1 - opacityStart) * fadeProgress) * opacity};transform:${baseTransform} translateY(${(1 - move) * offsetY}px) scale(${endScale + (1 - endScale) * move});${filter ? `filter:${filter}` : ''}`;
            }
        };
    }

    return {
        duration: motionDuration(node, durationVariable, fallbackDuration),
        easing: readCssEasing(node, options?.easing ?? cubicOut),
        css: (t) => {
            const filter = blur > 0 ? `filter:${baseFilter} blur(${(1 - t) * blur}px)` : '';

            return `opacity:${(opacityStart + (1 - opacityStart) * t) * opacity};transform:${baseTransform} translateY(${(1 - t) * offsetY}px) scale(${endScale + (1 - endScale) * t});${filter}`;
        }
    };
}

/** -1 when the panel sits below its trigger and must start higher, 1 when it sits above. */
function anchoredDirection(node: Element) {
    const side =
        node.getAttribute('data-side') ?? node.getAttribute('data-placement')?.split('-')[0];

    return side === 'top' ? 1 : -1;
}

const MENU_MOVEMENT: {
    offsetVars: string[];
    offsetFallback: number;
    scaleVars: string[];
    scaleFallback: number;
    blurVars: string[];
    blurFallback: number;
} = {
    offsetVars: ['--motion-menu-y', '--motion-panel-y'],
    offsetFallback: 4,
    scaleVars: ['--motion-menu-scale-start', '--motion-panel-scale-start'],
    scaleFallback: 0.98,
    blurVars: ['--motion-menu-blur'],
    blurFallback: 0
};

const MODAL_MOVEMENT: typeof MENU_MOVEMENT = {
    offsetVars: ['--motion-modal-y'],
    offsetFallback: 8,
    scaleVars: ['--motion-modal-scale-start'],
    scaleFallback: 0.96,
    blurVars: ['--motion-modal-blur'],
    blurFallback: 0
};

/** Panel enter: springs open in place from a small offset (panel spring, 550/38). */
export function panelIn(node: Element) {
    return panelTransition(node, '--motion-duration-panel-in', 220, {
        ...MENU_MOVEMENT,
        spring: panelSpring,
        anchored: true
    });
}

/** Panel exit: a short fade. A closing menu gets out of the way. */
export function panelOut(node: Element) {
    return panelTransition(node, '--motion-duration-panel-out', 100, {
        ...MENU_MOVEMENT,
        anchored: true
    });
}

/** Dialog enter: pops from a slight shrink (pop spring, 400/26). It never slides from an edge. */
export function dialogIn(node: Element) {
    return panelTransition(node, '--motion-duration-modal-in', 400, {
        ...MODAL_MOVEMENT,
        spring: popSpring
    });
}

/** Dialog exit: softer and faster than the entrance, retracing a quarter of its path. */
export function dialogOut(node: Element) {
    return panelTransition(node, '--motion-duration-modal-out', 150, {
        ...MODAL_MOVEMENT,
        easing: cubicOut
    });
}

export function overlayIn(node: Element) {
    return fade(node, {
        duration: motionDuration(node, '--motion-duration-overlay', 150)
    });
}

export const overlayOut = overlayIn;

export type SheetSide = 'left' | 'right';

function sheetSlide(
    node: Element,
    side: SheetSide,
    durationVariable: string,
    fallbackDuration: number
): TransitionConfig {
    const dir = side === 'left' ? -1 : 1;
    const style = getComputedStyle(node);
    const baseTransform = style.transform === 'none' ? '' : style.transform;

    return {
        duration: motionDuration(node, durationVariable, fallbackDuration),
        easing: drawerEase,
        css: (t) => {
            return `transform:${baseTransform} translate3d(${(1 - t) * 100 * dir}%, 0, 0)`;
        }
    };
}

/** Sheet enter: slides in from the anchored edge with the drawer curve. */
export function sheetIn(node: Element, params: { side?: SheetSide } = {}) {
    return sheetSlide(node, params.side ?? 'right', '--motion-duration-sheet', 420);
}

/** Sheet exit: same path, slightly faster so dismiss feels snappy. */
export function sheetOut(node: Element, params: { side?: SheetSide } = {}) {
    return sheetSlide(node, params.side ?? 'right', '--motion-duration-sheet-out', 294);
}

type ThemedSlideParams = {
    durationVar?: string;
    fallback?: number;
};

/** Vertical slide that reads its duration from a CSS motion variable. */
export const themedSlide = (node: Element, params: ThemedSlideParams = {}): TransitionConfig => {
    const duration = motionDuration(
        node,
        params.durationVar ?? '--motion-duration-panel',
        params.fallback ?? 200
    );
    const style = getComputedStyle(node);
    const opacity = +style.opacity;
    const height = parseFloat(style.height);
    const paddingTop = parseFloat(style.paddingTop);
    const paddingBottom = parseFloat(style.paddingBottom);
    const marginTop = parseFloat(style.marginTop);
    const marginBottom = parseFloat(style.marginBottom);
    const borderTopWidth = parseFloat(style.borderTopWidth);
    const borderBottomWidth = parseFloat(style.borderBottomWidth);
    return {
        duration,
        delay: 0,
        easing: readCssEasing(node, cubicOut),
        css: (t) => {
            const size = Math.max(t, 0);

            return (
                `overflow: hidden;` +
                `opacity: ${Math.min(size * 20, 1) * opacity};` +
                `height: ${size * height}px;` +
                `padding-top: ${size * paddingTop}px;` +
                `padding-bottom: ${size * paddingBottom}px;` +
                `margin-top: ${size * marginTop}px;` +
                `margin-bottom: ${size * marginBottom}px;` +
                `border-top-width: ${size * borderTopWidth}px;` +
                `border-bottom-width: ${size * borderBottomWidth}px;`
            );
        }
    };
};
