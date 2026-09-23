import { parseCssVar } from './css-variable';

export function parsePxLength(value: string, resolveVar: (name: string) => string): number {
    const rootSize =
        typeof document === 'undefined'
            ? 16
            : Number.parseFloat(getComputedStyle(document.documentElement).fontSize);
    const rem = Number.isFinite(rootSize) && rootSize > 0 ? rootSize : 16;
    const result = parseLength(value, resolveVar, new Set(), rem);
    return Number.isFinite(result) ? result : 0;
}

function parseLength(
    value: string,
    resolveVar: (name: string) => string,
    seen: Set<string>,
    rem: number
): number {
    let position = 0;

    function skipWhitespace() {
        while (/\s/.test(value[position] ?? '') && position < value.length) {
            position += 1;
        }
    }

    function atom(): number {
        skipWhitespace();
        const sign = value[position];
        if (sign === '+' || sign === '-') {
            position += 1;
            return (sign === '-' ? -1 : 1) * atom();
        }
        const start = position;
        const prefix = value.slice(position).match(/^(calc|var)\(/i)?.[0];
        if (prefix || value[position] === '(') {
            position += prefix?.length ?? 1;
            const innerStart = position;
            let depth = 1;
            while (position < value.length && depth > 0) {
                if (value[position] === '(') {
                    depth += 1;
                } else if (value[position] === ')') {
                    depth -= 1;
                }
                position += 1;
            }
            if (depth !== 0) {
                return Number.NaN;
            }
            if (prefix?.toLowerCase() === 'var(') {
                const variable = parseCssVar(value.slice(start, position));
                if (!variable) {
                    return Number.NaN;
                }
                const fallback = () => {
                    return variable.fallback
                        ? parseLength(variable.fallback, resolveVar, seen, rem)
                        : 0;
                };
                if (seen.has(variable.name)) {
                    return fallback();
                }
                const resolved = resolveVar(variable.name).trim();
                return resolved
                    ? parseLength(resolved, resolveVar, new Set(seen).add(variable.name), rem)
                    : fallback();
            }
            return parseLength(value.slice(innerStart, position - 1), resolveVar, seen, rem);
        }
        const number = value.slice(position).match(/^(?:\d+\.?\d*|\.\d+)(?:e[+-]?\d+)?/i)?.[0];
        if (!number) {
            return Number.NaN;
        }
        position += number.length;
        const unit = value.slice(position).match(/^[a-z%]+/i)?.[0] ?? '';
        position += unit.length;
        if (unit.toLowerCase() === 'rem') {
            return Number(number) * rem;
        }
        return unit === '' || unit.toLowerCase() === 'px' ? Number(number) : Number.NaN;
    }

    function product(): number {
        let result = atom();
        while (true) {
            skipWhitespace();
            const operator = value[position];
            if (operator !== '*' && operator !== '/') {
                return result;
            }
            position += 1;
            const right = atom();
            result = operator === '*' ? result * right : result / right;
        }
    }

    function sum(): number {
        let result = product();
        while (true) {
            skipWhitespace();
            const operator = value[position];
            if (operator !== '+' && operator !== '-') {
                return result;
            }
            position += 1;
            const right = product();
            result = operator === '+' ? result + right : result - right;
        }
    }

    const result = sum();
    skipWhitespace();
    return position === value.length ? result : Number.NaN;
}
