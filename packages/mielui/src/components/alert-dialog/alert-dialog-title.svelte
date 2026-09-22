<script lang="ts">
    import { cn, type DefaultProps } from '@mielui/svelte/utils';
    import { getDialogContext } from '../dialog/context.svelte';

    let { class: className, children, ...rest }: DefaultProps = $props();

    const dialog = getDialogContext();
    const id = `${dialog.id}-title`;
    $effect(() => {
        dialog.titleId = id;
        return () => {
            if (dialog.titleId === id) {
                dialog.titleId = undefined;
            }
        };
    });
</script>

<h1
    {...rest}
    {id}
    class={cn(
        className,
        'font-[family-name:var(--font-header)] text-xl font-[var(--font-weight-header)] tracking-[var(--tracking-header)] leading-snug text-balance text-foreground'
    )}
>
    {@render children?.()}
</h1>
