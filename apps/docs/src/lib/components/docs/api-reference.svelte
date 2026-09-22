<script lang="ts">
    import * as Typography from '@mielui/svelte/components/typography';
    import type { ApiReferenceItem } from './api-reference-types';

    const {
        title,
        component,
        items,
        description
    }: {
        title: string;
        component: string;
        items: ApiReferenceItem[];
        description: string;
    } = $props();
</script>

<div class="w-full flex flex-col gap-6">
    <header class="flex flex-col gap-4">
        <Typography.H2
            class="w-fit rounded-lg bg-secondary px-3 py-1 font-mono text-lg"
            data-toc-label={component}
        >
            <span class="text-foreground-muted">
                {title}
            </span>
            .<span
                class="[font-weight:var(--font-weight-label,600)] [letter-spacing:var(--tracking-label,0em)]"
            >
                {component}
            </span>
        </Typography.H2>
        <Typography.Text variant="lead">
            {description}
        </Typography.Text>
    </header>

    {#if items.length !== 0}
        <div
            class="w-full overflow-x-auto rounded-[var(--radius-xl)] border-[length:var(--border-size)] border-border bg-card shadow-[var(--elevation-card)]"
        >
            <table class="min-w-[42rem] w-full border-collapse text-left">
                <thead>
                    <tr class="border-b-[length:var(--border-size)] border-border">
                        <th
                            class="p-3 [font-weight:var(--font-weight-label,500)] [letter-spacing:var(--tracking-label,0em)]"
                        >
                            Property
                        </th>
                        <th
                            class="p-3 [font-weight:var(--font-weight-label,500)] [letter-spacing:var(--tracking-label,0em)]"
                        >
                            Type
                        </th>
                        <th
                            class="p-3 [font-weight:var(--font-weight-label,500)] [letter-spacing:var(--tracking-label,0em)]"
                        >
                            Description
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {#each items as { property, type, description, defaults } (property)}
                        <tr class="border-t-[length:var(--border-size)] border-border">
                            <td class="w-[11rem] p-3 font-mono align-top">
                                <span
                                    class="bg-secondary px-2 p-1 rounded-lg [font-weight:var(--font-weight-label,500)] [letter-spacing:var(--tracking-label,0em)] text-sm"
                                >
                                    {property}
                                </span>
                            </td>
                            <td class="w-[11rem] p-3 font-mono align-top">
                                <span
                                    class="bg-secondary px-2 p-1 rounded-lg [font-weight:var(--font-weight-label,500)] [letter-spacing:var(--tracking-label,0em)] text-sm"
                                >
                                    {type}
                                </span>
                            </td>
                            <td class="p-3 align-top text-sm">
                                {description}
                                <br />
                                <span class="font-mono text-foreground-muted text-sm mt-2">
                                    Default:{defaults ?? '-'}
                                </span>
                            </td>
                        </tr>
                    {/each}
                </tbody>
            </table>
        </div>
    {/if}
</div>
