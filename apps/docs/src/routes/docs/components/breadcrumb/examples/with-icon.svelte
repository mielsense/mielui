<script lang="ts">
    import {
        ArrowRight01Icon as ChevronRight,
        Home01Icon as Home
    } from '@hugeicons/core-free-icons';
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
