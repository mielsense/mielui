type FieldMetadataOptions = {
    id: string;
    metadataId: string;
    label?: string;
    description?: string;
    error?: string;
    ariaLabel?: string | null;
    labelledBy?: string | null;
    describedBy?: string | null;
};

export function mergeDescriptionIds(...values: Array<string | null | undefined>) {
    const ids = values.flatMap((value) => value?.trim().split(/\s+/).filter(Boolean) ?? []);
    return [...new Set(ids)].join(' ') || undefined;
}

export function fieldMetadata(options: FieldMetadataOptions) {
    const labelId = `${options.metadataId}-label`;
    const descriptionId = `${options.metadataId}-description`;
    const errorId = `${options.metadataId}-error`;
    return {
        controlId: options.id,
        labelId,
        descriptionId,
        errorId,
        labelledBy:
            mergeDescriptionIds(options.labelledBy) ??
            (options.label && !options.ariaLabel ? labelId : undefined),
        describedBy: mergeDescriptionIds(
            options.describedBy,
            options.error ? errorId : options.description ? descriptionId : undefined
        )
    };
}
