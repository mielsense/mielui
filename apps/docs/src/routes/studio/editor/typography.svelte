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
    const headerFont = $derived(
        headerFonts.find((font) => font.key === editor.state.selectedHeader)
    );
</script>

<EditorSection title="Typography">
    <Row label="Sans" wide>
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
    <Row label="Header" wide>
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
    <Row label="Mono" wide>
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
    <Row label="Header size">
        <span
            class="text-sm tabular-nums text-foreground"
            use:numberShuffle={{
                value: editor.state.headerSize,
                format: (value) => `${value}px`
            }}
        >
            {`${editor.state.headerSize}px`}
        </span>
    </Row>
    <div class="pb-3">
        <Slider {...editor.headerSliderProps()} />
    </div>
</EditorSection>

<EditorSection title="Font weights">
    {@render weightControl('Header', editor.state.headerWeight, (value) => {
        editor.state.headerWeight = value;
    })}
    {@render weightControl('Body', editor.state.roleWeights.body, (value) => {
        editor.updateRoleWeight('body', value);
    })}
    {@render weightControl('Label', editor.state.roleWeights.label, (value) => {
        editor.updateRoleWeight('label', value);
    })}
    {@render weightControl('Button', editor.state.roleWeights.button, (value) => {
        editor.updateRoleWeight('button', value);
    })}
    {@render weightControl('Badge', editor.state.roleWeights.badge, (value) => {
        editor.updateRoleWeight('badge', value);
    })}
    {@render weightControl('Description', editor.state.roleWeights.description, (value) => {
        editor.updateRoleWeight('description', value);
    })}
</EditorSection>
