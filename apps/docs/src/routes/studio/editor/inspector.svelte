<script lang="ts">
    import { ScrollArea } from '@mielui/svelte/components/scroll-area';
    import Colors from './colors.svelte';
    import Effects from './effects.svelte';
    import ExportActions from './export-actions.svelte';
    import Shape from './shape.svelte';
    import Typography from './typography.svelte';
</script>
<div class="flex min-h-0 flex-1 flex-col">
    <ScrollArea class="hide-scrollbar-all h-full min-h-0 flex-1" showCues={false}>
        <div
            class="flex min-h-full flex-col [&_section]:relative [&_section]:px-5 [&_section]:py-0"
        >
            <Colors />
            <Effects />
            <Shape />
            <Typography />
        </div>
    </ScrollArea>
    <ExportActions />
</div>
