<script lang="ts">
    import * as Select from '@mielui/svelte/components/select';
    import { Slider } from '@mielui/svelte/components/slider';
    import * as Typography from '@mielui/svelte/components/typography';
    import { headerFonts, monoFonts, sansFonts, serifFonts } from './config';
    import { getThemeEditor } from './context';
    import { weightControl } from './controls.svelte';
    import EditorSection from './section.svelte';

    const editor = getThemeEditor();
</script>

<EditorSection title="Typography" separator={false} bodyClass="gap-4">
    <div class="grid grid-cols-2 gap-2">
        <div class="flex min-w-0 flex-col gap-2">
            <Typography.Metadata>Sans</Typography.Metadata>
            <Select.Root bind:value={editor.state.selectedSans}>
                <Select.Trigger
                    class="h-[34px] min-w-0 px-[9px] text-[13px]"
                    variant="outline"
                    aria-label="Sans font"
                >
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
        </div>
        <div class="flex min-w-0 flex-col gap-2">
            <Typography.Metadata>Header</Typography.Metadata>
            <Select.Root bind:value={editor.state.selectedHeader}>
                <Select.Trigger
                    class="h-[34px] min-w-0 px-[9px] text-[13px]"
                    variant="outline"
                    aria-label="Header font"
                >
                    <span
                        class="truncate"
                        style:font-family={headerFonts.find(
                                            (font) => font.key === editor.state.selectedHeader
                                        )?.value}
                    >
                        {headerFonts.find((font) => font.key === editor.state.selectedHeader)?.label}
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
        </div>
    </div>
    <div class="flex min-w-0 flex-col gap-2">
        <Typography.Metadata>Mono</Typography.Metadata>
        <Select.Root bind:value={editor.state.selectedMono}>
            <Select.Trigger
                class="h-[34px] min-w-0 px-[9px] font-mono text-[13px]"
                variant="outline"
                aria-label="Monospace font"
            >
                <span class="truncate">
                    {monoFonts.find((font) => font.key === editor.state.selectedMono)?.label}
                </span>
            </Select.Trigger>
            <Select.Content class="h-56 min-w-[max(16rem,var(--popover-trigger-width))]">
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
            <Typography.Metadata>{editor.state.headerSize}px</Typography.Metadata>
        </div>
        <Slider {...editor.headerSliderProps()} />
    </div>
    <div class="flex flex-col gap-2.5">
        <Typography.Metadata>Font weights</Typography.Metadata>
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
    </div>
</EditorSection>
