#!/bin/bash

set -e

npm install >/dev/null 
npm run build >/dev/null 

# Clone Smuggler if not already present
[ -d "/opt/commix" ] || git clone https://github.com/commixproject/commix.git /opt/commix

PYTHON_PATH=$(which python3)
COMMIX_PATH="/opt/commix/commix.py"
SERVICE_PATH=$(pwd)
INDEX_PATH="$SERVICE_PATH/build/index.js"
COMMAND_NAME=$(basename "$SERVICE_PATH")
CONFIG_FILE="$SERVICE_PATH/../mcp-config.json"
echo $COMMIX_PATH
[ -f "$COMMIX_PATH" ] || exit 1
[ -f "$CONFIG_FILE" ] || echo "{}" > "$CONFIG_FILE"


jq --arg cmd "$COMMAND_NAME" \
   --arg index_path "$INDEX_PATH" \
   --arg py_path "$PYTHON_PATH" \
   --arg commix_path "$COMMIX_PATH" \
   '.[$cmd] = { "command": "node", "args": [$index_path, $py_path, $commix_path] }' \
   "$CONFIG_FILE" > "$CONFIG_FILE.tmp" && mv "$CONFIG_FILE.tmp" "$CONFIG_FILE"