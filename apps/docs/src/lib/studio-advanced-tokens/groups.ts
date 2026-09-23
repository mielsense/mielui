export type TokenGroup<T> = {
    label: string;
    tokens: T[];
};

export function groupTokens<T extends { group: string }>(tokens: readonly T[]): TokenGroup<T>[] {
    const groups: TokenGroup<T>[] = [];
    const indexByLabel = new Map<string, number>();

    for (const token of tokens) {
        const existing = indexByLabel.get(token.group);
        if (existing === undefined) {
            indexByLabel.set(token.group, groups.length);
            groups.push({
                label: token.group,
                tokens: [token]
            });
            continue;
        }

        groups[existing]?.tokens.push(token);
    }

    return groups;
}
