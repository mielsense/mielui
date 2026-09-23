<script lang="ts">
    import { Markdown } from '@mielui/svelte/components/markdown';
    import { changelogDocsMarkdown } from '$lib/changelog';
    import PageIntro from '$lib/components/docs/page-intro.svelte';

    const releases = changelogDocsMarkdown()
        .split(/^## /m)
        .filter((release) => release.trim())
        .map((release) => {
            const [title, ...body] = release.split('\n');
            return {
                title,
                id: `release-${title.split(' ')[0].replaceAll('.', '-')}`,
                content: body.join('\n').trim()
            };
        });
</script>

<svelte:head>
    <title>Mielui · Changelog</title>
    <meta name="description" content="Release notes for each @mielui/svelte version." />
</svelte:head>

<div data-docs-page class="flex flex-col gap-16">
    <PageIntro title="Changelog">Release notes and upcoming changes for @mielui/svelte.</PageIntro>

    {#each releases as release (release.id)}
        <section class="flex flex-col gap-4" aria-labelledby={release.id}>
            <h2 id={release.id}>{release.title}</h2>
            <Markdown content={release.content} />
        </section>
    {/each}
</div>
