import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";
import { spawn } from 'child_process';

const args = process.argv.slice(2);
if (args.length === 0) {
    console.error("Usage: wpscan-mcp <wpscan binary>");
    process.exit(1);
}

// Create server instance
const server = new McpServer({
    name: "wpscan",
    version: "1.0.0",
});

server.tool(
    "do-wpscan",
    "Run wpscan to analyze wordpress web sites",
    {
        url: z.string().url().describe("The target WordPress website URL to scan. Must be a valid URL starting with http:// or https://"),
        detection_mode: z.enum(["mixed", "passive", "aggressive"]).optional().describe("Scan detection mode: 'mixed' (default) combines passive and aggressive, 'passive' for non-intrusive scanning, 'aggressive' for thorough but potentially detectable scanning"),
        random_user_agent: z.boolean().optional().describe("Enable random user agent rotation for each request to avoid detection"),
        max_threads: z.number().optional().describe("Maximum number of concurrent scanning threads. Default is 5. Higher values increase speed but may trigger rate limiting"),
        disable_tls_checks: z.boolean().optional().describe("Disable SSL/TLS certificate verification and allow TLS 1.0+ connections. Requires cURL 7.66 or higher for TLS downgrade support"),
        proxy: z.string().optional().describe("Proxy server to route requests through. Format: protocol://IP:port (e.g., http://127.0.0.1:8080). Supported protocols depend on installed cURL version"),
        cookies: z.string().optional().describe("Custom cookies to include in requests. Format: name1=value1; name2=value2. Useful for authenticated scanning"),
        force: z.boolean().optional().describe("Skip WordPress detection and 403 response checks. Use when you're certain the target is WordPress"),
        enumerate: z.array(z.enum(["vp", "ap", "p", "vt", "at", "t", "tt", "cb", "dbe"])).describe(`
            WordPress enumeration options:
            - vp: Scan for vulnerable plugins
            - ap: Scan all installed plugins
            - p:  Scan only popular plugins
            - vt: Scan for vulnerable themes
            - at: Scan all installed themes
            - t:  Scan only popular themes
            - tt: Scan for timthumb vulnerabilities
            - cb: Scan for configuration backups
            - dbe: Scan for database exports

            Note: Some options are mutually exclusive:
            - Only one of vp, ap, p can be used
            - Only one of vt, at, t can be used

            Default behavior if not specified: vp,vt,tt,cb,dbe,u,m
            `),
    },
    async ({ url,detection_mode,random_user_agent,max_threads,disable_tls_checks,proxy,cookies,force,enumerate }) => {
        const wpscanArgs = ['-u', url];

        // Add detection mode if specified
        if (detection_mode) {
            wpscanArgs.push('--detection-mode', detection_mode);
        }

        // Add random user agent if specified
        if (random_user_agent) {
            wpscanArgs.push('--random-user-agent');
        }

        // Add max threads if specified
        if (max_threads) {
            wpscanArgs.push('-t', max_threads.toString());
        }

        // Add disable TLS checks if specified
        if (disable_tls_checks) {
            wpscanArgs.push('--disable-tls-checks');
        }

        // Add proxy if specified
        if (proxy) {
            wpscanArgs.push('--proxy', proxy);
        }

        // Add cookies if specified
        if (cookies) {
            wpscanArgs.push('--cookie-string', cookies);
        }

        // Add force if specified
        if (force) {
            wpscanArgs.push('--force');
        }

        // Add enumerate options if specified
        if (enumerate && enumerate.length > 0) {
            wpscanArgs.push('-e', enumerate.join(','));
        }


        const wpscan = spawn(args[0], wpscanArgs);
        let output = '';

        // Handle stdout
        wpscan.stdout.on('data', (data) => {
            output += data.toString();
        });

        // Handle stderr
        wpscan.stderr.on('data', (data) => {
            output += data.toString();
        });

        // Handle process completion
        return new Promise((resolve, reject) => {
            wpscan.on('close', (code) => {
                if (code === 0) {
                    resolve({
                        content: [{
                            type: "text",
                            text: output + "\n wpscan completed successfully"
                        }]
                    });
                } else {
                    reject(new Error(`wpscan exited with code ${code}`));
                }
            });

            wpscan.on('error', (error) => {
                reject(new Error(`Failed to start wpscan: ${error.message}`));
            });
        });
    },
);

// Start the server
async function main() {
    const transport = new StdioServerTransport();
    await server.connect(transport);
    console.error("wpscan MCP Server running on stdio");
}

main().catch((error) => {
    console.error("Fatal error in main():", error);
    process.exit(1);
});