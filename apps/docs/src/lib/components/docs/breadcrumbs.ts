import { componentTypeHref, componentTypes, navigationGroups } from '$lib/components';
import { componentGuidePages } from '$lib/docs-pages';

export function getBreadcrumbs(pathname: string) {
    const pathnameSegments = pathname.split('/').filter(Boolean);
    const isDocsPath = pathnameSegments[0] === 'docs';
    const segments = isDocsPath ? pathnameSegments.slice(1) : pathnameSegments;
    const basePath = isDocsPath ? '/docs' : '';
    const category =
        segments[0] === 'components'
            ? navigationGroups.find((group) =>
                  group.items.some((component) => component === segments[1])
              )
            : undefined;

    const type =
        segments[0] === 'components'
            ? componentTypes.find(
                  (entry) => entry.id === segments[1] || entry.items.includes(segments[1])
              )
            : undefined;
    if (type) {
        const parent = [
            { href: '/', label: 'Home' },
            { href: '/docs/components', label: 'Components' },
            { href: componentTypeHref(type.id), label: type.heading }
        ];
        if (type.id !== segments[1]) {
            parent.push({
                href: `/docs/components/${segments[1]}`,
                label: formatSegment(segments[1])
            });
        }
        return parent;
    }

    return [
        { href: '/', label: 'Home' },
        ...segments.map((segment, index) => ({
            href:
                index === 0 && category
                    ? `/docs/components#${category.id}`
                    : `${basePath}/${segments.slice(0, index + 1).join('/')}`,
            label:
                index === 0 && category
                    ? category.heading
                    : (componentGuidePages.find(
                          (guide) =>
                              guide.href === `${basePath}/${segments.slice(0, index + 1).join('/')}`
                      )?.title ?? formatSegment(segment))
        }))
    ];
}

function formatSegment(segment: string): string {
    const labels: Record<string, string> = {
        docs: 'Docs',
        components: 'Components',
        composer: 'Composer'
    };

    if (labels[segment]) {
        return labels[segment];
    }

    return segment
        .split('-')
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
}
