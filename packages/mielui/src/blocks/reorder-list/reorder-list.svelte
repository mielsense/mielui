<script lang="ts" generics="T">
    import { getCssDuration } from '@mielui/svelte/transition';
    import { cn } from '@mielui/svelte/utils';
    import { flip } from 'svelte/animate';
    import { cubicOut } from 'svelte/easing';
    import type { ReorderListProps } from '.';
    import { setReorderList } from './context.svelte';
    import { createReorderGesture } from './gesture.svelte';
    import Content from './reorder-list-content.svelte';
    import Handle from './reorder-list-handle.svelte';
    import Item from './reorder-list-item.svelte';

    let {
        items = $bindable(),
        getId,
        getLabel,
        children,
        row,
        label,
        disabled = false,
        onReorder,
        onCommit,
        class: className,
        ...rest
    }: ReorderListProps<T> = $props();
    const uid = $props.id();

    let listElement = $state<HTMLOListElement>();
    const gesture = createReorderGesture({
        get items() {
            return items;
        },
        set items(next) {
            items = next;
        },
        get getId() {
            return getId;
        },
        get getLabel() {
            return getLabel;
        },
        get disabled() {
            return disabled;
        },
        get element() {
            return listElement;
        },
        hintId: `${uid}-hint`,
        get onReorder() {
            return onReorder;
        },
        get onCommit() {
            return onCommit;
        }
    });
    setReorderList(gesture);

    function animateRow(
        node: HTMLElement,
        positions: { from: DOMRect; to: DOMRect },
        lifted: boolean
    ) {
        return flip(node, positions, {
            duration:
                gesture.reduced || lifted ? 0 : getCssDuration(node, '--motion-duration-item', 180),
            easing: cubicOut
        });
    }
</script>

<svelte:window
    onpointermove={gesture.movePointer}
    onpointerup={gesture.finishPointer}
    onpointercancel={gesture.cancelPointer}
    onblur={gesture.cancelInterruptedGesture}
    onscrollcapture={gesture.scrollPointer}
/>
<svelte:document
    onvisibilitychange={() => {
        if (document.hidden) {
            gesture.cancelInterruptedGesture();
        }
    }}
/>

<div {...rest} data-ui="reorder-list" class={cn(className, 'w-full')}>
    <ol
        bind:this={listElement}
        aria-label={label}
        onlostpointercapture={gesture.losePointerCapture}
        class="m-0 list-none space-y-1.5 p-0"
    >
        {#each items as item (getId(item))}
            {const id = $derived(getId(item))}
            {const lifted = $derived(gesture.lifted(id))}
            <li animate:animateRow={lifted}>
                {#if row}
                    {@render row(item)}
                {:else}
                    <Item {id} label={getLabel(item)}>
                        <Handle />
                        <Content>{@render children?.(item)}</Content>
                    </Item>
                {/if}
            </li>
        {/each}
    </ol>
    <span id={`${uid}-hint`} class="sr-only">
        Drag to reorder. With the handle focused, Space or Enter grabs the row, the arrow keys move
        it, Space or Enter drops it, and Escape restores the original order.
    </span>
    <span role="status" aria-live="polite" class="sr-only">{gesture.spoken}</span>
</div>
