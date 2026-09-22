import type { NotchProps } from '.';

export function notchShape(width: number, height: number, side: NonNullable<NotchProps['side']>) {
    const vertical = side === 'top' || side === 'bottom';
    const span = Math.max(1, vertical ? width : height);
    const depth = Math.max(1, vertical ? height : width);
    const shoulder = Math.min(12, span / 6, depth / 3);
    const corner = Math.min(22, (span - shoulder * 2) / 2, depth / 2);
    const right = span - shoulder;
    const path = `M0 0H${span}Q${right} 0 ${right} ${shoulder}V${depth - corner}Q${right} ${depth} ${right - corner} ${depth}H${shoulder + corner}Q${shoulder} ${depth} ${shoulder} ${depth - corner}V${shoulder}Q${shoulder} 0 0 0Z`;
    let transform: string | undefined;
    if (side === 'bottom') {
        transform = `translate(0 ${height}) scale(1 -1)`;
    } else if (side === 'left') {
        transform = `matrix(0 -1 1 0 0 ${height})`;
    } else if (side === 'right') {
        transform = `matrix(0 1 -1 0 ${width} 0)`;
    }
    return { path, transform };
}
