function point(center: number, radius: number, angle: number) {
    return `${center + radius * Math.cos(angle)} ${center + radius * Math.sin(angle)}`;
}

export function gaugeArcPath(size: number, radius: number, width: number, progress: number) {
    if (progress <= 0) {
        return '';
    }
    const center = size / 2;
    const outer = radius + width / 2;
    const inner = radius - width / 2;
    if (progress >= 1) {
        return [
            `M ${point(center, outer, 0)}`,
            `A ${outer} ${outer} 0 1 1 ${point(center, outer, Math.PI)}`,
            `A ${outer} ${outer} 0 1 1 ${point(center, outer, 0)}`,
            `M ${point(center, inner, 0)}`,
            `A ${inner} ${inner} 0 1 0 ${point(center, inner, Math.PI)}`,
            `A ${inner} ${inner} 0 1 0 ${point(center, inner, 0)}`,
            'Z'
        ].join(' ');
    }
    const angle = progress * Math.PI * 2;
    const corner = Math.min(
        width * 0.42,
        5,
        inner * 0.25,
        inner * Math.sin(Math.min(angle, Math.PI) / 2) * 0.3
    );
    const outerInset = Math.asin(corner / (outer - corner));
    const innerInset = Math.asin(corner / (inner + corner));
    const outerTangent = Math.sqrt((outer - corner) ** 2 - corner ** 2);
    const innerTangent = Math.sqrt((inner + corner) ** 2 - corner ** 2);
    const outerLarge = angle - outerInset * 2 > Math.PI ? 1 : 0;
    const innerLarge = angle - innerInset * 2 > Math.PI ? 1 : 0;
    return [
        `M ${point(center, outer, outerInset)}`,
        `A ${outer} ${outer} 0 ${outerLarge} 1 ${point(center, outer, angle - outerInset)}`,
        `A ${corner} ${corner} 0 0 1 ${point(center, outerTangent, angle)}`,
        `L ${point(center, innerTangent, angle)}`,
        `A ${corner} ${corner} 0 0 1 ${point(center, inner, angle - innerInset)}`,
        `A ${inner} ${inner} 0 ${innerLarge} 0 ${point(center, inner, innerInset)}`,
        `A ${corner} ${corner} 0 0 1 ${point(center, innerTangent, 0)}`,
        `L ${point(center, outerTangent, 0)}`,
        `A ${corner} ${corner} 0 0 1 ${point(center, outer, outerInset)}`,
        'Z'
    ].join(' ');
}
