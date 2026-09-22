<script lang="ts">
    import {
        ArrowDown01Icon as ChevronDown,
        ColorPickerIcon as Palette,
        RotateLeft01Icon as RotateCcw,
        Settings01Icon as Settings
    } from '@hugeicons/core-free-icons';
    import * as AlertDialog from '@mielui/svelte/components/alert-dialog';
    import { Button } from '@mielui/svelte/components/button';
    import * as Collapsible from '@mielui/svelte/components/collapsible';
    import * as ColorPicker from '@mielui/svelte/components/color-picker';
    import { CopyButton } from '@mielui/svelte/components/copy-button';
    import * as Dialog from '@mielui/svelte/components/dialog';
    import * as Group from '@mielui/svelte/components/group';
    import Kbd from '@mielui/svelte/components/kbd';
    import { ScrollArea } from '@mielui/svelte/components/scroll-area';
    import * as Select from '@mielui/svelte/components/select';
    import * as Sheet from '@mielui/svelte/components/sheet';
    import { Slider, type SliderProps } from '@mielui/svelte/components/slider';
    import { Switch } from '@mielui/svelte/components/switch';
    import * as Tabs from '@mielui/svelte/components/tabs';
    import { toast } from '@mielui/svelte/components/toast';
    import * as Tooltip from '@mielui/svelte/components/tooltip';
    import * as Typography from '@mielui/svelte/components/typography';
    import HugeiconsIcon from '@mielui/svelte/hugeicons-icon';
    import { builtInThemePresets } from '@mielui/svelte/themes/builtin-presets';
    import {
        applyLiveThemeCss,
        loadStudioTheme,
        saveStudioTheme
    } from '@mielui/svelte/themes/live';
    import {
        DEFAULT_THEME,
        densities,
        motionFeels,
        radiusScales,
        type Theme,
        themeToCss
    } from '@mielui/svelte/themes/theme';
    import { mode, setMode } from 'mode-watcher';
    import { onMount } from 'svelte';
    import { fonts } from '$lib/fonts.svelte';
    import {
        type AnimationTokenDefinition,
        type AnimationTokenName,
        animationTokenDefinitions,
        animationTokenGroups,
        type ColorTokenDefinition,
        type ColorTokenName,
        colorTokenDefinitions,
        colorTokenGroups,
        easingOptions,
        formatCssColor,
        formatMs,
        formatPx,
        formatScale,
        matchingEase,
        normalizeEase,
        parseCssColor,
        parseDurationMs,
        parsePxLength,
        parseScale,
        type SpacingTokenDefinition,
        type SpacingTokenName,
        spacingTokenDefinitions,
        spacingTokenGroups
    } from '$lib/studio-advanced-tokens';
    import { readStudioStorage, removeStudioStorage, writeStudioStorage } from './storage';
    import ThemeSetupDialog from './theme-setup-dialog.svelte';

    type FoundationPalette = {
        base: string;
        border: string;
        background: string;
        secondary: string;
        foreground: string;
        foregroundMuted: string;
        onPrimary: string;
        buttonForeground: string;
    };

    type FoundationColors = {
        light: FoundationPalette;
        dark: FoundationPalette;
    };

    type BrandColors = {
        light: string;
        dark: string;
    };

    type InteractiveCursor = 'default' | 'pointer';

    type StudioExtensions = {
        presetSlug: string;
        headerSize: number;
        headerWeight: FontWeight;
        roleWeights: RoleWeights;
        brandColors: BrandColors;
        foundationColors: FoundationColors;
        advancedTokens: AdvancedTokens;
        surfaceShadows: boolean;
        controlShadows: boolean;
        dialogShadows: boolean;
        travelingHighlight: boolean;
        glassSurfaces?: boolean;
        primaryStroke: boolean;
        interactiveCursor: InteractiveCursor;
    };

    type FontWeight = '400' | '500' | '600' | '700';

    type RoleWeights = {
        body: FontWeight;
        label: FontWeight;
        button: FontWeight;
        badge: FontWeight;
        description: FontWeight;
    };

    const STUDIO_EXTENSIONS_KEY = 'mielui-studio-extensions-v1';
    const DEFAULT_FOUNDATION_COLORS: FoundationColors = {
        light: {
            base: '#ffffff',
            border: '#e8e8e6',
            background: '#fdfdfc',
            secondary: '#efefee',
            foreground: '#1c1c1b',
            foregroundMuted: '#737373',
            onPrimary: '#ffffff',
            buttonForeground: '#1c1c1b'
        },
        dark: {
            base: '#171717',
            border: '#2a2a2a',
            background: '#0a0a0a',
            secondary: '#252525',
            foreground: '#ededed',
            foregroundMuted: '#a3a3a3',
            onPrimary: '#ffffff',
            buttonForeground: '#ededed'
        }
    };
    const DEFAULT_ROLE_WEIGHTS: RoleWeights = {
        body: '400',
        label: '500',
        button: '500',
        badge: '500',
        description: '400'
    };
    const fontWeights = ['400', '500', '600', '700'] as const;
    const cursorChoices = ['default', 'pointer'] as const;

    const brandSwatches = [
        { label: 'Mielui', value: DEFAULT_THEME.brand },
        { label: 'Graphite', value: '#4d607f' },
        { label: 'Grove', value: '#2f7a54' },
        { label: 'Linen', value: '#a44a2f' },
        { label: 'Violet', value: '#7457d9' }
    ];
    const baseSwatches = [
        { label: 'White', value: '#ffffff' },
        { label: 'Porcelain', value: '#fafaf9' },
        { label: 'Graphite', value: '#202020' },
        { label: 'Ink', value: '#171717' }
    ];
    const borderSwatches = [
        { label: 'Mist', value: '#e8e8e6' },
        { label: 'Silver', value: '#d4d4d2' },
        { label: 'Graphite', value: '#3a3a3a' },
        { label: 'Charcoal', value: '#2a2a2a' }
    ];
    const backgroundSwatches = [
        { label: 'Canvas', value: '#fdfdfc' },
        { label: 'Cloud', value: '#f7f7f5' },
        { label: 'Slate', value: '#111318' },
        { label: 'Night', value: '#0a0a0a' }
    ];
    const secondarySwatches = [
        { label: 'Soft', value: '#efefee' },
        { label: 'Stone', value: '#e7e5e4' },
        { label: 'Smoke', value: '#303030' },
        { label: 'Carbon', value: '#252525' }
    ];
    const foregroundSwatches = [
        { label: 'Ink', value: '#1c1c1b' },
        { label: 'Charcoal', value: '#3a3a3a' },
        { label: 'Mist', value: '#a3a3a3' },
        { label: 'Snow', value: '#ededed' }
    ];
    const onPrimarySwatches = [
        { label: 'White', value: '#ffffff' },
        { label: 'Porcelain', value: '#fafaf9' },
        { label: 'Ink', value: '#1c1c1b' },
        { label: 'Night', value: '#0a0a0a' }
    ];

    type AdvancedTokens = {
        colors: Record<'light' | 'dark', Partial<Record<ColorTokenName, string>>>;
        spacing: Partial<Record<SpacingTokenName, string>>;
        animation: Partial<Record<AnimationTokenName, string>>;
    };

    function toFontOption(font: (typeof fonts)[number]) {
        return {
            key: font.name.toLowerCase().replaceAll(' ', '-'),
            label: font.name,
            value: font.family
        };
    }

    const sansFonts = fonts.filter((font) => font.category === 'Sans serif').map(toFontOption);
    const serifFonts = fonts.filter((font) => font.category === 'Serif').map(toFontOption);
    const monoFonts = fonts.filter((font) => font.category === 'Monospace').map(toFontOption);
    const headerFonts = [
        { key: 'same-as-sans', label: 'Same as sans', value: 'var(--font-sans)' },
        ...serifFonts,
        ...sansFonts
    ];
    const themeAxes = [
        'brand',
        'neutral',
        'radius',
        'density',
        'motion',
        'fontSans',
        'fontMono',
        'fontHeader'
    ] as const;
    const radiusTokenNames = ['--radius-sm', '--radius-md', '--radius-lg', '--radius-xl'] as const;
    const movementPresets = ['subtle', 'default', 'expressive'] as const;
    const motionDurationTokenNames: AnimationTokenName[] = [
        '--motion-duration-hover',
        '--motion-duration-menu',
        '--motion-duration-panel',
        '--motion-duration-sheet',
        '--motion-duration-sheet-out',
        '--motion-duration-overlay',
        '--motion-duration-toast-in',
        '--motion-duration-toast-out'
    ];
    let theme = $state<Theme>({
        ...DEFAULT_THEME,
        slug: 'midnight-ledger',
        name: 'Midnight Ledger'
    });
    let baseTheme = $state<Theme>({ ...DEFAULT_THEME });

    let selectedPreset = $state(DEFAULT_THEME.slug);
    let previousPreset = $state(DEFAULT_THEME.slug);
    let previousRadius: Theme['radius'] = DEFAULT_THEME.radius;
    let previousDensity: Theme['density'] = DEFAULT_THEME.density;
    let previousMotion: Theme['motion'] = DEFAULT_THEME.motion;
    let selectedSans = $state('inter');
    let previousSans = $state('inter');
    let selectedHeader = $state('same-as-sans');
    let previousHeader = $state('same-as-sans');
    let selectedMono = $state('jetbrains-mono');
    let previousMono = $state('jetbrains-mono');
    let headerSize = $state(16);
    let headerWeight = $state<FontWeight>('600');
    let roleWeights = $state<RoleWeights>({ ...DEFAULT_ROLE_WEIGHTS });
    let foundationColors = $state<FoundationColors>({
        light: { ...DEFAULT_FOUNDATION_COLORS.light },
        dark: { ...DEFAULT_FOUNDATION_COLORS.dark }
    });
    let advancedTokens = $state<AdvancedTokens>(emptyAdvancedTokens());
    let brandColors = $state<BrandColors>({
        light: DEFAULT_THEME.brand,
        dark: DEFAULT_THEME.brand
    });
    let surfaceShadows = $state(true);
    let controlShadows = $state(true);
    let dialogShadows = $state(true);
    let glassSurfaces = $state(false);
    let travelingHighlight = $state(true);
    let primaryStroke = $state(false);
    let interactiveCursor = $state<InteractiveCursor>('default');
    let colorsModalOpen = $state(false);
    let spacingModalOpen = $state(false);
    let animationModalOpen = $state(false);
    let pendingPreset = $state<string | null>(null);
    let presetDialogOpen = $state(false);
    let copiedKey = $state<'css' | 'json' | null>(null);
    let hydrated = $state(false);
    let appliedDark = $state(false);
    const appMode = $derived(mode.current === 'dark' ? 'dark' : 'light');
    const appModeBinding = {
        get value() {
            return appMode;
        },
        set value(value: string) {
            if (value === 'light' || value === 'dark') {
                setMode(value);
            }
        }
    };
    const foundationColorChanges = $derived(
        (['light', 'dark'] as const).reduce((count, colorMode) => {
            const changedColors = Object.entries(foundationColors[colorMode]).filter(
                ([key, value]) =>
                    value !== DEFAULT_FOUNDATION_COLORS[colorMode][key as keyof FoundationPalette]
            ).length;

            return count + changedColors;
        }, 0)
    );
    const advancedColorChanges = $derived(
        countTokenOverrides(advancedTokens.colors.light) +
            countTokenOverrides(advancedTokens.colors.dark)
    );
    const spacingTokenChanges = $derived(countTokenOverrides(advancedTokens.spacing));
    const animationTokenChanges = $derived(countTokenOverrides(advancedTokens.animation));
    const advancedTokenChanges = $derived(
        advancedColorChanges + spacingTokenChanges + animationTokenChanges
    );
    const roleWeightChanges = $derived(
        Object.entries(roleWeights).filter(
            ([key, value]) => value !== DEFAULT_ROLE_WEIGHTS[key as keyof RoleWeights]
        ).length
    );
    const changedAxisCount = $derived(
        themeAxes.filter((axis) => theme[axis] !== baseTheme[axis]).length +
            (brandColors.light !== baseTheme.brand || brandColors.dark !== baseTheme.brand
                ? 1
                : 0) +
            foundationColorChanges +
            advancedTokenChanges +
            (headerSize === 16 ? 0 : 1) +
            (headerWeight === '600' ? 0 : 1) +
            roleWeightChanges +
            (surfaceShadows ? 0 : 1) +
            (controlShadows ? 0 : 1) +
            (dialogShadows ? 0 : 1) +
            (travelingHighlight ? 0 : 1) +
            (primaryStroke ? 1 : 0) +
            (glassSurfaces ? 1 : 0) +
            (interactiveCursor === 'default' ? 0 : 1)
    );
    const dirty = $derived(changedAxisCount > 0);
    let setupOpen = $state(false);
    const exportedTheme: Theme = $derived({
        ...theme,
        version: 4,
        foundation: foundationColors,
        typography: { headerSize, headerWeight, roleWeights },
        chrome: {
            surfaceShadows,
            controlShadows,
            dialogShadows,
            travelingHighlight: travelingHighlight ? undefined : false,
            primaryStroke,
            interactiveCursor
        },
        tokens: {
            shared: {
                ...cleanTokens(advancedTokens.spacing),
                ...cleanTokens(advancedTokens.animation),
                '--mielui-surface': glassSurfaces ? 'glass' : 'solid'
            },
            light: {
                ...brandTokens(brandColors.light),
                ...cleanTokens(advancedTokens.colors.light)
            },
            dark: { ...brandTokens(brandColors.dark), ...cleanTokens(advancedTokens.colors.dark) }
        }
    });
    const generatedCss = $derived(themeToCss(exportedTheme));
    const generatedJson = $derived(JSON.stringify(exportedTheme, null, 2));
    function brandTokens(color: string) {
        return {
            '--color-primary': color,
            '--color-primary-hover': `color-mix(in srgb, ${color} 78%, black)`,
            '--color-ring': `color-mix(in srgb, ${color} 30%, transparent)`
        };
    }
    function cleanTokens(overrides: Partial<Record<string, string>>): Record<string, string> {
        return Object.fromEntries(
            Object.entries(overrides).filter((entry): entry is [string, string] =>
                Boolean(entry[1]?.trim())
            )
        );
    }

    function emptyAdvancedTokens(): AdvancedTokens {
        return {
            colors: { light: {}, dark: {} },
            spacing: {},
            animation: {}
        };
    }

    function countTokenOverrides<T extends string>(overrides: Partial<Record<T, string>>) {
        return (Object.values(overrides) as (string | undefined)[]).filter((value) => value?.trim())
            .length;
    }

    function formatChoice(value: string) {
        if (value === 'comfortable') {
            return 'Comfy';
        }
        if (value === 'expressive') {
            return 'Bold';
        }
        if (value === 'true') {
            return 'True';
        }
        return value.charAt(0).toUpperCase() + value.slice(1);
    }

    function isRadiusScale(value: string): value is Theme['radius'] {
        return (radiusScales as readonly string[]).includes(value);
    }

    function isDensity(value: string): value is Theme['density'] {
        return (densities as readonly string[]).includes(value);
    }

    function isMotionFeel(value: string): value is Theme['motion'] {
        return (motionFeels as readonly string[]).includes(value);
    }

    function findSansKey(value: string) {
        return sansFonts.find((font) => font.value === value)?.key ?? 'inter';
    }

    function findMonoKey(value: string) {
        return monoFonts.find((font) => font.value === value)?.key ?? 'jetbrains-mono';
    }

    function findHeaderKey(value: string) {
        return headerFonts.find((font) => font.value === value)?.key ?? 'same-as-sans';
    }

    function syncFontSelections(nextTheme: Theme) {
        selectedSans = findSansKey(nextTheme.fontSans);
        previousSans = selectedSans;
        selectedHeader = findHeaderKey(nextTheme.fontHeader);
        previousHeader = selectedHeader;
        selectedMono = findMonoKey(nextTheme.fontMono);
        previousMono = selectedMono;
    }

    function loadStudioExtensions() {
        const raw = readStudioStorage(STUDIO_EXTENSIONS_KEY);
        if (!raw) {
            return;
        }
        try {
            const value = JSON.parse(raw) as Partial<StudioExtensions>;
            if (typeof value.presetSlug === 'string') {
                const preset = builtInThemePresets.find(
                    (candidate) => candidate.slug === value.presetSlug
                );
                if (preset) {
                    selectedPreset = preset.slug;
                    previousPreset = preset.slug;
                    baseTheme = { ...preset };
                }
            }
            if (typeof value.headerSize === 'number') {
                headerSize = value.headerSize;
            }
            if (value.headerWeight) {
                headerWeight = value.headerWeight;
            }
            if (value.roleWeights) {
                roleWeights = { ...DEFAULT_ROLE_WEIGHTS, ...value.roleWeights };
            }
            if (value.foundationColors) {
                const lightFoundationColors = value.foundationColors.light as FoundationPalette & {
                    muted?: string;
                };
                const darkFoundationColors = value.foundationColors.dark as FoundationPalette & {
                    muted?: string;
                };
                const { muted: _lightMuted, ...light } = lightFoundationColors;
                const { muted: _darkMuted, ...dark } = darkFoundationColors;

                foundationColors = {
                    light: {
                        ...DEFAULT_FOUNDATION_COLORS.light,
                        ...light
                    },
                    dark: {
                        ...DEFAULT_FOUNDATION_COLORS.dark,
                        ...dark
                    }
                };
            }
            if (value.advancedTokens) {
                const lightTokens = {
                    ...value.advancedTokens.colors?.light
                } as Record<string, string | undefined>;
                const darkTokens = {
                    ...value.advancedTokens.colors?.dark
                } as Record<string, string | undefined>;
                const { '--color-muted': _lightMuted, ...light } = lightTokens;
                const { '--color-muted': _darkMuted, ...dark } = darkTokens;

                advancedTokens = {
                    colors: {
                        light,
                        dark
                    },
                    spacing: { ...value.advancedTokens.spacing },
                    animation: { ...value.advancedTokens.animation }
                };
            }
            if (value.brandColors) {
                brandColors = {
                    light: value.brandColors.light ?? baseTheme.brand,
                    dark: value.brandColors.dark ?? baseTheme.brand
                };
            }
            const shadowsOff = (value as { shadows?: unknown }).shadows === false;
            if (typeof value.surfaceShadows === 'boolean') {
                surfaceShadows = value.surfaceShadows;
            } else if (shadowsOff) {
                surfaceShadows = false;
            }
            if (typeof value.controlShadows === 'boolean') {
                controlShadows = value.controlShadows;
            } else if (shadowsOff) {
                controlShadows = false;
            }
            if (typeof value.dialogShadows === 'boolean') {
                dialogShadows = value.dialogShadows;
            } else if (shadowsOff) {
                dialogShadows = false;
            }
            if (typeof value.glassSurfaces === 'boolean') {
                glassSurfaces = value.glassSurfaces;
            }
            if (typeof value.travelingHighlight === 'boolean') {
                travelingHighlight = value.travelingHighlight;
            }
            if (typeof value.primaryStroke === 'boolean') {
                primaryStroke = value.primaryStroke;
            }
            if (value.interactiveCursor === 'default' || value.interactiveCursor === 'pointer') {
                interactiveCursor = value.interactiveCursor;
            }
        } catch {
            removeStudioStorage(STUDIO_EXTENSIONS_KEY);
        }
    }

    function saveStudioExtensions() {
        const extensions: StudioExtensions = {
            presetSlug: selectedPreset,
            headerSize,
            headerWeight,
            roleWeights: { ...roleWeights },
            brandColors: { ...brandColors },
            foundationColors: {
                light: { ...foundationColors.light },
                dark: { ...foundationColors.dark }
            },
            advancedTokens: {
                colors: {
                    light: { ...advancedTokens.colors.light },
                    dark: { ...advancedTokens.colors.dark }
                },
                spacing: { ...advancedTokens.spacing },
                animation: { ...advancedTokens.animation }
            },
            surfaceShadows,
            controlShadows,
            dialogShadows,
            travelingHighlight,
            glassSurfaces,
            primaryStroke,
            interactiveCursor
        };
        writeStudioStorage(STUDIO_EXTENSIONS_KEY, JSON.stringify(extensions));
    }

    function applyPreset(slug: string) {
        const preset = builtInThemePresets.find((candidate) => candidate.slug === slug);
        if (!preset) {
            return;
        }

        const draftIdentity = {
            slug: theme.slug,
            name: theme.name,
            description: theme.description
        };
        baseTheme = { ...preset };
        theme = { ...preset, ...draftIdentity };
        headerSize = 16;
        headerWeight = '600';
        roleWeights = { ...DEFAULT_ROLE_WEIGHTS };
        foundationColors = {
            light: { ...DEFAULT_FOUNDATION_COLORS.light },
            dark: { ...DEFAULT_FOUNDATION_COLORS.dark }
        };
        advancedTokens = emptyAdvancedTokens();
        brandColors = { light: preset.brand, dark: preset.brand };
        surfaceShadows =
            preset.chrome?.shadows !== false && preset.chrome?.surfaceShadows !== false;
        controlShadows =
            preset.chrome?.shadows !== false && preset.chrome?.controlShadows !== false;
        dialogShadows = preset.chrome?.shadows !== false && preset.chrome?.dialogShadows !== false;
        glassSurfaces = preset.tokens?.shared?.['--mielui-surface'] === 'glass';
        travelingHighlight = preset.chrome?.travelingHighlight !== false;
        primaryStroke = false;
        interactiveCursor = 'default';
        syncFontSelections(theme);
    }

    function resetTheme() {
        theme = {
            ...baseTheme,
            slug: theme.slug,
            name: theme.name,
            description: theme.description
        };
        headerSize = 16;
        headerWeight = '600';
        roleWeights = { ...DEFAULT_ROLE_WEIGHTS };
        foundationColors = {
            light: { ...DEFAULT_FOUNDATION_COLORS.light },
            dark: { ...DEFAULT_FOUNDATION_COLORS.dark }
        };
        advancedTokens = emptyAdvancedTokens();
        brandColors = { light: baseTheme.brand, dark: baseTheme.brand };
        surfaceShadows =
            baseTheme.chrome?.shadows !== false && baseTheme.chrome?.surfaceShadows !== false;
        controlShadows =
            baseTheme.chrome?.shadows !== false && baseTheme.chrome?.controlShadows !== false;
        dialogShadows =
            baseTheme.chrome?.shadows !== false && baseTheme.chrome?.dialogShadows !== false;
        glassSurfaces = baseTheme.tokens?.shared?.['--mielui-surface'] === 'glass';
        travelingHighlight = baseTheme.chrome?.travelingHighlight !== false;
        primaryStroke = false;
        interactiveCursor = 'default';
        syncFontSelections(theme);
    }

    function updateBrand(value: string) {
        const next = value.toLowerCase();
        brandColors = { ...brandColors, [appMode]: next };
        theme = { ...theme, brand: brandColors.light };
    }

    function updateFoundationColor(key: keyof FoundationPalette, value: string) {
        foundationColors = {
            ...foundationColors,
            [appMode]: {
                ...foundationColors[appMode],
                [key]: value.toLowerCase()
            }
        };
    }

    function updateRoleWeight(key: keyof RoleWeights, value: FontWeight) {
        roleWeights = { ...roleWeights, [key]: value };
    }

    function updateAdvancedColorToken(name: ColorTokenName, value: string) {
        advancedTokens = {
            ...advancedTokens,
            colors: {
                ...advancedTokens.colors,
                [appMode]: {
                    ...advancedTokens.colors[appMode],
                    [name]: value
                }
            }
        };
    }

    function updateAdvancedSpacingToken(name: SpacingTokenName, value: string) {
        advancedTokens = {
            ...advancedTokens,
            spacing: { ...advancedTokens.spacing, [name]: value }
        };
    }

    function updateAdvancedAnimationToken(name: AnimationTokenName, value: string) {
        advancedTokens = {
            ...advancedTokens,
            animation: { ...advancedTokens.animation, [name]: value }
        };
    }

    function colorTokenFallback(definition: ColorTokenDefinition) {
        if (appMode === 'dark' && 'darkFallback' in definition && definition.darkFallback) {
            return definition.darkFallback;
        }

        return definition.fallback;
    }

    function readCssVar(name: string) {
        if (typeof document === 'undefined') {
            return '';
        }

        return getComputedStyle(document.documentElement).getPropertyValue(name).trim();
    }

    function resolveTokenRaw(name: string) {
        const colorOverride = advancedTokens.colors[appMode][name as ColorTokenName];
        if (colorOverride?.trim()) {
            return colorOverride.trim();
        }

        const spacingOverride = advancedTokens.spacing[name as SpacingTokenName];
        if (spacingOverride?.trim()) {
            return spacingOverride.trim();
        }

        const animationOverride = advancedTokens.animation[name as AnimationTokenName];
        if (animationOverride?.trim()) {
            return animationOverride.trim();
        }

        const computed = readCssVar(name);
        if (computed) {
            return computed;
        }

        const colorDefinition = colorTokenDefinitions.find((item) => item.name === name);
        if (colorDefinition) {
            return colorTokenFallback(colorDefinition);
        }

        const spacingDefinition = spacingTokenDefinitions.find((item) => item.name === name);
        if (spacingDefinition) {
            return spacingDefinition.fallback;
        }

        const animationDefinition = animationTokenDefinitions.find((item) => item.name === name);
        if (animationDefinition) {
            return animationDefinition.fallback;
        }

        return '';
    }

    function resolveColorToken(definition: ColorTokenDefinition) {
        const domReady = (appliedDark ? 'dark' : 'light') === appMode;
        const override = advancedTokens.colors[appMode][definition.name]?.trim() ?? '';
        const computed = domReady ? readCssVar(definition.name) : '';
        const raw = override || computed || colorTokenFallback(definition);
        const parsed = parseCssColor(raw, resolveTokenRaw);
        if (parsed) {
            return parsed;
        }

        return {
            hex: '#000000',
            alpha: 1
        };
    }

    function resolveSpacingToken(definition: SpacingTokenDefinition) {
        const override = advancedTokens.spacing[definition.name]?.trim() ?? '';
        const raw = override || readCssVar(definition.name) || definition.fallback;
        return parsePxLength(raw, resolveTokenRaw);
    }

    function resolveAnimationRaw(definition: AnimationTokenDefinition) {
        const override = advancedTokens.animation[definition.name]?.trim() ?? '';
        return override || readCssVar(definition.name) || definition.fallback;
    }

    function animationSliderValue(definition: AnimationTokenDefinition) {
        const raw = resolveAnimationRaw(definition);
        if (definition.kind === 'duration') {
            return parseDurationMs(raw);
        }

        if (definition.kind === 'scale' || definition.kind === 'opacity') {
            return parseScale(raw);
        }

        return parsePxLength(raw, resolveTokenRaw);
    }

    function animationSliderDisplay(definition: AnimationTokenDefinition, value: number) {
        if (definition.kind === 'duration') {
            return formatMs(value);
        }

        if (definition.kind === 'scale' || definition.kind === 'opacity') {
            return formatScale(value);
        }

        return formatPx(value);
    }

    function commitAnimationSlider(definition: AnimationTokenDefinition, value: number) {
        if (definition.kind === 'duration') {
            updateAdvancedAnimationToken(definition.name, formatMs(value));
            return;
        }

        if (definition.kind === 'scale' || definition.kind === 'opacity') {
            updateAdvancedAnimationToken(definition.name, formatScale(value));
            return;
        }

        updateAdvancedAnimationToken(definition.name, formatPx(value));
    }

    function animationEaseValue(definition: AnimationTokenDefinition) {
        return matchingEase(resolveAnimationRaw(definition));
    }

    function headerSliderProps(): SliderProps {
        return {
            value: headerSize,
            min: 16,
            max: 48,
            step: 1,
            label: 'Header size',
            class: 'h-4',
            onValueChange: (value) => {
                headerSize = value;
            }
        };
    }

    function confirmPresetChange() {
        if (!pendingPreset) {
            return;
        }
        previousPreset = pendingPreset;
        selectedPreset = pendingPreset;
        applyPreset(pendingPreset);
        pendingPreset = null;
    }

    onMount(() => {
        const storedTheme = loadStudioTheme();
        if (storedTheme) {
            theme = { ...storedTheme };
            syncFontSelections(theme);
        }
        loadStudioExtensions();
        previousRadius = theme.radius;
        previousDensity = theme.density;
        previousMotion = theme.motion;
        hydrated = true;
        const root = document.documentElement;
        appliedDark = root.classList.contains('dark');
        const observer = new MutationObserver(() => {
            appliedDark = root.classList.contains('dark');
        });
        observer.observe(root, { attributes: true, attributeFilter: ['class'] });

        return () => observer.disconnect();
    });

    $effect(() => {
        if (selectedPreset === previousPreset) {
            return;
        }
        const nextPreset = selectedPreset;
        if (dirty) {
            pendingPreset = nextPreset;
            selectedPreset = previousPreset;
            presetDialogOpen = true;
            return;
        }
        previousPreset = nextPreset;
        applyPreset(nextPreset);
    });

    $effect(() => {
        if (!hydrated) {
            previousRadius = theme.radius;
            previousDensity = theme.density;
            previousMotion = theme.motion;
            return;
        }
        const radiusChanged = theme.radius !== previousRadius;
        const densityChanged = theme.density !== previousDensity;
        const motionChanged = theme.motion !== previousMotion;
        if (!radiusChanged && !densityChanged && !motionChanged) {
            return;
        }
        previousRadius = theme.radius;
        previousDensity = theme.density;
        previousMotion = theme.motion;
        const nextSpacing = { ...advancedTokens.spacing };
        const nextAnimation = { ...advancedTokens.animation };
        let changed = false;
        if (radiusChanged) {
            for (const name of radiusTokenNames) {
                if (nextSpacing[name]?.trim()) {
                    delete nextSpacing[name];
                    changed = true;
                }
            }
        }
        if (densityChanged && nextSpacing['--mielui-space-unit']?.trim()) {
            delete nextSpacing['--mielui-space-unit'];
            changed = true;
        }
        if (motionChanged) {
            for (const name of motionDurationTokenNames) {
                if (nextAnimation[name]?.trim()) {
                    delete nextAnimation[name];
                    changed = true;
                }
            }
        }
        if (changed) {
            advancedTokens = { ...advancedTokens, spacing: nextSpacing, animation: nextAnimation };
        }
    });

    $effect(() => {
        if (selectedSans === previousSans) {
            return;
        }
        previousSans = selectedSans;
        const selected = sansFonts.find((font) => font.key === selectedSans);
        if (selected) {
            theme = { ...theme, fontSans: selected.value };
        }
    });

    $effect(() => {
        if (selectedHeader === previousHeader) {
            return;
        }
        previousHeader = selectedHeader;
        const selected = headerFonts.find((font) => font.key === selectedHeader);
        if (selected) {
            theme = { ...theme, fontHeader: selected.value };
        }
    });

    $effect(() => {
        if (selectedMono === previousMono) {
            return;
        }
        previousMono = selectedMono;
        const selected = monoFonts.find((font) => font.key === selectedMono);
        if (selected) {
            theme = { ...theme, fontMono: selected.value };
        }
    });

    $effect(() => {
        if (!hydrated) {
            return;
        }
        const css = generatedCss;
        document.documentElement.style.removeProperty('--font-sans');
        applyLiveThemeCss(css);
        saveStudioTheme({ ...theme });
        saveStudioExtensions();
    });
</script>

{#snippet advancedButton(label: string, onClick: () => void)}
    <Tooltip.Root>
        <Tooltip.Trigger>
            <Button
                variant="outline"
                size="icon"
                class="size-[var(--size-control-md)] shrink-0 rounded-s-none border-s-0 text-foreground-muted"
                onclick={onClick}
                aria-label={label}
            >
                <HugeiconsIcon icon={Settings} size={16} aria-hidden="true" />
            </Button>
        </Tooltip.Trigger>
        <Tooltip.Content>{label}</Tooltip.Content>
    </Tooltip.Root>
{/snippet}

{#snippet segmentedChoice(
    values: readonly string[],
    value: string,
    label: string,
    onChange: (value: string) => void
)}
    <div role="group" aria-label={label}>
        <Tabs.Root {value} onValueChange={onChange} variant="segmented" class="w-full">
            <Tabs.List
                class={`grid w-full ${values.length === 2 ? 'grid-cols-2' : values.length === 4 ? 'grid-cols-4' : 'grid-cols-3'}`}
            >
                {#each values as option (option)}
                    <Tabs.Trigger value={option} class="w-full">
                        {formatChoice(option)}
                    </Tabs.Trigger>
                {/each}
            </Tabs.List>
        </Tabs.Root>
    </div>
{/snippet}

{#snippet feelSelect(
        label: string,
        value: string,
        options: readonly string[],
        openAdvanced: () => void,
        onChange: (value: string) => void
    )}
    <div class="flex min-w-0 flex-col gap-2">
        <Typography.Metadata>{label}</Typography.Metadata>
        <Group.Root class="w-full" aria-label={label}>
            <Select.Root {value} onValueChange={onChange}>
                <Select.Trigger
                    class="h-[var(--size-control-md)] min-w-0 flex-1"
                    variant="outline"
                    aria-label={label}
                >
                    <span class="truncate">{formatChoice(value)}</span>
                </Select.Trigger>
                <Select.Content class="min-w-[max(16rem,var(--popover-trigger-width))]">
                    {#each options as option (option)}
                        <Select.Item value={option} label={formatChoice(option)}>
                            {formatChoice(option)}
                        </Select.Item>
                    {/each}
                    {#if !options.includes(value)}
                        <Select.Item {value} label={formatChoice(value)}>
                            {formatChoice(value)}
                        </Select.Item>
                    {/if}
                </Select.Content>
            </Select.Root>
            <Group.Separator />
            {@render advancedButton(`Advanced ${label.toLowerCase()}`, openAdvanced)}
        </Group.Root>
    </div>
{/snippet}

{#snippet weightControl(
        label: string,
        value: FontWeight,
        onChange: (value: FontWeight) => void
    )}
    <div class="flex items-center gap-2" role="group" aria-label={`${label} weight`}>
        <span class="w-[76px] shrink-0 text-[13px] font-medium text-foreground-muted">{label}</span>
        <Tabs.Root
            {value}
            onValueChange={(next) => onChange(next as FontWeight)}
            variant="ghost"
            class="min-w-0 flex-1"
        >
            <Tabs.List class="grid w-full grid-cols-4">
                {#each fontWeights as weight (weight)}
                    <Tabs.Trigger value={weight} class="min-h-7 w-full px-1 py-0 text-xs">
                        {weight}
                    </Tabs.Trigger>
                {/each}
            </Tabs.List>
        </Tabs.Root>
    </div>
{/snippet}

{#snippet colorPickerControl(
    label: string,
    value: string,
    options: {
    label: string;
    value: string;
}[],
    onChange: (value: string) => void
)}
    <div class="flex min-w-0 flex-col gap-2" role="group" aria-label={`${label} color`}>
        <span class="text-[13px] font-medium text-foreground-muted">{label}</span>
        <ColorPicker.Root {value} onValueChange={onChange} {options}>
            <ColorPicker.Trigger class="h-[34px] w-full" />
            <ColorPicker.Content />
        </ColorPicker.Root>
    </div>
{/snippet}

{#snippet advancedColorField(label: string, value: string, onChange: (value: string) => void)}
    <div class="flex min-w-0 flex-col gap-2" role="group" aria-label={`${label} color`}>
        <span class="text-[13px] font-medium text-foreground-muted">{label}</span>
        <ColorPicker.Root {value} onValueChange={onChange}>
            <ColorPicker.Trigger class="h-[34px] w-full" />
            <ColorPicker.Content />
        </ColorPicker.Root>
    </div>
{/snippet}

{#snippet sliderTokenField(
    label: string,
    value: number,
    min: number,
    max: number,
    step: number,
    display: string,
    onChange: (value: number) => void
)}
    <div class="flex min-w-0 flex-col gap-2">
        <div class="flex items-baseline justify-between gap-2">
            <span class="text-[13px] font-medium text-foreground-muted">{label}</span>
            <span class="font-mono text-xs tabular-nums text-foreground-muted">{display}</span>
        </div>
        <Slider {value} {min} {max} {step} {label} class="h-4" onValueChange={onChange} />
    </div>
{/snippet}

{#snippet easeTokenField(label: string, value: string, onChange: (value: string) => void)}
    <div class="flex min-w-0 flex-col gap-2">
        <span class="text-[13px] font-medium text-foreground-muted">{label}</span>
        <Select.Root {value} onValueChange={onChange}>
            <Select.Trigger
                class="h-[34px] min-w-0 px-[9px] text-[13px]"
                variant="outline"
                aria-label={label}
            >
                <span class="truncate">
                    {easingOptions.find((option) => option.value === value)?.label ?? 'Custom'}
                </span>
            </Select.Trigger>
            <Select.Content class="min-w-[max(16rem,var(--popover-trigger-width))]">
                {#each easingOptions as option (option.value)}
                    <Select.Item value={option.value} label={option.label}>
                        {option.label}
                    </Select.Item>
                {/each}
                {#if !easingOptions.some((option) => normalizeEase(option.value) === normalizeEase(value))}
                    <Select.Item {value} label="Custom">Custom</Select.Item>
                {/if}
            </Select.Content>
        </Select.Root>
    </div>
{/snippet}

{#snippet modalDoneFooter()}
    <Dialog.Footer class="shrink-0">
        <Dialog.Close>
            Cancel
            <Kbd shortcut="esc" />
        </Dialog.Close>
        <Dialog.Confirm>
            Done
            <Kbd shortcut="enter" />
        </Dialog.Confirm>
    </Dialog.Footer>
{/snippet}

{#snippet inspector()}
    <div class="flex min-h-0 flex-1 flex-col">
        <ScrollArea class="hide-scrollbar-all h-full min-h-0 flex-1 bg-background" showCues={false}>
            <div class="flex min-h-full flex-col gap-2 px-2 pb-4">
                <Collapsible.Root open>
                    <section class="border-b border-border pb-3">
                        <div class="flex items-center gap-2">
                            <Collapsible.Trigger
                                class="group flex min-h-10 flex-1 justify-between rounded-[var(--radius-md)] text-sm font-medium"
                            >
                                <span>Color</span>
                                <HugeiconsIcon
                                    icon={ChevronDown}
                                    size={14}
                                    aria-hidden="true"
                                    class="text-foreground-muted transition-transform [transition-duration:var(--motion-duration-press)] group-data-[state=open]:rotate-180 motion-reduce:transition-none"
                                />
                            </Collapsible.Trigger>
                        </div>
                        <Collapsible.Content class="flex flex-col gap-4 pt-3 pb-2">
                            <div class="grid grid-cols-2 gap-2">
                                {@render colorPickerControl(
                        'Brand',
                        brandColors[appMode],
                        brandSwatches,
                        updateBrand
                    )}
                                {@render colorPickerControl(
                        'On brand',
                        foundationColors[appMode].onPrimary,
                        onPrimarySwatches,
                        (value) => {
                            updateFoundationColor('onPrimary', value);
                        }
                    )}
                            </div>
                            <div class="grid grid-cols-2 gap-2">
                                {@render colorPickerControl(
                        'Base',
                        foundationColors[appMode].base,
                        baseSwatches,
                        (value) => {
                            updateFoundationColor('base', value);
                        }
                    )}
                                {@render colorPickerControl(
                        'Border',
                        foundationColors[appMode].border,
                        borderSwatches,
                        (value) => {
                            updateFoundationColor('border', value);
                        }
                    )}
                            </div>
                            <div class="grid grid-cols-2 gap-2">
                                {@render colorPickerControl(
                        'Background',
                        foundationColors[appMode].background,
                        backgroundSwatches,
                        (value) => {
                            updateFoundationColor('background', value);
                        }
                    )}
                                {@render colorPickerControl(
                        'Secondary',
                        foundationColors[appMode].secondary,
                        secondarySwatches,
                        (value) => {
                            updateFoundationColor('secondary', value);
                        }
                    )}
                            </div>
                            <div class="grid grid-cols-2 gap-2">
                                {@render colorPickerControl(
                        'Muted text',
                        foundationColors[appMode].foregroundMuted,
                        foregroundSwatches,
                        (value) => {
                            updateFoundationColor('foregroundMuted', value);
                        }
                    )}
                                {@render colorPickerControl(
                        'Foreground',
                        foundationColors[appMode].foreground,
                        foregroundSwatches,
                        (value) => {
                            updateFoundationColor('foreground', value);
                        }
                    )}
                            </div>
                            <div class="grid grid-cols-2 gap-2">
                                {@render colorPickerControl(
                        'Button text',
                        foundationColors[appMode].buttonForeground,
                        foregroundSwatches,
                        (value) => {
                            updateFoundationColor('buttonForeground', value);
                        }
                    )}
                            </div>
                            <Button
                                variant="outline"
                                class="w-full"
                                onclick={() => {
                                    colorsModalOpen = true;
                                }}
                            >
                                Advanced colors
                            </Button>
                        </Collapsible.Content>
                    </section>
                </Collapsible.Root>

                <Collapsible.Root>
                    <section class="border-b border-border pb-3">
                        <div class="flex items-center gap-2">
                            <Collapsible.Trigger
                                class="group flex min-h-10 flex-1 justify-between rounded-[var(--radius-md)] text-sm font-medium"
                            >
                                <span>Effects</span>
                                <HugeiconsIcon
                                    icon={ChevronDown}
                                    size={14}
                                    aria-hidden="true"
                                    class="text-foreground-muted transition-transform [transition-duration:var(--motion-duration-press)] group-data-[state=open]:rotate-180 motion-reduce:transition-none"
                                />
                            </Collapsible.Trigger>
                        </div>
                        <Collapsible.Content class="flex flex-col gap-4 pt-3 pb-2">
                            <Switch
                                bind:checked={glassSurfaces}
                                label="Glass surfaces"
                                description="Use glass for menus, dialogs, and other supported surfaces."
                            />

                            <Switch bind:checked={surfaceShadows} label="Card & menu shadows" />
                            <Switch bind:checked={controlShadows} label="Control shadows" />
                            <Switch bind:checked={dialogShadows} label="Dialog shadows" />
                            <Switch bind:checked={travelingHighlight} label="Traveling highlight" />
                            <Switch bind:checked={primaryStroke} label="Primary stroke" />
                            <div class="flex flex-col gap-2">
                                <Typography.Metadata>Hover cursor</Typography.Metadata>
                                {@render segmentedChoice(
                        cursorChoices,
                        interactiveCursor,
                        'Hover cursor',
                        (value) => {
                            if (value === 'default' || value === 'pointer') {
                                interactiveCursor = value;
                            }
                        }
                    )}
                            </div>
                        </Collapsible.Content>
                    </section>
                </Collapsible.Root>

                <Collapsible.Root>
                    <section class="border-b border-border pb-3">
                        <div class="flex items-center gap-2">
                            <Collapsible.Trigger
                                class="group flex min-h-10 flex-1 justify-between rounded-[var(--radius-md)] text-sm font-medium"
                            >
                                <span>Shape & motion</span>
                                <HugeiconsIcon
                                    icon={ChevronDown}
                                    size={14}
                                    aria-hidden="true"
                                    class="text-foreground-muted transition-transform [transition-duration:var(--motion-duration-press)] group-data-[state=open]:rotate-180 motion-reduce:transition-none"
                                />
                            </Collapsible.Trigger>
                        </div>
                        <Collapsible.Content class="flex flex-col gap-4 pt-3 pb-2">
                            {@render feelSelect(
                    'Radius',
                    theme.radius,
                    radiusScales,
                    () => {
                        spacingModalOpen = true;
                    },
                    (value) => {
                        if (isRadiusScale(value)) {
                            theme = { ...theme, radius: value };
                        }
                    }
                )}
                            {@render feelSelect(
                    'Density',
                    theme.density,
                    densities,
                    () => {
                        spacingModalOpen = true;
                    },
                    (value) => {
                        if (isDensity(value)) {
                            theme = { ...theme, density: value };
                        }
                    }
                )}
                            {@render feelSelect(
                    'Movement',
                    theme.motion,
                    movementPresets,
                    () => {
                        animationModalOpen = true;
                    },
                    (value) => {
                        if (isMotionFeel(value)) {
                            theme = { ...theme, motion: value };
                        }
                    }
                )}
                        </Collapsible.Content>
                    </section>
                </Collapsible.Root>

                <Collapsible.Root>
                    <section class="pb-3">
                        <div class="flex items-center gap-2">
                            <Collapsible.Trigger
                                class="group flex min-h-10 flex-1 justify-between rounded-[var(--radius-md)] text-sm font-medium"
                            >
                                <span>Typography</span>
                                <HugeiconsIcon
                                    icon={ChevronDown}
                                    size={14}
                                    aria-hidden="true"
                                    class="text-foreground-muted transition-transform [transition-duration:var(--motion-duration-press)] group-data-[state=open]:rotate-180 motion-reduce:transition-none"
                                />
                            </Collapsible.Trigger>
                        </div>
                        <Collapsible.Content class="flex flex-col gap-4 pt-3 pb-2">
                            <div class="grid grid-cols-2 gap-2">
                                <div class="flex min-w-0 flex-col gap-2">
                                    <Typography.Metadata>Sans</Typography.Metadata>
                                    <Select.Root bind:value={selectedSans}>
                                        <Select.Trigger
                                            class="h-[34px] min-w-0 px-[9px] text-[13px]"
                                            variant="outline"
                                            aria-label="Sans font"
                                        >
                                            <span class="truncate">
                                                {sansFonts.find((font) => font.key === selectedSans)?.label}
                                            </span>
                                        </Select.Trigger>
                                        <Select.Content
                                            class="max-h-56 min-w-[max(16rem,var(--popover-trigger-width))]"
                                        >
                                            <Select.Label>Sans serif</Select.Label>
                                            {#each sansFonts as font (font.key)}
                                                <Select.Item value={font.key} label={font.label}>
                                                    {font.label}
                                                </Select.Item>
                                            {/each}
                                        </Select.Content>
                                    </Select.Root>
                                </div>
                                <div class="flex min-w-0 flex-col gap-2">
                                    <Typography.Metadata>Header</Typography.Metadata>
                                    <Select.Root bind:value={selectedHeader}>
                                        <Select.Trigger
                                            class="h-[34px] min-w-0 px-[9px] text-[13px]"
                                            variant="outline"
                                            aria-label="Header font"
                                        >
                                            <span
                                                class="truncate"
                                                style:font-family={headerFonts.find(
                                            (font) => font.key === selectedHeader
                                        )?.value}
                                            >
                                                {headerFonts.find((font) => font.key === selectedHeader)?.label}
                                            </span>
                                        </Select.Trigger>
                                        <Select.Content
                                            class="max-h-56 min-w-[max(16rem,var(--popover-trigger-width))]"
                                        >
                                            <Select.Item value="same-as-sans" label="Same as sans">
                                                <span style:font-family="var(--font-sans)">
                                                    Same as sans
                                                </span>
                                            </Select.Item>
                                            <Select.Label>Serif</Select.Label>
                                            {#each serifFonts as font (font.key)}
                                                <Select.Item value={font.key} label={font.label}>
                                                    <span style:font-family={font.value}>
                                                        {font.label}
                                                    </span>
                                                </Select.Item>
                                            {/each}
                                            <Select.Label>Sans serif</Select.Label>
                                            {#each sansFonts as font (font.key)}
                                                <Select.Item value={font.key} label={font.label}>
                                                    <span style:font-family={font.value}>
                                                        {font.label}
                                                    </span>
                                                </Select.Item>
                                            {/each}
                                        </Select.Content>
                                    </Select.Root>
                                </div>
                            </div>
                            <div class="flex min-w-0 flex-col gap-2">
                                <Typography.Metadata>Mono</Typography.Metadata>
                                <Select.Root bind:value={selectedMono}>
                                    <Select.Trigger
                                        class="h-[34px] min-w-0 px-[9px] font-mono text-[13px]"
                                        variant="outline"
                                        aria-label="Monospace font"
                                    >
                                        <span class="truncate">
                                            {monoFonts.find((font) => font.key === selectedMono)?.label}
                                        </span>
                                    </Select.Trigger>
                                    <Select.Content
                                        class="h-56 min-w-[max(16rem,var(--popover-trigger-width))]"
                                    >
                                        <Select.Label>Mono</Select.Label>
                                        {#each monoFonts as font (font.key)}
                                            <Select.Item value={font.key} label={font.label}>
                                                {font.label}
                                            </Select.Item>
                                        {/each}
                                    </Select.Content>
                                </Select.Root>
                            </div>
                            <div class="flex flex-col gap-2">
                                <div class="flex items-baseline justify-between gap-2">
                                    <Typography.Metadata>Header size</Typography.Metadata>
                                    <Typography.Metadata>{headerSize}px</Typography.Metadata>
                                </div>
                                <Slider {...headerSliderProps()} />
                            </div>
                            <div class="flex flex-col gap-2.5">
                                <Typography.Metadata>Font weights</Typography.Metadata>
                                {@render weightControl('Header', headerWeight, (value) => {
                            headerWeight = value;
                        })}
                                {@render weightControl('Body', roleWeights.body, (value) => {
                            updateRoleWeight('body', value);
                        })}
                                {@render weightControl('Label', roleWeights.label, (value) => {
                            updateRoleWeight('label', value);
                        })}
                                {@render weightControl('Button', roleWeights.button, (value) => {
                            updateRoleWeight('button', value);
                        })}
                                {@render weightControl('Badge', roleWeights.badge, (value) => {
                            updateRoleWeight('badge', value);
                        })}
                                {@render weightControl('Description', roleWeights.description, (value) => {
                            updateRoleWeight('description', value);
                        })}
                            </div>
                        </Collapsible.Content>
                    </section>
                </Collapsible.Root>
            </div>
        </ScrollArea>
        <div class="flex shrink-0 flex-col gap-2 px-2 pt-4 pb-2">
            <Group.Root class="w-full" aria-label="Theme preset">
                <Select.Root bind:value={selectedPreset}>
                    <Select.Trigger
                        class="h-[34px] min-w-0 flex-1 px-3 text-sm"
                        variant="outline"
                        aria-label="Theme starting point"
                    >
                        <span class="truncate">
                            {builtInThemePresets.find(
                                    (preset) => preset.slug === selectedPreset
                                )?.name ?? 'Default'}
                            · mielui
                        </span>
                    </Select.Trigger>
                    <Select.Content
                        class="max-h-56 min-w-[max(16rem,var(--popover-trigger-width))]"
                    >
                        {#each builtInThemePresets as preset (preset.slug)}
                            <Select.Item value={preset.slug} label={preset.name}>
                                {preset.name}
                            </Select.Item>
                        {/each}
                    </Select.Content>
                </Select.Root>
                <Group.Separator />
                <Tooltip.Root>
                    <Tooltip.Trigger>
                        <Button
                            variant="outline"
                            size="icon"
                            class="size-[34px] shrink-0 rounded-s-none border-s-0"
                            onclick={resetTheme}
                            aria-label="Reset theme to selected preset"
                        >
                            <HugeiconsIcon icon={RotateCcw} size={15} />
                        </Button>
                    </Tooltip.Trigger>
                    <Tooltip.Content>Reset to selected preset</Tooltip.Content>
                </Tooltip.Root>
            </Group.Root>
            <Button
                onclick={() => {
                    setupOpen = true;
                }}
            >
                Use theme
            </Button>
            <Group.Root class="w-full" aria-label="Copy theme">
                <CopyButton
                    text={generatedJson}
                    label="Copy JSON"
                    variant="outline"
                    size="md"
                    class="min-w-0 flex-1 [&_button]:rounded-e-none [&_button]:border-e-0"
                    oncopy={() => {
                        copiedKey = 'json';
                        toast({
                            title: 'JSON copied',
                            description: 'The draft is ready to paste into your project.',
                            type: 'success',
                            duration: 1600
                        });
                        window.setTimeout(() => {
                            if (copiedKey === 'json') {
                                copiedKey = null;
                            }
                        }, 1200);
                    }}
                >
                    {copiedKey === 'json' ? 'Copied' : 'Copy JSON'}
                </CopyButton>
                <Group.Separator />
                <CopyButton
                    text={generatedCss}
                    label="Copy CSS"
                    variant="outline"
                    size="md"
                    class="min-w-0 flex-1 [&_button]:rounded-s-none [&_button]:border-s-0"
                    oncopy={() => {
                        copiedKey = 'css';
                        toast({
                            title: 'CSS copied',
                            description: 'The draft is ready to paste into your project.',
                            type: 'success',
                            duration: 1600
                        });
                        window.setTimeout(() => {
                            if (copiedKey === 'css') {
                                copiedKey = null;
                            }
                        }, 1200);
                    }}
                >
                    {copiedKey === 'css' ? 'Copied' : 'Copy CSS'}
                </CopyButton>
            </Group.Root>
        </div>
    </div>
{/snippet}

<aside
    aria-label="Theme configuration"
    class="hidden min-h-0 w-[328px] shrink-0 px-4 pb-3 min-[1100px]:flex min-[1100px]:flex-col"
>
    {@render inspector()}
</aside>

<Sheet.Root>
    <Sheet.Trigger
        class="fixed bottom-5 right-5 z-30 shadow-[var(--elevation-float)] min-[1100px]:hidden"
    >
        <HugeiconsIcon icon={Palette} size={15} />
        Customize
    </Sheet.Trigger>
    <Sheet.Content side="left" class="p-0 min-[1100px]:hidden">
        <Sheet.Header class="sr-only">
            <Sheet.Title>Theme configuration</Sheet.Title>
            <Sheet.Description>Configure the live Mielui theme preview.</Sheet.Description>
        </Sheet.Header>
        <div class="-mb-4 min-h-0 flex-1 overflow-hidden px-6">
            {@render inspector()}
        </div>
    </Sheet.Content>
</Sheet.Root>

<ThemeSetupDialog bind:open={setupOpen} {generatedJson} />

<Dialog.Root bind:open={colorsModalOpen} orientation="vertical">
    <Dialog.Content
        size="xl"
        contentClass="!h-[min(44rem,calc(var(--mielui-viewport-height)-2rem))] !max-h-[min(44rem,calc(var(--mielui-viewport-height)-2rem))] !max-w-5xl"
        surfaceClass="!overflow-hidden"
    >
        <Dialog.Header class="shrink-0">
            <Dialog.Title>Colors</Dialog.Title>
            <Dialog.Description>
                Fine-tune every color token. Changes override the sidebar controls and the selected
                preset.
            </Dialog.Description>
        </Dialog.Header>
        <Dialog.Body class="flex min-h-0 flex-1 flex-col gap-3 overflow-hidden">
            <div class="flex shrink-0 items-center justify-between gap-3">
                <p class="text-sm text-foreground-muted">
                    Editing{' '}
                    {formatChoice(appMode)} mode
                </p>
                <Tabs.Root bind:value={appModeBinding.value} variant="ghost">
                    <Tabs.List>
                        <Tabs.Trigger value="light" class="min-h-7 px-2 py-0 text-xs">
                            Light
                        </Tabs.Trigger>
                        <Tabs.Trigger value="dark" class="min-h-7 px-2 py-0 text-xs">
                            Dark
                        </Tabs.Trigger>
                    </Tabs.List>
                </Tabs.Root>
            </div>
            <ScrollArea class="min-h-0 flex-1 pr-2">
                <div class="flex flex-col gap-5 pb-2">
                    {#each colorTokenGroups as group (group.label)}
                        <div class="flex flex-col gap-3">
                            <h3 class="text-sm font-semibold tracking-[-0.015em]">
                                {group.label}
                            </h3>
                            <div class="grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-3">
                                {#each group.tokens as definition (definition.name)}
                                    {@const resolved = resolveColorToken(definition)}
                                    {@render advancedColorField(
                                            definition.label,
                                            resolved.hex,
                                            (hex) => {
                                                updateAdvancedColorToken(
                                                    definition.name,
                                                    formatCssColor(hex, resolved.alpha)
                                                );
                                            }
                                        )}
                                {/each}
                            </div>
                        </div>
                    {/each}
                </div>
            </ScrollArea>
        </Dialog.Body>
        {@render modalDoneFooter()}
    </Dialog.Content>
</Dialog.Root>

<Dialog.Root bind:open={spacingModalOpen} orientation="vertical">
    <Dialog.Content
        size="xl"
        contentClass="!h-[min(44rem,calc(var(--mielui-viewport-height)-2rem))] !max-h-[min(44rem,calc(var(--mielui-viewport-height)-2rem))] !max-w-5xl"
        surfaceClass="!overflow-hidden"
    >
        <Dialog.Header class="shrink-0">
            <Dialog.Title>Spacing</Dialog.Title>
            <Dialog.Description>
                Fine-tune spacing, controls, corners, and borders. Changes override the sidebar
                controls and the selected preset.
            </Dialog.Description>
        </Dialog.Header>
        <Dialog.Body class="min-h-0 flex-1 overflow-hidden">
            <ScrollArea class="min-h-0 flex-1 pr-2">
                <div class="flex flex-col gap-5 pb-2">
                    {#each spacingTokenGroups as group (group.label)}
                        <div class="flex flex-col gap-3">
                            <h3 class="text-sm font-semibold tracking-[-0.015em]">
                                {group.label}
                            </h3>
                            <div class="grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-3">
                                {#each group.tokens as definition (definition.name)}
                                    {@const spacingValue =
                                            resolveSpacingToken(definition)}
                                    {@render sliderTokenField(
                                            definition.label,
                                            spacingValue,
                                            definition.min,
                                            definition.max,
                                            definition.step,
                                            formatPx(spacingValue),
                                            (value) => {
                                                updateAdvancedSpacingToken(
                                                    definition.name,
                                                    formatPx(value)
                                                );
                                            }
                                        )}
                                {/each}
                            </div>
                        </div>
                    {/each}
                </div>
            </ScrollArea>
        </Dialog.Body>
        {@render modalDoneFooter()}
    </Dialog.Content>
</Dialog.Root>

<Dialog.Root bind:open={animationModalOpen} orientation="vertical">
    <Dialog.Content
        size="xl"
        contentClass="!h-[min(44rem,calc(var(--mielui-viewport-height)-2rem))] !max-h-[min(44rem,calc(var(--mielui-viewport-height)-2rem))] !max-w-5xl"
        surfaceClass="!overflow-hidden"
    >
        <Dialog.Header class="shrink-0">
            <Dialog.Title>Motion</Dialog.Title>
            <Dialog.Description>
                Fine-tune speeds and menu versus dialog movement. Changes override the sidebar
                controls and the selected preset.
            </Dialog.Description>
        </Dialog.Header>
        <Dialog.Body class="min-h-0 flex-1 overflow-hidden">
            <ScrollArea class="min-h-0 flex-1 pr-2">
                <div class="flex flex-col gap-5 pb-2">
                    {#each animationTokenGroups as group (group.label)}
                        <div class="flex flex-col gap-3">
                            <h3 class="text-sm font-semibold tracking-[-0.015em]">
                                {group.label}
                            </h3>
                            <div class="grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-3">
                                {#each group.tokens as definition (definition.name)}
                                    {#if definition.kind === 'ease'}
                                        {@render easeTokenField(
                                                definition.label,
                                                animationEaseValue(definition),
                                                (value) => {
                                                    updateAdvancedAnimationToken(
                                                        definition.name,
                                                        value
                                                    );
                                                }
                                            )}
                                    {:else}
                                        {@const motionValue =
                                                animationSliderValue(definition)}
                                        {@render sliderTokenField(
                                                definition.label,
                                                motionValue,
                                                definition.min,
                                                definition.max,
                                                definition.step,
                                                animationSliderDisplay(
                                                    definition,
                                                    motionValue
                                                ),
                                                (value) => {
                                                    commitAnimationSlider(
                                                        definition,
                                                        value
                                                    );
                                                }
                                            )}
                                    {/if}
                                {/each}
                            </div>
                        </div>
                    {/each}
                </div>
            </ScrollArea>
        </Dialog.Body>
        {@render modalDoneFooter()}
    </Dialog.Content>
</Dialog.Root>

<AlertDialog.Root bind:open={presetDialogOpen} orientation="vertical">
    <AlertDialog.Content>
        <AlertDialog.Header>
            <AlertDialog.Title>Replace your current draft?</AlertDialog.Title>
            <AlertDialog.Description>
                Switching to
                {builtInThemePresets.find((preset) => preset.slug === pendingPreset)
                        ?.name ?? 'this preset'}
                resets every changed color, type, shape, and motion value.
            </AlertDialog.Description>
        </AlertDialog.Header>
        <AlertDialog.Footer>
            <AlertDialog.Exit onclick={() => (pendingPreset = null)}>
                Keep draft
                <Kbd shortcut="esc" />
            </AlertDialog.Exit>
            <AlertDialog.Confirm onclick={confirmPresetChange}>
                Replace draft
                <Kbd shortcut="enter" />
            </AlertDialog.Confirm>
        </AlertDialog.Footer>
    </AlertDialog.Content>
</AlertDialog.Root>
