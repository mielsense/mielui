export type ReferenceProperty = {
    name: string;
    type: string;
    required: boolean;
    bindable: boolean;
    default: string | null;
    description: string;
    inherited: boolean;
};
export type ReferencePart = {
    name: string;
    properties: ReferenceProperty[];
};
type StoredPart = { name: string; properties: (ReferenceProperty | number)[] };
const files = import.meta.glob<StoredPart[] | ReferenceProperty[]>('../generated/api/*.json', {
    eager: true,
    import: 'default'
});

export function componentReference(slug: string): ReferencePart[] {
    const parts = files[`../generated/api/${slug}.json`] as StoredPart[] | undefined;
    return (parts ?? []).map((part) => ({
        name: part.name,
        properties: part.properties.map((property) => {
            if (typeof property !== 'number') {
                return property;
            }
            const chunk = files[
                `../generated/api/native-${Math.floor(property / 250)}.json`
            ] as ReferenceProperty[];
            return chunk[property % 250];
        })
    }));
}
