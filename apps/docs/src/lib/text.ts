/** Capitalizes the first letter and leaves the rest as written. */
export function capitalize(text: string): string {
    return text.charAt(0).toUpperCase() + text.slice(1);
}

/** Turns a kebab-case slug into Title Case words: `number-field` reads "Number Field". */
export function titleCase(slug: string): string {
    return slug.split('-').map(capitalize).join(' ');
}
