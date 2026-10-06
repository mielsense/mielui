<script lang="ts">
    import { cn } from '@mielui/svelte/utils';
    import type { HTMLAnchorAttributes, HTMLAttributes } from 'svelte/elements';
    import type { FolderCardProps } from '.';
    import { setFolderCard } from './context';

    let {
        href,
        onclick,
        disabled = false,
        tone = 1,
        class: className,
        children,
        ...rest
    }: FolderCardProps = $props();

    const generatedId = $props.id();
    let titleId = $state(`${generatedId}-title`);

    setFolderCard({
        get tone() {
            return tone;
        },
        get titleId() {
            return titleId;
        },
        set titleId(value) {
            titleId = value;
        }
    });

    const frameClasses = [
        'mielui-inset-frame flex aspect-5/4 min-w-0 flex-col shadow-[var(--elevation-1)]',
        '[--folder-card-radius:var(--radius-lg)]',
        '[--folder-card-body:var(--color-foreground)]',
        '[--folder-card-ink:var(--color-card)]',
        '[--folder-card-ink-muted:color-mix(in_oklab,var(--color-card)_70%,var(--color-foreground))]',
        'dark:[--folder-card-body:var(--color-background)]',
        'dark:[--folder-card-ink:var(--color-foreground)]',
        'dark:[--folder-card-ink-muted:var(--color-foreground-muted)]'
    ];

    const linkClasses = [
        'group/folder-card outline-none',
        'transition-[border-color,box-shadow] duration-[var(--motion-duration-hover)] ease-[var(--ease-out)] motion-reduce:transition-none',
        'hover:border-border-strong focus-visible:shadow-[var(--focus-ring),var(--elevation-1)]'
    ];

    const buttonClasses = [
        'group/folder-card relative',
        'transition-[border-color,box-shadow] duration-[var(--motion-duration-hover)] ease-[var(--ease-out)] motion-reduce:transition-none',
        'hover:border-border-strong has-[[data-ui=folder-card-action]:focus-visible]:shadow-[var(--focus-ring),var(--elevation-1)]'
    ];
</script>

{#snippet surface()}
    <div
        data-ui="folder-card-surface"
        class="mielui-inset-surface grid flex-1 grid-rows-[minmax(calc(var(--spacing)*10),1fr)_auto_minmax(calc(var(--spacing)*16),1.25fr)] overflow-clip bg-[var(--folder-card-body)]"
    >
        {@render children()}
    </div>
{/snippet}

{#if href !== undefined}
    <a
        data-ui="folder-card"
        data-tone={tone}
        {href}
        {onclick}
        {...rest as HTMLAnchorAttributes}
        class={cn(className, frameClasses, linkClasses)}
    >
        {@render surface()}
    </a>
{:else if onclick}
    <article
        data-ui="folder-card"
        data-tone={tone}
        data-disabled={disabled || undefined}
        {...rest as HTMLAttributes<HTMLElement>}
        class={cn(
            className,
            frameClasses,
            disabled ? 'relative opacity-[var(--opacity-disabled)]' : buttonClasses
        )}
    >
        {@render surface()}
        <button
            type="button"
            data-ui="folder-card-action"
            aria-labelledby={titleId}
            {disabled}
            onclick={onclick as (event: MouseEvent) => void}
            class="absolute inset-0 z-10 rounded-[inherit] outline-none enabled:cursor-[var(--ui-cursor-interactive)] disabled:cursor-not-allowed"
        ></button>
    </article>
{:else}
    <article
        data-ui="folder-card"
        data-tone={tone}
        {...rest as HTMLAttributes<HTMLElement>}
        class={cn(className, frameClasses)}
    >
        {@render surface()}
    </article>
{/if}
