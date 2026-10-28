<script lang="ts">
    import * as Select from '@mielui/svelte/components/select';
    import { headerFonts, monoFonts, sansFonts, serifFonts } from './config';
    import { getThemeEditor } from './context';
    import { selectTrigger, weightRow } from './controls.svelte';
    import Row from './row.svelte';
    import EditorSection from './section.svelte';
    import { getSettingFilter } from './setting-filter.svelte';

    const roleWeightRows = [
        { role: 'body', label: 'Body' },
        { role: 'label', label: 'Label' },
        { role: 'button', label: 'Button' },
        { role: 'badge', label: 'Badge' },
        { role: 'description', label: 'Description' }
    ] as const;

    let {
        essentials = false
    }: {
        /** Renders only the rows shown before All settings. */
        essentials?: boolean;
    } = $props();

    const editor = getThemeEditor();
    const filter = getSettingFilter();

    const headerFont = $derived(
        headerFonts.find((font) => font.key === editor.state.selectedHeader)
    );

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
            run: () => {
                editor.updateRoleWeight(role, base);
            }
        };
    }
</script>

{#snippet sansRow(label: string)}
    <Row {label} reset={resetFont('selectedSans', 'sans')}>
        <Select.Root bind:value={editor.state.selectedSans}>
            <Select.Trigger class={selectTrigger} variant="ghost" aria-label="Sans font">
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
{/snippet}

{#snippet headerRow(label: string)}
    <Row {label} reset={resetFont('selectedHeader', 'header')}>
        <Select.Root bind:value={editor.state.selectedHeader}>
            <Select.Trigger class={selectTrigger} variant="ghost" aria-label="Header font">
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
{/snippet}

{#if essentials}
    {@render sansRow('Font')}
    {@render headerRow('Heading font')}
{:else}
    <EditorSection title="Fonts" keywords="typography type family typeface">
        {#if filter.active}
            {@render sansRow('Sans')}
            {@render headerRow('Header')}
        {/if}
        <Row label="Mono" reset={resetFont('selectedMono', 'mono')}>
            <Select.Root bind:value={editor.state.selectedMono}>
                <Select.Trigger
                    class={`${selectTrigger} font-mono text-xs`}
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
        {@render weightRow(
            'Header',
            editor.state.headerWeight,
            (value) => {
                editor.state.headerWeight = value;
            },
            {
                changed: editor.state.headerWeight !== editor.baseline.headerWeight,
                run: () => {
                    editor.state.headerWeight = editor.baseline.headerWeight;
                }
            }
        )}
        {#each roleWeightRows as row (row.role)}
            {@render weightRow(
                row.label,
                editor.state.roleWeights[row.role],
                (value) => {
                    editor.updateRoleWeight(row.role, value);
                },
                resetWeight(row.role)
            )}
        {/each}
    </EditorSection>
{/if}
