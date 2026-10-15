<script lang="ts">
    import * as Breadcrumb from '@mielui/svelte/components/breadcrumb';
</script>

<div class="flex flex-col items-center gap-6">
    <Breadcrumb.Root>
        <Breadcrumb.Item href="/">Home</Breadcrumb.Item>
        <Breadcrumb.Separator />
        <Breadcrumb.Item current>Page</Breadcrumb.Item>
    </Breadcrumb.Root>
    <Breadcrumb.Root>
        <Breadcrumb.Item href="/">Home</Breadcrumb.Item>
        <Breadcrumb.Separator>/</Breadcrumb.Separator>
        <Breadcrumb.Item current>Page</Breadcrumb.Item>
    </Breadcrumb.Root>
</div>
