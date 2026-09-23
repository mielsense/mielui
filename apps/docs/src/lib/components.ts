import categories from '../../../../packages/mielui/component-categories.json';

export const componentGroups = [
    {
        id: 'components',
        heading: 'Components',
        items: categories.components
    },
    {
        id: 'blocks',
        heading: 'Blocks',
        items: categories.blocks
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
    if (name === 'otp-field') {
        return 'OTP Field';
    }

    if (name === 'composer') {
        return 'Composer';
    }

    return name
        .split('-')
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
};

export const navigationGroups = [
    ...componentGroups,
    { id: 'actions', heading: 'Actions', items: ['morph', 'number-shuffle', 'shimmer'] }
];

export const componentTypes = [
    {
        id: 'native-controls',
        heading: 'Native controls',
        description: 'Buttons, text fields, and selects built around native form elements.',
        items: ['button', 'input', 'native-select', 'textarea']
    },
    {
        id: 'inputs',
        heading: 'Inputs',
        description: 'Selection, numeric, file, and structured inputs.',
        items: [
            'checkbox',
            'combobox',
            'file-upload',
            'number-field',
            'otp-field',
            'radio-group',
            'select',
            'slider',
            'switch',
            'tag-input',
            'toggle',
            'toggle-group'
        ]
    },
    {
        id: 'forms',
        heading: 'Forms',
        description: 'Labels, field groups, validation, and form composition.',
        items: ['field', 'fieldset', 'form', 'label']
    },
    {
        id: 'dates',
        heading: 'Dates',
        description: 'Calendars and date selection for single dates and ranges.',
        items: ['calendar', 'date-picker', 'date-range-picker', 'range-calendar']
    },
    {
        id: 'navigation',
        heading: 'Navigation',
        description: 'Breadcrumbs, pagination, and tabbed views.',
        items: ['breadcrumb', 'pagination', 'tabs']
    },
    {
        id: 'overlays',
        heading: 'Overlays',
        description: 'Dialogs, menus, panels, and contextual information.',
        items: [
            'alert-dialog',
            'context-menu',
            'dialog',
            'drawer',
            'dropdown-menu',
            'hover-card',
            'popover',
            'sheet',
            'tooltip'
        ]
    },
    {
        id: 'layout',
        heading: 'Layout',
        description: 'Surfaces, disclosure, grouping, scrolling, and tabular layout.',
        items: ['accordion', 'card', 'collapsible', 'group', 'scroll-area', 'separator', 'table']
    },
    {
        id: 'status-and-content',
        heading: 'Status and content',
        description: 'Status messages, progress, identity, and text.',
        items: [
            'alert',
            'avatar',
            'badge',
            'empty-state',
            'kbd',
            'progress',
            'skeleton',
            'spinner',
            'typography'
        ]
    }
];

export function componentTypeHref(id: string) {
    return `/docs/components/${id}`;
}
