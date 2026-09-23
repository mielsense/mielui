import { invalid } from '@sveltejs/kit';
import * as v from 'valibot';
import { form } from '$app/server';

export const validateProfile = form(
    v.object({
        username: v.pipe(
            v.string(),
            v.trim(),
            v.minLength(3, 'Use at least 3 characters.'),
            v.maxLength(40, 'Use at most 40 characters.')
        ),
        email: v.pipe(v.string(), v.email('Enter a valid email address.')),
        intent: v.picklist(['validate', 'validate-reset'])
    }),
    async ({ username, intent }, issue) => {
        await new Promise((resolve) => setTimeout(resolve, 350));
        if (username.toLowerCase() === 'admin') {
            invalid(issue.username('This username is reserved. Choose another one.'));
        }
        if (username.toLowerCase() === 'system') {
            invalid('This profile cannot be validated right now. Choose another demo username.');
        }
        return { username, intent };
    }
);
