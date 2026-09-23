<script lang="ts">
    import { ScrollArea } from '@mielui/svelte/components/scroll-area';
    import Appearance from './appearance.svelte';
    import Colors from './colors.svelte';
    import ExportActions from './export-actions.svelte';
    import Interaction from './interaction.svelte';
    import Shape from './shape.svelte';
    import Typography from './typography.svelte';
</script>
<div class="flex min-h-0 flex-1 flex-col">
    <ScrollArea class="hide-scrollbar-all h-full min-h-0 flex-1" showCues={false}>
        <div
            class="flex min-h-full flex-col [&_section]:relative [&_section]:px-5 [&_section]:py-0"
        >
            <Colors />
            <Appearance />
            <Shape />
            <Interaction />
            <Typography />
        </div>
    </ScrollArea>
    <ExportActions />
</div>
