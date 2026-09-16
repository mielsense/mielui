<script lang="ts">
    import ChevronRight from '@hugeicons/core-free-icons/ArrowRight01Icon';
    import * as Breadcrumb from '@mielui/svelte/components/breadcrumb';
    import HugeiconsIcon from '@mielui/svelte/hugeicons-icon';
</script>

<div class="flex items-center justify-center">
    <Breadcrumb.Root>
        <Breadcrumb.Item href="/">Home</Breadcrumb.Item>
        <Breadcrumb.Separator><HugeiconsIcon icon={ChevronRight} size={14} /></Breadcrumb.Separator>
        <Breadcrumb.Item href="/docs">Docs</Breadcrumb.Item>
        <Breadcrumb.Separator><HugeiconsIcon icon={ChevronRight} size={14} /></Breadcrumb.Separator>
        <Breadcrumb.Item>Current</Breadcrumb.Item>
    </Breadcrumb.Root>
</div>
