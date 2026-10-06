<script lang="ts">
    import { numberShuffle } from '@mielui/svelte/actions/number-shuffle';
    import * as Select from '@mielui/svelte/components/select';
    import { Slider } from '@mielui/svelte/components/slider';
    import { headerFonts, monoFonts, sansFonts, serifFonts } from './config';
    import { getThemeEditor } from './context';
    import { weightControl } from './controls.svelte';
    import Row from './row.svelte';
    import EditorSection from './section.svelte';

    const editor = getThemeEditor();

    function resetFont(
        selected: 'selectedSans' | 'selectedHeader' | 'selectedMono',
        base: 'sans' | 'header' | 'mono'
    ) {
        return {
            changed: editor.state[selected] !== editor.baseline[base],
            run: () => {
                editor.state[selected] = editor.baseline[base];
            }
        };
    }

    function resetWeight(role: 'body' | 'label' | 'button' | 'badge' | 'description') {
        const base = editor.baseline.roleWeights[role];

        return {
            changed: editor.state.roleWeights[role] !== base,
            run: () => editor.updateRoleWeight(role, base)
        };
    }
    const headerFont = $derived(
        headerFonts.find((font) => font.key === editor.state.selectedHeader)
    );
</script>

<EditorSection title="Typography" keywords="font type family">
    <Row label="Sans" wide reset={resetFont('selectedSans', 'sans')}>
        <Select.Root bind:value={editor.state.selectedSans}>
            <Select.Trigger class="w-full min-w-0" variant="outline" aria-label="Sans font">
                <span class="truncate">
                    {sansFonts.find((font) => font.key === editor.state.selectedSans)?.label}
                </span>
            </Select.Trigger>
            <Select.Content class="max-h-56 min-w-[max(16rem,var(--popover-trigger-width))]">
                <Select.Label>Sans serif</Select.Label>
                {#each sansFonts as font (font.key)}
                    <Select.Item value={font.key} label={font.label}>
                        {font.label}
                    </Select.Item>
                {/each}
            </Select.Content>
        </Select.Root>
    </Row>
    <Row label="Header" wide reset={resetFont('selectedHeader', 'header')}>
        <Select.Root bind:value={editor.state.selectedHeader}>
            <Select.Trigger class="w-full min-w-0" variant="outline" aria-label="Header font">
                <span class="truncate" style:font-family={headerFont?.value}>
                    {headerFont?.label}
                </span>
            </Select.Trigger>
            <Select.Content class="max-h-56 min-w-[max(16rem,var(--popover-trigger-width))]">
                <Select.Item value="same-as-sans" label="Same as sans">
                    <span style:font-family="var(--font-sans)">Same as sans</span>
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
    </Row>
    <Row label="Mono" wide reset={resetFont('selectedMono', 'mono')}>
        <Select.Root bind:value={editor.state.selectedMono}>
            <Select.Trigger
                class="w-full min-w-0 font-mono"
                variant="outline"
                aria-label="Monospace font"
            >
                <span class="truncate">
                    {monoFonts.find((font) => font.key === editor.state.selectedMono)?.label}
                </span>
            </Select.Trigger>
            <Select.Content class="max-h-56 min-w-[max(16rem,var(--popover-trigger-width))]">
                <Select.Label>Mono</Select.Label>
                {#each monoFonts as font (font.key)}
                    <Select.Item value={font.key} label={font.label}>
                        {font.label}
                    </Select.Item>
                {/each}
            </Select.Content>
        </Select.Root>
    </Row>
    <Row
        label="Header size"
        reset={{
            changed: editor.state.headerSize !== editor.baseline.headerSize,
            run: () => {
                editor.state.headerSize = editor.baseline.headerSize;
            }
        }}
    >
        <span
            class="text-sm tabular-nums text-foreground"
            use:numberShuffle={{
                value: editor.state.headerSize,
                format: (value) => `${value}px`
            }}
        >
            {`${editor.state.headerSize}px`}
        </span>
        {#snippet below()}
            <div class="pb-3">
                <Slider {...editor.headerSliderProps()} />
            </div>
        {/snippet}
    </Row>
</EditorSection>

<EditorSection title="Font weights" keywords="typography bold">
    {@render weightControl('Header', editor.state.headerWeight, (value) => {
        editor.state.headerWeight = value;
    }, {
        changed: editor.state.headerWeight !== editor.baseline.headerWeight,
        run: () => {
            editor.state.headerWeight = editor.baseline.headerWeight;
        }
    })}
    {@render weightControl('Body', editor.state.roleWeights.body, (value) => {
        editor.updateRoleWeight('body', value);
    }, resetWeight('body'))}
    {@render weightControl('Label', editor.state.roleWeights.label, (value) => {
        editor.updateRoleWeight('label', value);
    }, resetWeight('label'))}
    {@render weightControl('Button', editor.state.roleWeights.button, (value) => {
        editor.updateRoleWeight('button', value);
    }, resetWeight('button'))}
    {@render weightControl('Badge', editor.state.roleWeights.badge, (value) => {
        editor.updateRoleWeight('badge', value);
    }, resetWeight('badge'))}
    {@render weightControl('Description', editor.state.roleWeights.description, (value) => {
        editor.updateRoleWeight('description', value);
    }, resetWeight('description'))}
</EditorSection>
