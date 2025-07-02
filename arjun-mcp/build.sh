#!/bin/bash

set -e

npm install >/dev/null 2>&1
npm run build >/dev/null 2>&1

# Activate shared venv (defined in Dockerfile)
source /opt/venv/bin/activate

pip install arjun >/dev/null 

SERVICE_PATH=$(pwd)
INDEX_PATH="$SERVICE_PATH/build/index.js"
ARJUN_PATH=$(which arjun)
COMMAND_NAME=$(basename "$SERVICE_PATH")
CONFIG_FILE="$SERVICE_PATH/../mcp-config.json"

[ -f "$CONFIG_FILE" ] || echo "{}" > "$CONFIG_FILE"

jq --arg cmd "$COMMAND_NAME" \
   --arg node_path "$INDEX_PATH" \
   --arg arjun_path "$ARJUN_PATH" \
   '.[$cmd] = { "command": "node", "args": [$node_path, $arjun_path] }' \
   "$CONFIG_FILE" > "$CONFIG_FILE.tmp" && mv "$CONFIG_FILE.tmp" "$CONFIG_FILE"