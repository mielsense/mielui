type DigitSlot = {
    element: HTMLSpanElement;
    previous: HTMLSpanElement;
    next: HTMLSpanElement;
};

export function createRollRenderer(visual: HTMLElement) {
    const slots: DigitSlot[] = [];

    function render(from: string, to: string, direction: number, progress: number) {
        const length = Math.max(from.length, to.length);
        const before = from.padStart(length, ' ');
        const after = to.padStart(length, ' ');
        while (slots.length > length) {
            slots.pop()?.element.remove();
        }
        while (slots.length < length) {
            const element = document.createElement('span');
            element.className = 'relative inline-grid overflow-hidden whitespace-pre';
            const previous = document.createElement('span');
            previous.className = '[grid-area:1/1]';
            const next = document.createElement('span');
            next.className = '[grid-area:1/1]';
            element.append(previous, next);
            visual.append(element);
            slots.push({ element, previous, next });
        }
        for (let index = 0; index < length; index += 1) {
            const { previous, next } = slots[index];
            const changed = before[index] !== after[index];
            if (previous.textContent !== before[index]) {
                previous.textContent = before[index];
            }
            if (next.textContent !== after[index]) {
                next.textContent = after[index];
            }
            previous.style.transform = changed ? `translateY(${-direction * progress * 100}%)` : '';
            next.style.transform = changed
                ? `translateY(${direction * (1 - progress) * 100}%)`
                : '';
            next.style.visibility = changed ? 'visible' : 'hidden';
        }
    }

    return {
        roll(
            value: number,
            direction: number,
            precision: number,
            format: (value: number) => string
        ) {
            const step = 10 ** -precision;
            const start =
                direction >= 0 ? Math.floor(value / step) * step : Math.ceil(value / step) * step;
            const end = start + step * direction;
            const progress = Math.min(1, Math.abs(value - start) / step);
            render(
                format(Number(start.toFixed(precision))),
                format(Number(end.toFixed(precision))),
                direction,
                progress
            );
        },
        settle(value: string) {
            render(value, value, 0, 0);
        }
    };
}
