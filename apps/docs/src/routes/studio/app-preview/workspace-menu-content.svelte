<script lang="ts">
    import * as DropdownMenu from '@mielui/svelte/components/dropdown-menu';
    import type { AppPreviewModel } from './model.svelte';

    let { model }: { model: AppPreviewModel } = $props();
</script>

<!--
    @component
    The workspace switcher items, shared by the sidebar and the compact header.
-->

<DropdownMenu.Content>
    <DropdownMenu.Label>Workspace</DropdownMenu.Label>
    <DropdownMenu.Item>Northstar Ledger</DropdownMenu.Item>
    <DropdownMenu.Item>Personal books</DropdownMenu.Item>
    <DropdownMenu.Separator />
    <DropdownMenu.Item
        callback={() => {
            model.runDashboardAction('Workspace created', 'A blank ledger is ready.');
        }}
    >
        Create workspace
    </DropdownMenu.Item>
</DropdownMenu.Content>
