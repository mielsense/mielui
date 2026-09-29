type Segment =
    | {
          kind: 'text';
          value: string;
      }
    | {
          kind: 'code';
          value: string;
      }
    | {
          kind: 'link';
          value: string;
          href: string;
      };

const pattern = /`([^`]+)`|\[([^\]]+)\]\(([^)\s]+)\)/g;

export function parseInlineText(source: string): Segment[] {
    const segments: Segment[] = [];
    let cursor = 0;

    for (const match of source.matchAll(pattern)) {
        const start = match.index ?? 0;

        if (start > cursor) {
            segments.push({
                kind: 'text',
                value: source.slice(cursor, start)
            });
        }

        if (match[1] !== undefined) {
            segments.push({
                kind: 'code',
                value: match[1]
            });
        } else {
            segments.push({
                kind: 'link',
                value: match[2],
                href: match[3]
            });
        }

        cursor = start + match[0].length;
    }

    if (cursor < source.length) {
        segments.push({
            kind: 'text',
            value: source.slice(cursor)
        });
    }

    return segments;
}
