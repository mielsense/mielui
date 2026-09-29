<script lang="ts">
    import { createInspectorState } from '$lib/components/shell/inspector-state.svelte';

    const inspector = createInspectorState(() => 'mielui:test-inspector');
</script>

<button type="button" onclick={inspector.togglePin}>Toggle pin</button>
<button type="button" onclick={inspector.close}>Close</button>
<output data-testid="inspector-state">{inspector.pinned}:{inspector.open}</output>
