<script lang="ts">
    import ChevronDown from '@hugeicons/core-free-icons/ArrowDown01Icon';
    import Star from '@hugeicons/core-free-icons/StarIcon';
    import Check from '@hugeicons/core-free-icons/Tick02Icon';
    import * as DropdownMenu from '@mielui/svelte/components/dropdown-menu';
    import HugeiconsIcon from '@mielui/svelte/hugeicons-icon';

    const options = ['Most starred', 'Recently updated', 'Alphabetical', 'Oldest first'];
    let selected = $state(options[0]);
</script>

<DropdownMenu.Root>
    <DropdownMenu.Trigger variant="ghost" size="md">
        <HugeiconsIcon icon={Star} size={13} />
        {selected}
        <HugeiconsIcon icon={ChevronDown} size={11} class="text-foreground-muted" />
    </DropdownMenu.Trigger>
    <DropdownMenu.Content class="min-w-[12rem]">
        {#each options as option (option)}
            <DropdownMenu.Item callback={() => (selected = option)}>
                <span>{option}</span>
                {#if selected === option}
                    <HugeiconsIcon icon={Check} size={12} class="ml-auto text-primary" />
                {/if}
            </DropdownMenu.Item>
        {/each}
    </DropdownMenu.Content>
</DropdownMenu.Root>
