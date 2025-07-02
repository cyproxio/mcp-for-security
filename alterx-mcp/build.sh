#!/bin/bash

set -e

npm install && npm run build

go install github.com/projectdiscovery/alterx/cmd/alterx@latest

# Get absolute path to this directory and index.js
SERVICE_PATH=$(pwd)
INDEX_PATH="$SERVICE_PATH/build/index.js"

# Get full path to the 'alterx' binary
ALTERX_PATH=$(which alterx)

# Set dynamic command name (folder name is a good default)
COMMAND_NAME=$(basename "$SERVICE_PATH")

# Output config file
CONFIG_FILE="$SERVICE_PATH/../mcp-config.json"

# Ensure mcp-config.json exists (if not, initialize it)
if [ ! -f "$CONFIG_FILE" ]; then
    echo "{}" > "$CONFIG_FILE"
fi


jq --arg cmd "$COMMAND_NAME" \
   --arg node_path "$INDEX_PATH" \
   --arg alterx_path "$ALTERX_PATH" \
   '.[$cmd] = { "command": "node", "args": [$node_path, $alterx_path] }' \
   "$CONFIG_FILE" > "$CONFIG_FILE.tmp" && mv "$CONFIG_FILE.tmp" "$CONFIG_FILE"