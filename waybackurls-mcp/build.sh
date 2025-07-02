#!/bin/bash

set -e

npm install >/dev/null
npm run build >/dev/null 

go install github.com/tomnomnom/waybackurls@latest

WAYBACK_BIN=$(which waybackurls)
[ -x "$WAYBACK_BIN" ] || exit 1

SERVICE_PATH=$(pwd)
INDEX_PATH="$SERVICE_PATH/build/index.js"
COMMAND_NAME=$(basename "$SERVICE_PATH")
CONFIG_FILE="$SERVICE_PATH/../mcp-config.json"

[ -f "$CONFIG_FILE" ] || echo "{}" > "$CONFIG_FILE"

jq --arg cmd "$COMMAND_NAME" \
   --arg index_path "$INDEX_PATH" \
   --arg bin_name "waybackurls" \
   '.[$cmd] = { "command": "node", "args": [$index_path, $bin_name] }' \
   "$CONFIG_FILE" > "$CONFIG_FILE.tmp" && mv "$CONFIG_FILE.tmp" "$CONFIG_FILE"