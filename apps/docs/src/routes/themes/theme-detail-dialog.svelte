<script lang="ts">
    import { CopyButton } from '@mielui/svelte/components/copy-button';
    import * as Dialog from '@mielui/svelte/components/dialog';
    import { type Theme, themeToCss } from '@mielui/svelte/themes/theme';
    import { fontName } from './specimen';

    let {
        open = $bindable(false),
        theme,
        onApply
    }: {
        open?: boolean;
        /** The theme to describe. The dialog renders nothing inside until one is given. */
        theme: Theme | null;
        onApply: (theme: Theme) => void;
    } = $props();

    const css = $derived(theme ? themeToCss(theme) : '');
    const json = $derived(theme ? JSON.stringify(theme, null, 2) : '');

    function details(shown: Theme) {
        return [
            {
                label: 'Neutral',
                value: shown.neutral
            },
            {
                label: 'Radius',
                value: shown.radius
            },
            {
                label: 'Density',
                value: shown.density
            },
            {
                label: 'Motion',
                value: shown.motion
            },
            {
                label: 'Font',
                value: fontName(shown.fontSans)
            }
        ];
    }

    function apply() {
        if (theme) {
            onApply(theme);
        }

        open = false;
    }
</script>

<!--
    @component
    Shows one theme's settings, with its CSS and JSON to copy and a button to apply it.
-->

<Dialog.Root bind:open>
    <Dialog.Content>
        {#if theme}
            <Dialog.Header>
                <Dialog.Title>{theme.name}</Dialog.Title>
                <Dialog.Description>{theme.description}</Dialog.Description>
            </Dialog.Header>
            <Dialog.Body class="gap-5">
                <dl class="m-0 grid grid-cols-2 gap-x-6 gap-y-3 text-sm">
                    <div class="flex flex-col gap-1">
                        <dt class="text-foreground-muted">Brand</dt>
                        <dd class="m-0 flex items-center gap-2">
                            <span
                                class="size-4 rounded-full ring-1 ring-foreground/10 ring-inset"
                                style:background-color={theme.brand}
                                aria-hidden="true"
                            ></span>
                            <code class="font-mono text-foreground">{theme.brand}</code>
                        </dd>
                    </div>
                    {#each details(theme) as detail (detail.label)}
                        <div class="flex flex-col gap-1">
                            <dt class="text-foreground-muted">{detail.label}</dt>
                            <dd class="m-0 capitalize text-foreground">{detail.value}</dd>
                        </div>
                    {/each}
                </dl>
                <div class="flex flex-wrap gap-2">
                    <CopyButton
                        text={css}
                        labels={{ copy: 'Copy CSS', copied: 'CSS copied' }}
                        variant="outline"
                        size="md"
                    >
                        Copy CSS
                    </CopyButton>
                    <CopyButton
                        text={json}
                        labels={{ copy: 'Copy JSON', copied: 'JSON copied' }}
                        variant="outline"
                        size="md"
                    >
                        Copy JSON
                    </CopyButton>
                </div>
            </Dialog.Body>
            <Dialog.Footer>
                <Dialog.Close>Close</Dialog.Close>
                <Dialog.Confirm onclick={apply}>Apply theme</Dialog.Confirm>
            </Dialog.Footer>
        {/if}
    </Dialog.Content>
</Dialog.Root>
