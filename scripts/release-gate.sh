#!/usr/bin/env bash

set -u

root="$(cd "$(dirname "$0")/.." && pwd)"
cd "$root" || exit 1

fail=0
step=0

run() {
	step=$((step + 1))
	local label=$1
	shift

	echo
	echo "════════════════════════════════════════════════════════════"
	echo "Gate ${step}: ${label}"
	echo "Command: $*"
	echo "════════════════════════════════════════════════════════════"

	if "$@"; then
		echo "PASSED: ${label}"
		return 0
	fi

	echo "FAILED: ${label}"
	fail=1
	return 1
}

run "format" pnpm run format:check
run "lint" pnpm run lint
run "audit" pnpm run audit
run "typecheck" pnpm run check
run "unit/ssr tests" pnpm run test
run "browser tests" pnpm --dir=apps/docs run test:browser
run "build" pnpm run build
run "packed consumer artifact" pnpm --dir=packages/mielui run verify:artifact
run "CLI artifact" pnpm --dir=packages/mielui run verify:cli-artifact

echo
if [ "$fail" -ne 0 ]; then
	echo "Release gate FAILED. Fix every failing step before publishing."
	exit 1
fi

echo "Release gate PASSED. All ${step} steps succeeded."
exit 0
