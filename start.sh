#!/bin/bash

echo "[*] Starting all services..."

# Loop through all directories in the current folder
for dir in */ ; do
    # Remove trailing slash
    dir=${dir%/}

    # Skip if not a directory
    [ -d "$dir" ] || continue

    # Check if build.sh exists in the directory
    if [ -f "$dir/build.sh" ]; then
        echo "[+] Found build.sh in $dir, executing..."
        chmod +x "$dir/build.sh"
        (cd "$dir" && ./build.sh)
    else
        echo "[-] No build.sh found in $dir, skipping..."
    fi
done

jq 'with_entries(.value += {dockerContainer: ""})' mcp-config.json > mcp-config.tmp && mv mcp-config.tmp mcp-config.json

echo "[*] All build scripts executed. Container will now remain running."

cat mcp-config.json