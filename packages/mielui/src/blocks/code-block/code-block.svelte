<script lang="ts">
    import * as Tabs from '@mielui/svelte/components/tabs';
    import { cn } from '@mielui/svelte/utils';
    import { setContext, untrack } from 'svelte';
    import { insetLayout } from '../../components/_internal/inset-layout';
    import type { CodeBlockLabels, CodeBlockProps, CodeBlockTab } from '.';
    import Actions from './code-block-actions.svelte';
    import Content from './code-block-content.svelte';
    import Header from './code-block-header.svelte';
    import List from './code-block-list.svelte';
    import Trigger from './code-block-trigger.svelte';
    import { createCodeBlockRegistry } from './registry.svelte';

    let {
        children,
        class: className,
        value = $bindable(),
        tabs,
        code,
        lang,
        showLineNumbers = false,
        copy = 'actionbar',
        actions,
        theme = 'mielui',
        labels,
        ...rest
    }: CodeBlockProps = $props();
    setContext<() => CodeBlockLabels | undefined>('code-block-labels', () => labels);

    let element = $state<HTMLDivElement>();

    const SINGLE = '__single__';

    /**
     * High-level when `tabs` (multi-language) or `code` (single snippet) is given.
     * Otherwise the caller composes the subparts as children.
     */
    const resolvedTabs = $derived<CodeBlockTab[]>(
        (tabs ?? []).map((t) => {
            return {
                ...t,
                value: t.value ?? t.lang
            };
        })
    );
    const isHighLevel = $derived(tabs != null || code != null);
    const hasTabRow = $derived(resolvedTabs.length > 0);
    const bodyCopy = $derived<'overlay' | 'inline' | undefined>(
        copy === 'actionbar' ? undefined : copy
    );

    /**
     * Seeds the active tab before the first render, reading the raw props because
     * the derived above is not ready during init.
     */
    const initialValue = untrack(() => {
        const firstTab = tabs?.[0];
        if (firstTab) {
            return firstTab.value ?? firstTab.lang;
        }
        if (code != null) {
            return SINGLE;
        }
        return '';
    });
    value ??= initialValue;

    function highLevelOrder() {
        if (resolvedTabs.length > 0) {
            return resolvedTabs.map((tab) => tab.value as string);
        }
        if (code != null) {
            return [SINGLE];
        }
        return [];
    }

    const codeBlock = createCodeBlockRegistry({
        getValue: () => value,
        setValue: (next) => {
            value = next;
        },
        getElement: () => element,
        getHighLevel: () => isHighLevel,
        getHighLevelOrder: highLevelOrder,
        getTheme: () => theme
    });
    setContext('code-block', codeBlock.registry);
    setContext('code-block-panel', {
        get tabbed() {
            return isHighLevel ? hasTabRow : codeBlock.composedTriggerCount > 0;
        }
    });

    $effect.pre(() => {
        if (!isHighLevel) {
            return;
        }
        const available = resolvedTabs.map((tab) => tab.value as string);
        if (available.length === 0 && code != null) {
            available.push(SINGLE);
        }
        if (available.length > 0 && !available.includes(value ?? '')) {
            value = available[0];
        }
    });
</script>

<div
    bind:this={element}
    data-ui="code-block"
    class={cn(
        className,
        'mielui-inset-frame flex max-h-[var(--code-block-max-height)] w-full flex-col overflow-hidden text-foreground shadow-[var(--elevation-1)]',
        // token-lint-disable-next-line no-literal-length: code-block geometry contract
        '[--mielui-plate-radius:calc(min(var(--radius-xl),var(--radius-control)+var(--spacing)+var(--border-size))*var(--mielui-squircle,1))] [--code-block-gutter:var(--color-foreground-muted)] [--code-block-padding-x:1.1rem] [--code-block-padding-y:0.9rem] [--code-block-line-height:1.7] [--code-block-max-height:min(32rem,70vh)] [--code-block-slide:1.25rem]'
    )}
    {...rest}
>
    <Tabs.Root bind:value variant="ghost" class="contents">
        <div class="contents" use:insetLayout>
            {#if isHighLevel}
                {#if hasTabRow || actions || copy === 'actionbar'}
                    <Header>
                        {#if hasTabRow}
                            <List>
                                {#each resolvedTabs as t (t.value)}
                                    <Trigger value={t.value as string}>{t.label}</Trigger>
                                {/each}
                            </List>
                        {/if}
                        <Actions copy={copy === 'actionbar'}>{@render actions?.()} </Actions>
                    </Header>
                {/if}
                {#if hasTabRow || code != null}
                    <div
                        data-ui="code-block-surface"
                        class="mielui-inset-surface relative flex min-h-0 w-full flex-1 self-stretch overflow-auto"
                    >
                        {#if hasTabRow}
                            {#each resolvedTabs as t (t.value)}
                                <Content
                                    value={t.value as string}
                                    code={t.code}
                                    lang={t.lang}
                                    {showLineNumbers}
                                    copyPlacement={bodyCopy}
                                />
                            {/each}
                        {:else if code != null}
                            <Content
                                value={SINGLE}
                                {code}
                                {lang}
                                {showLineNumbers}
                                copyPlacement={bodyCopy}
                            />
                        {/if}
                    </div>
                {/if}
            {:else}
                {@render children?.()}
            {/if}
        </div>
    </Tabs.Root>
</div>
