import { svgTransition } from './geometry';

export type MorphDraw = (progress: number) => void;

/** Returns `null` when the outgoing and incoming icons cannot be measured. */
export function svgDraw(
    visual: HTMLElement,
    existing: SVGSVGElement[],
    target: SVGSVGElement
): MorphDraw | null {
    const source = existing[0];
    const incoming = target.cloneNode(true) as SVGSVGElement;
    Object.assign(incoming.style, { position: 'absolute', inset: '0', opacity: '0' });
    visual.append(incoming);
    try {
        const geometry =
            existing.length === 1 && Number(source.style.opacity || 1) === 1
                ? svgTransition(source, incoming)
                : null;
        incoming.remove();
        if (geometry) {
            return geometry;
        }

        visual.append(incoming);
        const outgoing = existing.map((svg) => ({
            svg,
            opacity: Number(svg.style.opacity || 1),
            rotation: Number(svg.style.transform.match(/rotate\((-?[\d.]+)deg\)/)?.[1] ?? 0),
            scale: Number(svg.style.transform.match(/scale\(([\d.]+)\)/)?.[1] ?? 1)
        }));

        return (progress) => {
            for (const entry of outgoing) {
                entry.svg.style.opacity = String(entry.opacity * (1 - progress));
                entry.svg.style.transform = `rotate(${entry.rotation + (-90 - entry.rotation) * progress}deg) scale(${entry.scale + (0.5 - entry.scale) * progress})`;
            }
            incoming.style.opacity = String(progress);
            incoming.style.transform = `rotate(${90 * (1 - progress)}deg) scale(${0.5 + progress * 0.5})`;
        };
    } catch {
        return null;
    }
}

export function textDraw(visual: HTMLElement, target: SVGSVGElement | string): MorphDraw {
    if (visual.childElementCount === 0) {
        const text = document.createElement('span');
        text.textContent = visual.textContent;
        text.style.gridArea = '1 / 1';
        text.style.whiteSpace = 'inherit';
        visual.replaceChildren(text);
    }
    const outgoing = [...visual.children].map((element) => ({
        element: element as HTMLElement,
        opacity: Number((element as HTMLElement).style.opacity || 1)
    }));
    const after = document.createElement('span');
    after.textContent = typeof target === 'string' ? target : '';
    Object.assign(after.style, { gridArea: '1 / 1', whiteSpace: 'inherit' });
    visual.append(after);

    return (progress) => {
        for (const entry of outgoing) {
            entry.element.style.opacity = String(entry.opacity * (1 - progress));
            entry.element.style.filter = `blur(${progress * 2}px)`;
        }
        after.style.opacity = String(progress);
        after.style.filter = `blur(${(1 - progress) * 2}px)`;
    };
}
