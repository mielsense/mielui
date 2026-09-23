import { animationTokenDefinitions } from './studio-advanced-tokens/animation';
import { colorTokenDefinitions } from './studio-advanced-tokens/colors';
import { groupTokens } from './studio-advanced-tokens/groups';
import { spacingTokenDefinitions } from './studio-advanced-tokens/spacing';

export * from './studio-advanced-tokens/animation';
export * from './studio-advanced-tokens/colors';
export * from './studio-advanced-tokens/css-color';
export * from './studio-advanced-tokens/css-length';
export * from './studio-advanced-tokens/format';
export * from './studio-advanced-tokens/groups';
export * from './studio-advanced-tokens/spacing';

export const colorTokenGroups = groupTokens(colorTokenDefinitions);
export const spacingTokenGroups = groupTokens(spacingTokenDefinitions);
export const animationTokenGroups = groupTokens(animationTokenDefinitions);
