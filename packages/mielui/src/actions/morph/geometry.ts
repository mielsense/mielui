type Point = { x: number; y: number };
const SAMPLE_COUNT = 80;

function isClosed(shape: SVGGeometryElement) {
    if (shape.tagName === 'path') {
        const path = shape.getAttribute('d') ?? '';
        return /z\s*$/i.test(path) && (path.match(/m/gi)?.length ?? 0) === 1;
    }
    return ['circle', 'ellipse', 'rect', 'polygon'].includes(shape.tagName);
}

function sample(shape: SVGGeometryElement, svg: SVGSVGElement): Point[] {
    const length = shape.getTotalLength();
    const matrix = svg
        .getCTM()
        ?.inverse()
        .multiply(shape.getCTM() ?? new DOMMatrix());
    return Array.from({ length: SAMPLE_COUNT }, (_, index) => {
        const point = shape.getPointAtLength((length * index) / SAMPLE_COUNT);
        return matrix ? new DOMPoint(point.x, point.y).matrixTransform(matrix) : point;
    });
}

function align(source: Point[], target: Point[]) {
    let result = target;
    let minimum = Number.POSITIVE_INFINITY;
    for (const direction of [1, -1]) {
        for (let offset = 0; offset < target.length; offset += 1) {
            const candidate = target.map(
                (_, index) => target[(offset + direction * index + target.length) % target.length]
            );
            const distance = candidate.reduce(
                (total, point, index) =>
                    total + (point.x - source[index].x) ** 2 + (point.y - source[index].y) ** 2,
                0
            );
            if (distance < minimum) {
                minimum = distance;
                result = candidate;
            }
        }
    }
    return result;
}

export function svgTransition(source: SVGSVGElement, target: SVGSVGElement) {
    if (source.getAttribute('viewBox') !== target.getAttribute('viewBox')) {
        return null;
    }
    const selector = 'path,circle,ellipse,rect,line,polyline,polygon';
    const previous = [...source.querySelectorAll<SVGGeometryElement>(selector)];
    const next = [...target.querySelectorAll<SVGGeometryElement>(selector)];
    if (
        previous.length !== next.length ||
        previous.some(
            (shape, index) =>
                !isClosed(shape) ||
                !isClosed(next[index]) ||
                shape.closest('[transform]') ||
                next[index].closest('[transform]')
        )
    ) {
        return null;
    }
    const updates: ((progress: number) => void)[] = [];
    for (let index = 0; index < previous.length; index += 1) {
        const shape = previous[index];
        const start = sample(shape, source);
        const end = align(start, sample(next[index], target));
        const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        for (const attribute of shape.attributes) {
            if (!['d', 'id', 'transform'].includes(attribute.name)) {
                path.setAttribute(attribute.name, attribute.value);
            }
        }
        shape.replaceWith(path);
        updates.push((progress) => {
            const points = start.map((point, pointIndex) => {
                const finish = end[pointIndex];
                return `${point.x + (finish.x - point.x) * progress},${point.y + (finish.y - point.y) * progress}`;
            });
            path.setAttribute('d', `M${points.join('L')}Z`);
        });
    }

    return (progress: number) => {
        for (const update of updates) {
            update(progress);
        }
    };
}
