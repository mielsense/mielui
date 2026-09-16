<script lang="ts">
    import { ArrowRight01Icon as ChevronRight } from '@hugeicons/core-free-icons';
    import * as Breadcrumb from '@mielui/svelte/components/breadcrumb';
    import HugeiconsIcon from '@mielui/svelte/hugeicons-icon';
</script>

<div class="flex flex-col gap-6">
    <div class="flex items-center justify-center">
        <Breadcrumb.Root>
            <Breadcrumb.Item href="/">Home</Breadcrumb.Item>
            <Breadcrumb.Separator>
                <HugeiconsIcon icon={ChevronRight} size={12} />
            </Breadcrumb.Separator>
            <Breadcrumb.Item>Page</Breadcrumb.Item>
        </Breadcrumb.Root>
    </div>
    <div class="flex items-center justify-center">
        <Breadcrumb.Root>
            <Breadcrumb.Item href="/">Home</Breadcrumb.Item>
            <Breadcrumb.Separator>/</Breadcrumb.Separator>
            <Breadcrumb.Item>Page</Breadcrumb.Item>
        </Breadcrumb.Root>
    </div>
</div>
