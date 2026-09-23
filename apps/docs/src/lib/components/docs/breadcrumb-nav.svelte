<script lang="ts">
    import * as Breadcrumb from '@mielui/svelte/components/breadcrumb';

    let {
        items = [],
        class: classProp = ''
    }: {
        items?: Array<{ label: string; href?: string }>;
        class?: string;
    } = $props();
</script>

<Breadcrumb.Root class={`text-sm text-foreground-muted ${classProp}`}>
    {#each items as item, index (item.label)}
        <Breadcrumb.Item
            href={index < items.length - 1 ? item.href : undefined}
            current={index === items.length - 1}
        >
            {item.label}
        </Breadcrumb.Item>
        {#if index < items.length - 1}
            <Breadcrumb.Separator />
        {/if}
    {/each}
</Breadcrumb.Root>
