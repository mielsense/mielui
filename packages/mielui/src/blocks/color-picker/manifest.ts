import type { Manifest } from '@mielui/svelte/_manifest/types';

/**
 * Color picker.
 *
 * 1.0.0 -- initial.
 * 2.0.0: conversion helpers (hexToHsv, hsvToHex, hexToHsl, hslToHex,
 *        isValidHex) extracted to `conversions.ts`. No public-API change;
 *        internal refactor for testability.
 * 3.0.0: BREAKING -- split into a compound API (ColorPicker.Root, .Trigger,
 *        .Content) matching the Popover convention. State is shared via
 *        context. The single `<ColorPicker>` component is gone.
 */
export const manifest: Manifest = {
    name: 'color-picker',
    version: '3.0.0',
    visibility: 'public',
    description:
        'Popover-based color picker with SB drag, hue strip, hex input, and HSL sliders. Optional preset swatches. Composable Root, Trigger, Content, Plane, Hue, Preview, HexInput, Channels, and Presets.',
    files: [
        'components/color-picker/color-picker-root.svelte',
        'components/color-picker/color-picker-trigger.svelte',
        'components/color-picker/color-picker-content.svelte',
        'components/color-picker/color-picker-plane.svelte',
        'components/color-picker/color-picker-hue.svelte',
        'components/color-picker/color-picker-preview.svelte',
        'components/color-picker/color-picker-hex-input.svelte',
        'components/color-picker/color-picker-channels.svelte',
        'components/color-picker/color-picker-presets.svelte',
        'components/color-picker/controller.svelte.ts',
        'components/color-picker/pointer.ts',
        'components/color-picker/context.ts',
        'components/color-picker/conversions.ts',
        'components/color-picker/index.ts',
        'components/color-picker/manifest.ts'
    ],
    components: ['_internal/utils', 'popover', 'button', 'slider'],
    shared: ['hugeicons-icon', 'utils.cn', 'utils.createContext'],
    peerDependencies: {
        '@floating-ui/dom': '1.7.6',
        '@hugeicons/core-free-icons': '^4.3.0',
        cnfast: '^0.0.8',
        svelte: '^5.0.0'
    }
};
