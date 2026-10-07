import pkg from '../../../../packages/mielui/package.json';

type ChangelogEntry = {
    type: string;
    content: string;
};

export type ChangelogSection = {
    type: string;
    title: string;
    content: string;
    /** Number of top-level bullets in the section. */
    count: number;
};

export type ChangelogRelease = {
    version: string;
    unreleased: boolean;
    sections: ChangelogSection[];
};

const LLM_TYPE = 'llm';
const DOCS_TYPE = 'docs';
const LEADING_TYPES = ['breaking', 'feature', 'fix'];

const sources = import.meta.glob<string>('../../../../changelog/*/*.md', {
    eager: true,
    query: '?raw',
    import: 'default'
});

function changelogPath(path: string): { version: string; type: string } | undefined {
    const match = path.match(/\/changelog\/([^/]+)\/([^/]+)\.md$/);
    if (!match) {
        return undefined;
    }

    return {
        version: match[1],
        type: match[2]
    };
}

function titleFromType(type: string): string {
    return type
        .split('-')
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
}

function entriesFor(version: string): ChangelogEntry[] {
    return Object.entries(sources)
        .flatMap(([path, content]) => {
            const parsed = changelogPath(path);
            if (!parsed || parsed.version !== version || parsed.type === LLM_TYPE) {
                return [];
            }

            return [{ type: parsed.type, content: content.trim() }];
        })
        .sort((left, right) => {
            const order = typeRank(left.type) - typeRank(right.type);

            return order || left.type.localeCompare(right.type);
        });
}

/** Breaking changes, features and fixes lead. Docs notes always come last. */
function typeRank(type: string): number {
    if (type === DOCS_TYPE) {
        return LEADING_TYPES.length + 1;
    }

    const index = LEADING_TYPES.indexOf(type);

    return index === -1 ? LEADING_TYPES.length : index;
}

function isUnreleased(version: string): boolean {
    return version.localeCompare(pkg.version, undefined, { numeric: true }) > 0;
}

export const changelogVersions = [
    ...new Set(
        Object.keys(sources)
            .map(changelogPath)
            .flatMap((entry) => entry?.version ?? [])
    )
].sort((left, right) => right.localeCompare(left, undefined, { numeric: true }));

export const changelogReleases: ChangelogRelease[] = changelogVersions.flatMap((version) => {
    const entries = entriesFor(version);
    if (!entries.length) {
        return [];
    }

    return [
        {
            version,
            unreleased: isUnreleased(version),
            sections: entries.map((entry) => {
                return {
                    type: entry.type,
                    title: titleFromType(entry.type),
                    content: entry.content,
                    count: entry.content.match(/^- /gm)?.length ?? 0
                };
            })
        }
    ];
});

export const changelogLlmVersions = changelogVersions.filter((version) => {
    return Object.keys(sources).some((path) => {
        const parsed = changelogPath(path);
        return parsed?.version === version && parsed.type === LLM_TYPE;
    });
});

export function changelogLlmMarkdown(version: string): string | undefined {
    const entry = Object.entries(sources).find(([path]) => {
        const parsed = changelogPath(path);
        return parsed?.version === version && parsed.type === LLM_TYPE;
    });
    if (!entry) {
        return undefined;
    }

    const content = entry[1].trim();
    if (!content) {
        return undefined;
    }

    return [
        `# @mielui/svelte ${version} LLM changelog`,
        '',
        'Context for coding agents upgrading or composing against this release. The human changelog is the short bullet list; this page covers only changes that need migration or composition detail.',
        '',
        content,
        ''
    ].join('\n');
}

export function changelogMarkdown(version: string): string | undefined {
    const entries = entriesFor(version);
    if (!entries.length) {
        return undefined;
    }

    return [
        `# @mielui/svelte ${version} changelog`,
        '',
        'This document aggregates the release notes for this version. Review it before integrating or upgrading Mielui.',
        ...(changelogLlmVersions.includes(version)
            ? [
                  '',
                  `Large changes for this release have an LLM context page at [/changelog/${version}/llm.md](/changelog/${version}/llm.md).`
              ]
            : []),
        ...entries.flatMap((entry) => ['', `## ${titleFromType(entry.type)}`, '', entry.content]),
        ''
    ].join('\n');
}

export function changelogDocsMarkdown(): string {
    return changelogVersions
        .flatMap((version) => {
            const entries = entriesFor(version);
            if (!entries.length) {
                return [];
            }

            return [
                `## ${version}${isUnreleased(version) ? ' · Unreleased' : ''}`,
                '',
                ...entries.flatMap((entry) => {
                    return [`### ${titleFromType(entry.type)}`, '', entry.content, ''];
                })
            ];
        })
        .join('\n')
        .trim();
}
