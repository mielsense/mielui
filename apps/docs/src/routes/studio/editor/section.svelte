<script lang="ts">
    import type { Snippet } from 'svelte';
    import { getSettingFilter, setSettingSection } from './setting-filter.svelte';

    let {
        title,
        keywords = '',
        action,
        children
    }: {
        title: string;
        /** Extra words the settings search matches for every row in this group. */
        keywords?: string;
        action?: Snippet;
        children: Snippet;
    } = $props();

    const filter = getSettingFilter();
    let labels = $state<string[]>([]);

    setSettingSection({
        get title() {
            return title;
        },
        get keywords() {
            return keywords;
        },
        get labelMatch() {
            return filter.active && labels.some((label) => filter.matches(label));
        },
        register(label) {
            labels.push(label);

            return () => {
                const index = labels.indexOf(label);
                if (index >= 0) {
                    labels.splice(index, 1);
                }
            };
        }
    });
</script>

<section class="flex flex-col gap-1.5 [&:not(:has([data-setting-row]))]:hidden">
    <div class="flex h-[var(--size-control-sm)] items-center justify-between gap-2 ps-3 pe-1">
        <h2 class="m-0 text-sm font-medium text-foreground">{title}</h2>
        {@render action?.()}
    </div>
    <div class="flex flex-col rounded-[var(--radius-xl)] bg-[var(--docs-soft)] px-3 py-1.5">
        {@render children()}
    </div>
</section>
