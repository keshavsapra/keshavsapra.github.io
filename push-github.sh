#!/usr/bin/env bash
# Sync this folder to the GitHub Pages repo and push.
# Usage: ./push-github.sh "optional commit message"
set -euo pipefail

SRC="$(cd "$(dirname "$0")" && pwd)"
DEST="$SRC/clone_kio"
REMOTE="https://github.com/keshavsapra/keshavsapra.github.io.git"

[ -d "$DEST/.git" ] || {
  echo "Cloning pages repo..."
  git clone --depth 1 "$REMOTE" "$DEST"
}

# Sync site files (site only, keep this folder's extra docs out of the repo)
rsync -av --delete \
  --exclude '.git/' \
  --exclude 'clone_kio/' \
  --exclude 'DEPLOY.md' \
  --exclude 'nginx.conf.example' \
  "$SRC/" "$DEST/"

cd "$DEST"
if [ -z "$(git status --porcelain -- . ':!README.md')" ]; then
  echo "Nothing changed, skipping push."
else
  git add -A
  git commit -m "${1:-Update site}"
  git push origin main
  echo "Pushed. Watch the build: gh api repos/keshavsapra/keshavsapra.github.io/pages/builds/latest --jq .status"
fi
