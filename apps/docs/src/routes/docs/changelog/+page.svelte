<script lang="ts">
    import { ArrowDown01Icon as ChevronDown } from '@hugeicons/core-free-icons';
    import { Badge } from '@mielui/svelte/components/badge';
    import * as Collapsible from '@mielui/svelte/components/collapsible';
    import { Markdown } from '@mielui/svelte/components/markdown';
    import HugeiconsIcon from '@mielui/svelte/hugeicons-icon';
    import { changelogReleases } from '$lib/changelog';
    import PageIntro from '$lib/components/docs/page-intro.svelte';

    const sectionLabels: Record<string, string> = {
        breaking: 'Breaking changes',
        feature: 'Features',
        fix: 'Fixes',
        docs: 'Docs'
    };
    const releases = changelogReleases.map((release) => {
        return {
            ...release,
            id: `release-${release.version.replaceAll('.', '-')}`,
            sections: release.sections.map((section) => {
                return {
                    ...section,
                    key: `${release.version}-${section.type}`,
                    label: sectionLabels[section.type] ?? section.title,
                    content: section.content.replace(/^(- .*)\n\n(?=- )/gm, '$1\n')
                };
            })
        };
    });

    let open = $state<Record<string, boolean>>(
        Object.fromEntries(
            releases.flatMap((release) => {
                return release.sections.map((section) => [section.key, section.type !== 'docs']);
            })
        )
    );
</script>

<svelte:head>
    <title>Mielui · Changelog</title>
    <meta name="description" content="Release notes for each @mielui/svelte version." />
</svelte:head>

<div data-docs-page class="flex flex-col gap-16">
    <PageIntro title="Changelog">Release notes and upcoming changes for @mielui/svelte.</PageIntro>

    {#each releases as release (release.id)}
        <section id={release.id} class="scroll-mt-20 flex flex-col gap-3">
            <div class="flex items-center gap-3">
                <h2>{release.version}</h2>
                {#if release.unreleased}
                    <Badge variant="secondary">Unreleased</Badge>
                {/if}
            </div>
            <div class="flex flex-col">
                {#each release.sections as section (section.key)}
                    <Collapsible.Root bind:open={open[section.key]}>
                        <div
                            data-changelog-section={section.type}
                            class="border-t-[length:var(--border-size)] border-[var(--docs-rule)] py-1"
                        >
                            <Collapsible.Trigger
                                class="-mx-2 w-[calc(100%+var(--spacing)*4)] justify-between"
                            >
                                <span class="flex items-baseline gap-2.5">
                                    <span
                                        class="[font-weight:var(--font-weight-label)] text-foreground"
                                    >
                                        {section.label}
                                    </span>
                                    <span class="text-sm tabular-nums text-foreground-muted">
                                        {section.count}
                                    </span>
                                </span>
                                <HugeiconsIcon
                                    icon={ChevronDown}
                                    size={14}
                                    aria-hidden="true"
                                    class={`shrink-0 text-foreground-muted transition-transform [transition-duration:var(--motion-duration-flick)] ease-[var(--ease-spring-flick)] motion-reduce:transition-none ${open[section.key] ? 'rotate-180' : ''}`}
                                />
                            </Collapsible.Trigger>
                            <Collapsible.Content class="pt-2 pb-4">
                                <Markdown content={section.content} />
                            </Collapsible.Content>
                        </div>
                    </Collapsible.Root>
                {/each}
            </div>
        </section>
    {/each}
</div>
