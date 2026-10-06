<script lang="ts">
    import * as Select from '@mielui/svelte/components/select';
    import { headerFonts, monoFonts, sansFonts, serifFonts } from './config';
    import { getThemeEditor } from './context';
    import { weightRow } from './controls.svelte';
    import Row from './row.svelte';
    import EditorSection from './section.svelte';

    const editor = getThemeEditor();
    const trigger = 'h-7 w-auto max-w-44 gap-1.5 px-2';

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

<EditorSection title="Fonts" keywords="typography type family typeface">
    <Row label="Sans" reset={resetFont('selectedSans', 'sans')}>
        <Select.Root bind:value={editor.state.selectedSans}>
            <Select.Trigger class={trigger} variant="ghost" aria-label="Sans font">
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
    <Row label="Header" reset={resetFont('selectedHeader', 'header')}>
        <Select.Root bind:value={editor.state.selectedHeader}>
            <Select.Trigger class={trigger} variant="ghost" aria-label="Header font">
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
    <Row label="Mono" reset={resetFont('selectedMono', 'mono')}>
        <Select.Root bind:value={editor.state.selectedMono}>
            <Select.Trigger
                class={`${trigger} font-mono text-xs`}
                variant="ghost"
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
</EditorSection>

<EditorSection title="Size" keywords="typography type font heading">
    <Row
        label="Header"
        reset={{
            changed: editor.state.headerSize !== editor.baseline.headerSize,
            run: () => {
                editor.state.headerSize = editor.baseline.headerSize;
            }
        }}
        slider={{
            value: editor.state.headerSize,
            min: 10,
            max: 32,
            step: 1,
            format: (value) => `${value}px`,
            onValueChange: (value) => {
                editor.state.headerSize = value;
            }
        }}
    />
</EditorSection>

<EditorSection title="Weight" keywords="typography type font bold">
    {@render weightRow('Header', editor.state.headerWeight, (value) => {
        editor.state.headerWeight = value;
    }, {
        changed: editor.state.headerWeight !== editor.baseline.headerWeight,
        run: () => {
            editor.state.headerWeight = editor.baseline.headerWeight;
        }
    })}
    {@render weightRow('Body', editor.state.roleWeights.body, (value) => {
        editor.updateRoleWeight('body', value);
    }, resetWeight('body'))}
    {@render weightRow('Label', editor.state.roleWeights.label, (value) => {
        editor.updateRoleWeight('label', value);
    }, resetWeight('label'))}
    {@render weightRow('Button', editor.state.roleWeights.button, (value) => {
        editor.updateRoleWeight('button', value);
    }, resetWeight('button'))}
    {@render weightRow('Badge', editor.state.roleWeights.badge, (value) => {
        editor.updateRoleWeight('badge', value);
    }, resetWeight('badge'))}
    {@render weightRow('Description', editor.state.roleWeights.description, (value) => {
        editor.updateRoleWeight('description', value);
    }, resetWeight('description'))}
</EditorSection>
