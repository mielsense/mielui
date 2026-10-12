import { capitalize } from '$lib/text';

export const BUTTON_VARIANTS = [
    'primary',
    'secondary',
    'outline',
    'ghost',
    'destructive',
    'glow',
    'panel',
    'quiet'
] as const;

export const CONTROL_SIZES = ['sm', 'md', 'lg'] as const;

export const PLACEMENTS = [
    'top',
    'top-start',
    'top-end',
    'bottom',
    'bottom-start',
    'bottom-end',
    'left',
    'left-start',
    'left-end',
    'right',
    'right-start',
    'right-end'
] as const;

const SIZE_LABELS: Record<string, string> = {
    xs: 'Extra small',
    sm: 'Small',
    md: 'Medium',
    lg: 'Large',
    xl: 'Extra large'
};

const LOCALE = /^[a-z]{2}-[A-Z]{2}$/;

/** Turns an option value into its menu label: `sm` reads "Small", `top-start` reads "Top start". */
export function optionLabel(value: string): string {
    if (LOCALE.test(value)) {
        return value;
    }

    const words = SIZE_LABELS[value] ?? value.replaceAll('-', ' ');

    return capitalize(words);
}
