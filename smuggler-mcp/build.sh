#!/bin/bash

set -e

npm install >/dev/null 
npm run build >/dev/null 

# Clone Smuggler if not already present
[ -d "/opt/smuggler" ] || git clone https://github.com/defparam/smuggler /opt/smuggler

PYTHON_PATH=$(which python3)
SMUGGLER_PATH="/opt/smuggler/smuggler.py"
SERVICE_PATH=$(pwd)
INDEX_PATH="$SERVICE_PATH/build/index.js"
COMMAND_NAME=$(basename "$SERVICE_PATH")
CONFIG_FILE="$SERVICE_PATH/../mcp-config.json"

[ -f "$SMUGGLER_PATH" ] || exit 1
[ -f "$CONFIG_FILE" ] || echo "{}" > "$CONFIG_FILE"

jq --arg cmd "$COMMAND_NAME" \
   --arg index_path "$INDEX_PATH" \
   --arg py_path "$PYTHON_PATH" \
   --arg smuggler_path "$SMUGGLER_PATH" \
   '.[$cmd] = { "command": "node", "args": [$index_path, $py_path, $smuggler_path] }' \
   "$CONFIG_FILE" > "$CONFIG_FILE.tmp" && mv "$CONFIG_FILE.tmp" "$CONFIG_FILE"