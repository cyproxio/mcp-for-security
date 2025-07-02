#!/bin/bash

set -e

npm install >/dev/null 
npm run build >/dev/null 

# Ensure wpscan is installed
[ -x "$(which wpscan)" ] || gem install wpscan >/dev/null 

SERVICE_PATH=$(pwd)
INDEX_PATH="$SERVICE_PATH/build/index.js"
COMMAND_NAME=$(basename "$SERVICE_PATH")
CONFIG_FILE="$SERVICE_PATH/../mcp-config.json"

[ -f "$CONFIG_FILE" ] || echo "{}" > "$CONFIG_FILE"

jq --arg cmd "$COMMAND_NAME" \
   --arg index_path "$INDEX_PATH" \
   --arg bin_name "wpscan" \
   '.[$cmd] = { "command": "node", "args": [$index_path, $bin_name] }' \
   "$CONFIG_FILE" > "$CONFIG_FILE.tmp" && mv "$CONFIG_FILE.tmp" "$CONFIG_FILE"