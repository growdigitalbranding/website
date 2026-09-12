#!/usr/bin/env bash
# Downloads real ad creatives from Meta's CDN into public/creatives/.
#
# Run this on your own machine, not in a Claude session: the session's egress
# policy blocks fbcdn.net, and these signed URLs expire within a few days of
# being issued, so fetch soon after the manifest is generated.
#
#   bash scripts/fetch-creatives.sh
#
# Then convert to WebP and the marquee picks them up on the next build:
#   node scripts/to-webp.mjs
set -euo pipefail

cd "$(dirname "$0")/.."
mkdir -p public/creatives
manifest="scripts/creatives.tsv"

[ -f "$manifest" ] || { echo "missing $manifest"; exit 1; }

n=0
# Columns: slot<TAB>image_hash<TAB>url
while IFS=$'\t' read -r slot hash url; do
  case "$slot" in ''|'#'*) continue ;; esac
  out="public/creatives/${slot}.jpg"
  if [ -f "$out" ]; then echo "skip $slot (exists)"; continue; fi
  if curl -fsS --max-time 60 -o "$out" "$url"; then
    echo "ok   $slot  $(du -h "$out" | cut -f1)"
    n=$((n+1))
  else
    rm -f "$out"
    echo "FAIL $slot  (URL likely expired: regenerate the manifest)" >&2
  fi
done < "$manifest"

echo
echo "$n creative(s) downloaded to public/creatives/"
