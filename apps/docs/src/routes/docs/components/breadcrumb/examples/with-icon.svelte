<script lang="ts">
    import { Home01Icon as Home } from '@hugeicons/core-free-icons';
    import * as Breadcrumb from '@mielui/svelte/components/breadcrumb';
    import HugeiconsIcon from '@mielui/svelte/hugeicons-icon';
</script>

<Breadcrumb.Root>
    <Breadcrumb.Item href="/" aria-label="Home">
        <HugeiconsIcon icon={Home} size={13} />
    </Breadcrumb.Item>
    <Breadcrumb.Separator />
    <Breadcrumb.Item href="/docs">Docs</Breadcrumb.Item>
    <Breadcrumb.Separator />
    <Breadcrumb.Item current>Components</Breadcrumb.Item>
</Breadcrumb.Root>
