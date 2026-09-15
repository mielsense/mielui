import categories from '../../../../packages/mielui/component-categories.json';

export const componentGroups = [
    {
        id: 'components',
        heading: 'Components',
        items: categories.components
    },
    {
        id: 'ai-components',
        heading: 'AI components',
        items: categories['ai-components']
    },
    {
        id: 'chart-components',
        heading: 'Chart components',
        items: categories['chart-components']
    }
];

export const components = componentGroups.flatMap((group) => group.items);

export const sanitizeComponent = (name: string) => {
    if (name === 'composer') {
        return 'Composer';
    }

    return name
        .split('-')
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
};
