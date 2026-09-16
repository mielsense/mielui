<script lang="ts">
    import * as Tabs from '@mielui/svelte/components/tabs';
    import { cn } from '@mielui/svelte/utils';
    import { setContext, untrack } from 'svelte';
    import type { CodeBlockProps, CodeBlockRegistry, CodeBlockTab } from '.';
    import Actions from './code-block-actions.svelte';
    import Content from './code-block-content.svelte';
    import Header from './code-block-header.svelte';
    import List from './code-block-list.svelte';
    import Trigger from './code-block-trigger.svelte';

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
        ...rest
    }: CodeBlockProps = $props();

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
        return firstTab ? (firstTab.value ?? firstTab.lang) : code != null ? SINGLE : '';
    });
    value ??= initialValue;

    /**
     * Raw code per tab -- Copy reads the active one -- plus the active/order
     * tracking that drives the directional slide between tabs.
     */
    const registry = $state({
        codes: {},
        langs: {},
        active: untrack(() => value ?? ''),
        order: [],
        contained: untrack(() => isHighLevel),
        theme: untrack(() => theme)
    } as CodeBlockRegistry);
    setContext('code-block', registry);
    setContext('code-block-panel', {
        get tabbed() {
            return !isHighLevel || hasTabRow;
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

    $effect(() => {
        registry.active = value ?? '';
        registry.contained = isHighLevel;
        registry.theme = theme;
        if (isHighLevel) {
            registry.order =
                resolvedTabs.length > 0
                    ? resolvedTabs.map((tab) => tab.value as string)
                    : code != null
                      ? [SINGLE]
                      : [];
        }
    });
    $effect(() => {
        if (isHighLevel || !element) {
            return;
        }
        const root = element;
        function reconcileOrder() {
            const triggers = Array.from(
                root.querySelectorAll<HTMLButtonElement>('[data-code-block-value]')
            ).filter((trigger) => trigger.closest('[data-ui="code-block"]') === root);
            const order = triggers.map((trigger) => trigger.dataset.codeBlockValue ?? '');
            if (
                order.length !== registry.order.length ||
                order.some((entry, index) => entry !== registry.order[index])
            ) {
                registry.order = order;
            }
            const enabled = triggers.filter((trigger) => !trigger.disabled);
            if (!enabled.some((trigger) => trigger.dataset.codeBlockValue === value)) {
                value = enabled[0]?.dataset.codeBlockValue ?? '';
            }
        }
        const observer = new MutationObserver(reconcileOrder);
        observer.observe(root, {
            childList: true,
            subtree: true,
            attributes: true,
            attributeFilter: ['data-code-block-value', 'disabled']
        });
        untrack(reconcileOrder);
        return () => observer.disconnect();
    });
</script>

<div
    bind:this={element}
    data-ui="code-block"
    class={cn(
        className,
        'mielui-inset-frame flex max-h-[var(--code-block-max-height)] w-full flex-col overflow-hidden text-foreground',
        // token-lint-disable-next-line no-literal-length: code-block geometry contract
        '[--code-block-gutter:var(--color-foreground-muted)] [--code-block-padding-x:1.1rem] [--code-block-padding-y:0.9rem] [--code-block-line-height:1.7] [--code-block-max-height:min(32rem,70vh)] [--code-block-slide:1.25rem]'
    )}
    {...rest}
>
    <Tabs.Root bind:value variant="segmented" class="contents">
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
                <!-- The static card: holds the background/ring while only the text
				     panels slide inside it (and clips the slide). -->
                <div
                    data-ui="code-block-surface"
                    class={cn(
                        'mielui-inset-surface relative flex min-h-0 w-full self-stretch flex-1 overflow-auto'
                    )}
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
    </Tabs.Root>
</div>
