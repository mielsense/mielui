<script lang="ts">
    import ChevronRight from '@hugeicons/core-free-icons/ArrowRight01Icon';
    import Home from '@hugeicons/core-free-icons/Home01Icon';
    import * as Breadcrumb from '@mielui/svelte/components/breadcrumb';
    import HugeiconsIcon from '@mielui/svelte/hugeicons-icon';
</script>

<div class="flex items-center justify-center">
    <Breadcrumb.Root>
        <Breadcrumb.Item href="/">
            <HugeiconsIcon icon={Home} size={13} />
        </Breadcrumb.Item>
        <Breadcrumb.Separator><HugeiconsIcon icon={ChevronRight} size={12} /></Breadcrumb.Separator>
        <Breadcrumb.Item href="/docs">Docs</Breadcrumb.Item>
        <Breadcrumb.Separator><HugeiconsIcon icon={ChevronRight} size={12} /></Breadcrumb.Separator>
        <Breadcrumb.Item>Components</Breadcrumb.Item>
    </Breadcrumb.Root>
</div>
