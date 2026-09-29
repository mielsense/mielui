<script lang="ts">
    import { cn } from '@mielui/svelte/utils';

    let {
        id,
        title,
        class: className
    }: {
        id?: string;
        title: string;
        class?: string;
    } = $props();
</script>

<h2
    {id}
    class={cn(
        className,
        'sticky top-3 z-10 flex h-9 w-fit items-center rounded-full bg-foreground px-4 text-sm font-semibold text-background shadow-[var(--elevation-1)]'
    )}
>
    {title}
</h2>
