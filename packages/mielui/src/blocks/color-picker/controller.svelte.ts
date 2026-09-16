import { createContext } from '@mielui/svelte/utils';
import { untrack } from 'svelte';
import type { ColorPickerContext } from './context';
import {
    hexToHsl,
    hexToHsv,
    hexToRgb,
    hslToHex,
    hsvToHex,
    isValidHex,
    rgbToHex
} from './conversions';

export function createColorPickerController(context: ColorPickerContext) {
    const initial = untrack(() =>
        isValidHex(context.value) ? context.value.toLowerCase() : '#000000'
    );
    const hsv = hexToHsv(initial);
    const hsl = hexToHsl(initial);
    const rgb = hexToRgb(initial);
    const state = $state({
        hue: hsv[0],
        sat: hsv[1],
        val: hsv[2],
        hslH: hsl[0],
        hslS: hsl[1],
        hslL: hsl[2],
        rgbR: rgb[0],
        rgbG: rgb[1],
        rgbB: rgb[2],
        hexInput: initial
    });
    let lastApplied = initial;

    function sync(hex: string, preserve?: 'hsl' | 'hsv') {
        const [h, s, v] = hexToHsv(hex);
        if (preserve !== 'hsv') {
            if (s > 0) {
                state.hue = h;
            }
            state.sat = s;
            state.val = v;
        }
        const [hh, hs, hl] = hexToHsl(hex);
        if (preserve !== 'hsl') {
            if (hs > 0) {
                state.hslH = hh;
            }
            state.hslS = hs;
            state.hslL = hl;
        }
        [state.rgbR, state.rgbG, state.rgbB] = hexToRgb(hex);
        state.hexInput = hex.toLowerCase();
    }

    function commit(hex: string, preserve?: 'hsl' | 'hsv') {
        if (!isValidHex(hex)) {
            return;
        }
        const next = hex.toLowerCase();
        sync(next, preserve);
        lastApplied = next;
        context.apply(next);
    }

    function bounded(raw: string | number, max: number) {
        const value = typeof raw === 'number' ? raw : Number.parseFloat(raw);
        return Number.isFinite(value) ? Math.max(0, Math.min(max, value)) : undefined;
    }

    function setHslChannel(channel: 'h' | 's' | 'l', raw: string | number) {
        const next = bounded(raw, channel === 'h' ? 360 : 100);
        if (next === undefined) {
            return;
        }
        if (channel === 'h') {
            state.hslH = next;
        } else if (channel === 's') {
            state.hslS = next;
        } else {
            state.hslL = next;
        }
        commit(hslToHex(state.hslH, state.hslS, state.hslL), 'hsl');
    }

    function setRgbChannel(channel: 'r' | 'g' | 'b', raw: string | number) {
        const next = bounded(raw, 255);
        if (next === undefined) {
            return;
        }
        if (channel === 'r') {
            state.rgbR = next;
        } else if (channel === 'g') {
            state.rgbG = next;
        } else {
            state.rgbB = next;
        }
        commit(rgbToHex(state.rgbR, state.rgbG, state.rgbB));
    }

    function setHsvChannel(channel: 'h' | 's' | 'v', raw: string | number) {
        const next = bounded(raw, channel === 'h' ? 360 : 100);
        if (next === undefined) {
            return;
        }
        if (channel === 'h') {
            state.hue = next;
        } else if (channel === 's') {
            state.sat = next;
        } else {
            state.val = next;
        }
        commit(hsvToHex(state.hue, state.sat, state.val), 'hsv');
    }

    function setPlane(saturation: number, brightness: number) {
        const s = bounded(saturation, 100);
        const v = bounded(brightness, 100);
        if (s === undefined || v === undefined) {
            return;
        }
        state.sat = s;
        state.val = v;
        commit(hsvToHex(state.hue, s, v), 'hsv');
    }

    function handleHexInput(raw: string) {
        const cleaned = `#${raw.replace(/[^0-9a-fA-F]/g, '').slice(0, 6)}`;
        state.hexInput = cleaned;
        if (isValidHex(cleaned)) {
            commit(cleaned);
        }
    }

    $effect(() => {
        const value = context.value;
        untrack(() => {
            if (isValidHex(value) && value.toLowerCase() !== lastApplied) {
                sync(value);
                lastApplied = value.toLowerCase();
            }
        });
    });

    return {
        state,
        get hueColor() {
            return `hsl(${state.hue}, 100%, 50%)`;
        },
        get previewHex() {
            return isValidHex(state.hexInput) ? state.hexInput : lastApplied;
        },
        applyHex: commit,
        setHslChannel,
        setRgbChannel,
        setHsvChannel,
        setPlane,
        handleHexInput
    };
}

const { get: getColorPickerController, set: setColorPickerController } =
    createContext<ReturnType<typeof createColorPickerController>>('color-picker-controller');

export { getColorPickerController, setColorPickerController };
