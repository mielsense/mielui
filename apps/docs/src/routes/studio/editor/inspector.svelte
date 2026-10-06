<script lang="ts">
    import FadeScrollArea from '$lib/components/shell/fade-scroll-area.svelte';
    import Appearance from './appearance.svelte';
    import Colors from './colors.svelte';
    import ExportActions from './export-actions.svelte';
    import Interaction from './interaction.svelte';
    import Preset from './preset.svelte';
    import Shape from './shape.svelte';
    import Typography from './typography.svelte';
</script>

<div class="flex min-h-0 flex-1 flex-col">
    <FadeScrollArea class="flex-1" start hideScrollbar>
        <div class="flex min-h-full flex-col gap-5 px-3 pt-1 pb-6">
            <Preset />
            <Colors />
            <Appearance />
            <Shape />
            <Interaction />
            <Typography />
        </div>
    </FadeScrollArea>
    <ExportActions />
</div>
