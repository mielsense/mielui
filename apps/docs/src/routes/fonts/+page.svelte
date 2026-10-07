<script lang="ts">
    import { Tick02Icon as Check } from '@hugeicons/core-free-icons';
    import { Badge } from '@mielui/svelte/components/badge';
    import * as Typography from '@mielui/svelte/components/typography';
    import HugeiconsIcon from '@mielui/svelte/hugeicons-icon';
    import { DEFAULT_FONT, type FontCategory, fonts, getDocsFontState } from '$lib/fonts.svelte';

    const selectedFont = getDocsFontState();
    const categories: FontCategory[] = ['Sans serif', 'Serif', 'Monospace'];
    const groups = categories.map((category) => ({
        category,
        id: category.toLowerCase().replaceAll(' ', '-'),
        items: fonts.filter((font) => font.category === category)
    }));
</script>

<svelte:head>
    <title>Mielui · Fonts</title>
    <meta name="description" content="Set the typeface for the current Mielui theme." />
</svelte:head>

<div class="flex w-full flex-col gap-10 py-10 md:py-14">
    <header class="flex max-w-2xl flex-col gap-2">
        <Typography.H1>Fonts</Typography.H1>
        <Typography.Text>
            Set the typeface for the current theme. Your choice is saved and follows you across the
            rest of Mielui.
        </Typography.Text>
    </header>

    {#each groups as group (group.id)}
        <section aria-labelledby={group.id} class="flex flex-col gap-4">
            <div class="flex items-baseline gap-2">
                <Typography.H2 id={group.id}>{group.category}</Typography.H2>
                <Typography.Metadata class="tabular-nums">{group.items.length}</Typography.Metadata>
            </div>
            <ul class="m-0 grid list-none grid-cols-1 gap-3 p-0 sm:grid-cols-2 xl:grid-cols-3">
                {#each group.items as font (font.name)}
                    {const selected = $derived(selectedFont.current === font.name)}
                    <li class="flex min-w-0">
                        <button
                            type="button"
                            onclick={() => {
                                selectedFont.current = font.name;
                            }}
                            aria-pressed={selected}
                            class={`mielui-press relative flex min-h-32 w-full flex-col items-start gap-4 rounded-[var(--radius-lg)] border-[length:var(--border-size)] bg-card p-5 text-left transition-[border-color,background-color,box-shadow] [transition-duration:var(--motion-duration-hover)] focus-visible:outline-none focus-visible:shadow-[var(--focus-ring)] ${selected ? 'border-primary bg-[color-mix(in_oklab,var(--color-primary)_6%,var(--color-card))]' : 'border-border hover:border-[var(--color-input)] hover:bg-secondary/40'}`}
                        >
                            <span class="text-3xl leading-none" style:font-family={font.family}>
                                Ag
                            </span>
                            <span class="flex w-full items-center gap-2">
                                <span class="text-sm font-medium">{font.name}</span>
                                {#if font.name === DEFAULT_FONT}
                                    <Badge variant="outline">Default</Badge>
                                {/if}
                                {#if selected}
                                    <HugeiconsIcon
                                        icon={Check}
                                        size={16}
                                        class="ms-auto text-primary"
                                        aria-hidden="true"
                                    />
                                {/if}
                            </span>
                        </button>
                    </li>
                {/each}
            </ul>
        </section>
    {/each}
</div>
