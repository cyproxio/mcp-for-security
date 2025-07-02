#!/bin/bash

set -e

npm install >/dev/null 
npm run build >/dev/null 

go install github.com/owasp-amass/amass/v4/...@latest

SERVICE_PATH=$(pwd)
INDEX_PATH="$SERVICE_PATH/build/index.js"
AMASS_PATH=$(which amass)
COMMAND_NAME=$(basename "$SERVICE_PATH")
CONFIG_FILE="$SERVICE_PATH/../mcp-config.json"

[ -f "$CONFIG_FILE" ] || echo "{}" > "$CONFIG_FILE"

jq --arg cmd "$COMMAND_NAME" \
   --arg node_path "$INDEX_PATH" \
   --arg amass_path "$AMASS_PATH" \
   '.[$cmd] = { "command": "node", "args": [$node_path, $amass_path] }' \
   "$CONFIG_FILE" > "$CONFIG_FILE.tmp" && mv "$CONFIG_FILE.tmp" "$CONFIG_FILE"