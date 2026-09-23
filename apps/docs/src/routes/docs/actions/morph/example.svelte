<script lang="ts">
    import { Moon02Icon as Moon, Sun03Icon as Sun } from '@hugeicons/core-free-icons';
    import { morph } from '@mielui/svelte/actions/morph';
    import { Button } from '@mielui/svelte/components/button';
    import HugeiconsIcon from '@mielui/svelte/hugeicons-icon';

    let night = $state(false);

    function toggleAppearance() {
        night = !night;
    }
</script>
<Button variant="outline" onclick={toggleAppearance} aria-label="Switch appearance preview">
    <span class="inline-flex size-5" aria-hidden="true" use:morph={{ key: night }}>
        <HugeiconsIcon icon={night ? Moon : Sun} size={20} />
    </span>
    <span class="inline-block w-12 text-left" use:morph={{ key: night }}>
        {night ? 'Night' : 'Day'}
    </span>
</Button>
