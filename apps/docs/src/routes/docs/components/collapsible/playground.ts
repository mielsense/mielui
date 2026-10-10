import { attributes, type PlaygroundValues, toggle } from '$lib/components/docs/playground';

export const controls = {
    fullWidth: toggle('Full width trigger', 'Appearance', true),
    chevron: toggle('Chevron', 'Content', true),
    disabled: toggle('Disabled', 'State')
};

export function code(values: PlaygroundValues<typeof controls>): string {
    const props = attributes({
        disabled: values.disabled
    });
    const trigger = attributes({
        class: values.fullWidth && 'w-full justify-between'
    });
    const imports = values.chevron
        ? `
    import { ArrowDown01Icon } from '@hugeicons/core-free-icons';`
        : '';
    const iconImport = values.chevron
        ? `
    import HugeiconsIcon from '@mielui/svelte/hugeicons-icon';`
        : '';
    const chevron = values.chevron
        ? `
        <HugeiconsIcon
            icon={ArrowDown01Icon}
            size={14}
            aria-hidden="true"
            class={['shrink-0 text-foreground-muted transition-transform', open && 'rotate-180']}
        />`
        : '';

    return `<script lang="ts">${imports}
    import * as Collapsible from '@mielui/svelte/components/collapsible';${iconImport}

    let open = $state(true);
</script>

<div class="w-full max-w-sm">
    <Collapsible.Root bind:open${props}>
        <Collapsible.Trigger${trigger}>
            Weekly sync, June 18${chevron}
        </Collapsible.Trigger>
        <Collapsible.Content class="pt-1 pb-2">
            The export flow is ready for testing. Maya owns the migration guide, and Sam will
            review keyboard navigation before Friday.
        </Collapsible.Content>
    </Collapsible.Root>
</div>`;
}
