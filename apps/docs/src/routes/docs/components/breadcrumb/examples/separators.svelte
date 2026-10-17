<script lang="ts">
    import * as Breadcrumb from '@mielui/svelte/components/breadcrumb';
</script>

<div class="flex flex-col items-center gap-6">
    <Breadcrumb.Root>
        <Breadcrumb.Item href="/">Projects</Breadcrumb.Item>
        <Breadcrumb.Separator />
        <Breadcrumb.Item current>Billing</Breadcrumb.Item>
    </Breadcrumb.Root>
    <Breadcrumb.Root>
        <Breadcrumb.Item href="/">Projects</Breadcrumb.Item>
        <Breadcrumb.Separator>/</Breadcrumb.Separator>
        <Breadcrumb.Item current>Billing</Breadcrumb.Item>
    </Breadcrumb.Root>
</div>
