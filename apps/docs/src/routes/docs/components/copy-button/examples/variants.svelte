<script lang="ts">
    import { CopyButton } from '@mielui/svelte/components/copy-button';
</script>

<div class="flex items-center gap-3">
    <CopyButton text="ghost variant" labels={{ copy: 'Ghost' }} />
    <CopyButton text="outline variant" labels={{ copy: 'Outline' }} variant="outline" />
    <CopyButton text="secondary variant" labels={{ copy: 'Secondary' }} variant="secondary" />
</div>
