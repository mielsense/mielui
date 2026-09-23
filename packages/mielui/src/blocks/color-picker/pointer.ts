export function colorPlanePointer(node: HTMLElement, change: (x: number, y: number) => void) {
    let pointer: number | undefined;

    function update(event: PointerEvent) {
        const rect = node.getBoundingClientRect();
        if (rect.width <= 0 || rect.height <= 0) {
            return;
        }
        change(
            Math.round(Math.max(0, Math.min(1, (event.clientX - rect.left) / rect.width)) * 100),
            Math.round(Math.max(0, Math.min(1, 1 - (event.clientY - rect.top) / rect.height)) * 100)
        );
    }

    function down(event: PointerEvent) {
        if (event.defaultPrevented || event.button !== 0 || pointer !== undefined) {
            return;
        }
        pointer = event.pointerId;
        event.preventDefault();
        node.setPointerCapture(pointer);
        update(event);
    }

    function move(event: PointerEvent) {
        if (pointer === event.pointerId) {
            update(event);
        }
    }

    function finish(event: PointerEvent) {
        if (pointer !== event.pointerId) {
            return;
        }
        const previous = pointer;
        pointer = undefined;
        if (node.hasPointerCapture(previous)) {
            node.releasePointerCapture(previous);
        }
    }

    node.addEventListener('pointerdown', down);
    node.addEventListener('pointermove', move);
    node.addEventListener('pointerup', finish);
    node.addEventListener('pointercancel', finish);
    node.addEventListener('lostpointercapture', finish);

    return {
        update(next: (x: number, y: number) => void) {
            change = next;
        },
        destroy() {
            node.removeEventListener('pointerdown', down);
            node.removeEventListener('pointermove', move);
            node.removeEventListener('pointerup', finish);
            node.removeEventListener('pointercancel', finish);
            node.removeEventListener('lostpointercapture', finish);
            if (pointer !== undefined && node.hasPointerCapture(pointer)) {
                node.releasePointerCapture(pointer);
            }
        }
    };
}
