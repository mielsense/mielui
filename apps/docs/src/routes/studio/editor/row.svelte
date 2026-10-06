<script lang="ts">
    import { type Snippet, untrack } from 'svelte';
    import { getSettingFilter, getSettingSection } from './setting-filter.svelte';

    let {
        label,
        wide = false,
        below,
        children
    }: {
        label: string;
        wide?: boolean;
        /** Content tied to this setting, such as its slider, shown on its own line. */
        below?: Snippet;
        children: Snippet;
    } = $props();

    const filter = getSettingFilter();
    const section = getSettingSection();
    const visible = $derived(
        section?.labelMatch
            ? filter.matches(label)
            : filter.matches(label, section?.title, section?.keywords)
    );

    $effect(() => {
        const name = label;

        return untrack(() => section?.register(name));
    });
</script>

{#if visible}
    <div data-setting-row class="flex min-h-11 items-center justify-between gap-3">
        <span class="min-w-0 truncate text-sm text-foreground-muted">{label}</span>
        <div
            class={wide
                ? 'w-44 min-w-0 shrink-0'
                : 'flex min-w-0 shrink-0 items-center justify-end [&>div]:min-h-0 [&>div]:items-center'}
        >
            {@render children()}
        </div>
    </div>
    {@render below?.()}
{/if}
