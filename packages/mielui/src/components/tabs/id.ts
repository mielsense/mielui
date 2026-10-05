/**
 * Turns a tab value into an ID fragment shared by its trigger and panel.
 *
 * Values that are already lowercase slugs pass through unchanged. Any other
 * value keeps its readable slug and gains its code points after a `--`
 * separator, so values that differ only by case, punctuation, or non-Latin
 * characters never share an ID.
 */
export function toTabIdPart(value: string) {
    const slug = value
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '');

    if (slug === value) {
        return slug;
    }

    const codePoints = Array.from(value, (character) => {
        return (character.codePointAt(0) ?? 0).toString(36);
    });

    return `${slug}--${codePoints.join('-')}`;
}
