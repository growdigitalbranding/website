#!/usr/bin/env bash
#
# Run this ON THE SERVER, from the app directory.
#
#     bash scripts/deploy.sh
#
# Then restart the Node app in hPanel. The restart is the one step this
# script cannot do for you: `next start` serves the build it loaded at boot,
# so a rebuild underneath a running process changes nothing until the process
# comes back.
#
# Encodes the failure modes this deploy has actually hit rather than assuming
# the happy path.

set -euo pipefail

say() { printf '\n=== %s\n' "$1"; }
die() { printf '\nSTOPPED: %s\n' "$1" >&2; exit 1; }

[ -f package.json ] || die "no package.json here. cd to the app directory first."

say "Where we are"
pwd
git rev-parse --abbrev-ref HEAD 2>/dev/null || die "not a git checkout."
echo "currently built from: $(git rev-parse --short HEAD)"

say "Checking for local changes"
if ! git diff --quiet || ! git diff --cached --quiet; then
  git status --short
  die "the working tree has local changes, so a pull would conflict. Commit or discard them, then re-run."
fi

say "Pulling"
BRANCH=$(git rev-parse --abbrev-ref HEAD)
[ "$BRANCH" = "main" ] || echo "NOTE: on branch '$BRANCH', not main."
git pull --ff-only origin "$BRANCH" || die "pull failed. Resolve it, then re-run."
echo "now at: $(git rev-parse --short HEAD)"

say "Installing dependencies"
# --include=dev matters: the build needs typescript and tailwind, and hosts
# commonly set NODE_ENV=production, which would otherwise skip them and fail
# the build with a confusing missing-module error.
npm ci --include=dev || die "npm ci failed."

say "Building"
# Shared plans run out of memory here before they run out of anything else.
NODE_OPTIONS="--max-old-space-size=2048" npm run build || die "build failed. Scroll up for the first error; everything after it is noise."

say "Built"
echo "commit:   $(git rev-parse HEAD)"
echo
echo "NOT LIVE YET. Restart the Node app in hPanel now."
echo "Then confirm with:  npm run verify"
