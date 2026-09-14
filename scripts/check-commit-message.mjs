import { readFileSync } from 'node:fs';

const title = process.env.PR_TITLE ?? readFileSync(process.argv[2], 'utf8').split('\n')[0];
const conventional =
    /^(feat|fix|docs|style|refactor|perf|test|build|ci|chore|revert)\([a-z0-9][a-z0-9./-]*\)!?: \S.+$/;

if (!conventional.test(title)) {
    console.error('Use type(scope): description, for example fix(button): restore focus');
    process.exit(1);
}
