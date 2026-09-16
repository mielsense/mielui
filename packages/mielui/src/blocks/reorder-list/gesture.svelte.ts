import { onDestroy, tick, untrack } from 'svelte';

type GestureOptions<T> = {
    items: T[];
    readonly getId: (item: T) => string;
    readonly getLabel: (item: T) => string;
    readonly disabled: boolean;
    readonly element: HTMLOListElement | undefined;
    readonly hintId: string;
    readonly onReorder: ((items: T[]) => void) | undefined;
    readonly onCommit: ((items: T[]) => void) | undefined;
};

export function createReorderGesture<T>(options: GestureOptions<T>) {
    const items = $derived(options.items);
    const getId = $derived(options.getId);
    const getLabel = $derived(options.getLabel);
    const disabled = $derived(options.disabled);
    const listElement = $derived(options.element);
    const onReorder = $derived(options.onReorder);
    const onCommit = $derived(options.onCommit);
    let grabbed = $state<string>();
    let dragging = $state<string>();
    let spoken = $state('');
    let reduced = $state(false);
    let snapshot: T[] | undefined;
    let gestureOrder: string[] | undefined;
    let pointerSession:
        | {
              id: string;
              node: HTMLDivElement;
              pointerId: number;
              startY: number;
              currentY: number;
              startListTop: number;
              grabOffset: number;
              centers: { id: string; center: number }[];
          }
        | undefined;
    const dragThreshold = 5;

    onDestroy(() => {
        clearPointerSession();
    });

    $effect(() => {
        if (typeof window.matchMedia !== 'function') {
            return;
        }
        const query = window.matchMedia('(prefers-reduced-motion: reduce)');
        const update = () => {
            reduced = query.matches;
        };
        update();
        query.addEventListener('change', update);
        return () => query.removeEventListener('change', update);
    });

    $effect(() => {
        if (disabled) {
            untrack(cancelInterruptedGesture);
        }
    });

    $effect(() => {
        const currentOrder = items.map(getId);
        untrack(() => {
            if (
                !snapshot ||
                !gestureOrder ||
                (currentOrder.length === gestureOrder.length &&
                    currentOrder.every((id, index) => id === gestureOrder?.[index]))
            ) {
                return;
            }
            snapshot = undefined;
            gestureOrder = undefined;
            grabbed = undefined;
            dragging = undefined;
            clearPointerSession();
            spoken = 'Reorder cancelled because the list changed.';
        });
    });

    function moveItem(list: T[], from: number, to: number) {
        const next = [...list];
        const [item] = next.splice(from, 1);
        next.splice(to, 0, item);
        return next;
    }

    function emit(next: T[]) {
        gestureOrder = next.map(getId);
        options.items = next;
        onReorder?.(next);
    }

    function indexOf(id: string) {
        return items.findIndex((item) => getId(item) === id);
    }

    function announcePosition(id: string) {
        const index = indexOf(id);
        if (index < 0) {
            return;
        }
        const item = items[index];
        spoken = `${getLabel(item)}, position ${index + 1} of ${items.length}.`;
    }

    function announceDrop(id: string) {
        const index = indexOf(id);
        if (index < 0) {
            return;
        }
        const item = items[index];
        spoken = `${getLabel(item)} dropped at position ${index + 1}.`;
    }

    function grab(id: string) {
        if (disabled || pointerSession) {
            return;
        }
        snapshot = [...items];
        gestureOrder = items.map(getId);
        grabbed = id;
        const index = indexOf(id);
        if (index < 0) {
            return;
        }
        const item = items[index];
        spoken = `${getLabel(item)} grabbed, position ${index + 1} of ${items.length}.`;
    }

    function drop(id: string) {
        grabbed = undefined;
        snapshot = undefined;
        announceDrop(id);
        onCommit?.([...items]);
    }

    function clearPointerSession(settle = false) {
        const session = pointerSession;
        pointerSession = undefined;
        if (!session) {
            return;
        }
        if (listElement?.hasPointerCapture?.(session.pointerId)) {
            listElement.releasePointerCapture?.(session.pointerId);
        }
        if (settle && !reduced) {
            session.node.style.removeProperty('transition-property');
            void session.node.offsetWidth;
        }
        session.node.style.translate = '';
        session.node.style.removeProperty('transition-property');
        session.node.style.removeProperty('will-change');
    }

    function cancel() {
        if (!snapshot) {
            return;
        }
        const currentById = new Map(items.map((item) => [getId(item), item]));
        const original: T[] = [];
        for (const item of snapshot) {
            const id = getId(item);
            if (currentById.has(id)) {
                original.push(currentById.get(id) as T);
                currentById.delete(id);
            }
        }
        original.push(...currentById.values());
        const active = Boolean(dragging || grabbed);
        snapshot = undefined;
        grabbed = undefined;
        dragging = undefined;
        clearPointerSession();
        if (active) {
            emit(original);
            spoken = 'Reorder cancelled, original order restored.';
        }
    }

    function step(id: string, delta: -1 | 1) {
        const from = indexOf(id);
        const to = from + delta;
        if (from < 0 || to < 0 || to >= items.length) {
            return;
        }
        emit(moveItem(items, from, to));
        announcePosition(id);
        void tick().then(() => {
            if (grabbed !== id) {
                return;
            }
            const row = Array.from(
                listElement?.querySelectorAll<HTMLButtonElement>('[data-reorder-id]') ?? []
            ).find((candidate) => candidate.dataset.reorderId === id);
            row?.focus({ preventScroll: true });
        });
    }

    function onRowKeydown(event: KeyboardEvent, id: string) {
        if (
            disabled ||
            event.defaultPrevented ||
            event.isComposing ||
            event.repeat ||
            event.target !== event.currentTarget
        ) {
            return;
        }
        const held = grabbed === id;
        if (event.key === ' ' || event.key === 'Enter') {
            event.preventDefault();
            if (held) {
                drop(id);
            } else {
                grab(id);
            }
            return;
        }
        if (held && (event.key === 'ArrowUp' || event.key === 'ArrowDown')) {
            event.preventDefault();
            step(id, event.key === 'ArrowUp' ? -1 : 1);
            return;
        }
        if (held && event.key === 'Escape') {
            event.preventDefault();
            cancel();
        }
    }

    function startPointer(event: PointerEvent, id: string) {
        if (disabled || grabbed || pointerSession || event.button !== 0) {
            return;
        }
        const handle = event.currentTarget as HTMLButtonElement;
        const node = handle.closest<HTMLDivElement>('[data-reorder-item]');
        if (!node) {
            return;
        }
        snapshot = [...items];
        gestureOrder = items.map(getId);
        const rect = node.getBoundingClientRect();
        pointerSession = {
            id,
            node,
            pointerId: event.pointerId,
            startY: event.clientY,
            currentY: event.clientY,
            startListTop: listElement?.getBoundingClientRect().top ?? 0,
            grabOffset: event.clientY - rect.top,
            centers: Array.from(
                listElement?.querySelectorAll<HTMLDivElement>('[data-reorder-item]') ?? []
            ).map((candidate) => {
                const candidateRect = candidate.getBoundingClientRect();
                return {
                    id: candidate.dataset.reorderItem ?? '',
                    center: candidateRect.top + candidateRect.height / 2
                };
            })
        };
        event.preventDefault();
        handle.focus({ preventScroll: true });
        listElement?.setPointerCapture?.(event.pointerId);
    }

    function positionDraggedRow(session: NonNullable<typeof pointerSession>) {
        const rowTop = session.node.parentElement?.getBoundingClientRect().top;
        if (rowTop === undefined) {
            return;
        }
        session.node.style.translate = `0 ${session.currentY - session.grabOffset - rowTop}px`;
    }

    function movePointer(event: PointerEvent) {
        const session = pointerSession;
        if (!session || session.pointerId !== event.pointerId || !listElement) {
            return;
        }
        if (disabled) {
            cancel();
            return;
        }
        if (!dragging) {
            if (Math.abs(event.clientY - session.startY) < dragThreshold) {
                return;
            }
            dragging = session.id;
            session.node.style.setProperty(
                'transition-property',
                'background-color, border-color, box-shadow'
            );
            session.node.style.setProperty('will-change', 'translate');
        }
        if (dragging !== session.id) {
            return;
        }
        session.currentY = event.clientY;
        positionDraggedRow(session);

        const from = indexOf(session.id);
        const pointerCenter = event.clientY + (session.node.offsetHeight / 2 - session.grabOffset);
        const scrollDelta = listElement.getBoundingClientRect().top - session.startListTop;
        const to = session.centers
            .filter((entry) => entry.id !== session.id)
            .filter((entry) => pointerCenter > entry.center + scrollDelta).length;
        if (from >= 0 && to !== from) {
            emit(moveItem(items, from, to));
            void tick().then(() => {
                if (pointerSession === session) {
                    positionDraggedRow(session);
                }
            });
        }
    }

    function finishPointer(event: PointerEvent) {
        const session = pointerSession;
        if (!session || session.pointerId !== event.pointerId) {
            return;
        }
        if (disabled) {
            cancel();
            return;
        }
        const moved = dragging === session.id;
        dragging = undefined;
        snapshot = undefined;
        clearPointerSession(moved);
        if (moved) {
            announceDrop(session.id);
            onCommit?.([...items]);
        }
    }

    function cancelPointer(event: PointerEvent) {
        if (pointerSession?.pointerId === event.pointerId) {
            cancel();
        }
    }

    function losePointerCapture(event: PointerEvent) {
        if (event.target === listElement) {
            cancelPointer(event);
        }
    }

    function scrollPointer() {
        if (pointerSession && dragging) {
            positionDraggedRow(pointerSession);
        }
    }

    function cancelInterruptedGesture() {
        if (pointerSession || dragging || grabbed) {
            cancel();
        }
    }
    return {
        get disabled() {
            return disabled;
        },
        get hintId() {
            return options.hintId;
        },
        lifted(id: string) {
            return grabbed === id || dragging === id;
        },
        held(id: string) {
            return grabbed === id;
        },
        keydown: onRowKeydown,
        pointerdown: startPointer,
        cancel,
        get reduced() {
            return reduced;
        },
        get spoken() {
            return spoken;
        },
        movePointer,
        finishPointer,
        cancelPointer,
        losePointerCapture,
        scrollPointer,
        cancelInterruptedGesture
    };
}
