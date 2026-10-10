type FieldSegment = {
    part: string;
    value: string;
};

const FALLBACK_OPENING = /\s*\([^()]*:\s*$/;

/**
 * Removes the "(second: 00)" fallback the date formatter appends when a field stops at hours.
 * It arrives as a literal ending in a unit label, that unit's segment, and a closing literal.
 */
export function fieldSegments<Segment extends FieldSegment>(segments: Segment[]): Segment[] {
    const kept: Segment[] = [];

    for (let index = 0; index < segments.length; index += 1) {
        const segment = segments[index];
        const closing = segments[index + 2];
        const isFallback =
            segment.part === 'literal' &&
            FALLBACK_OPENING.test(segment.value) &&
            closing?.part === 'literal' &&
            closing.value.startsWith(')');

        if (!isFallback) {
            kept.push(segment);
            continue;
        }

        const literal = `${segment.value.replace(FALLBACK_OPENING, '')}${closing.value.slice(1)}`;
        if (literal) {
            kept.push({
                ...segment,
                value: literal
            });
        }
        index += 2;
    }

    return kept;
}
