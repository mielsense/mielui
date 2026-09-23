import { componentTypeHref, componentTypes } from '$lib/components';

export const pages = [
    { label: 'Home', href: '/' },
    { label: 'Introduction', href: '/docs/introduction' },
    { label: 'Installation', href: '/docs/installation' },
    { label: 'Theming', href: '/docs/theming' },
    { label: 'Agent skill', href: '/docs/agent-skill' },
    { label: 'Changelog', href: '/docs/changelog' },
    { label: 'All components', href: '/docs/components' },
    { label: 'Theme studio', href: '/studio' },
    ...componentTypes.map((group) => ({ label: group.heading, href: componentTypeHref(group.id) }))
];
