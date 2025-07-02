"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mcp_js_1 = require("@modelcontextprotocol/sdk/server/mcp.js");
const stdio_js_1 = require("@modelcontextprotocol/sdk/server/stdio.js");
const zod_1 = require("zod");
const child_process_1 = require("child_process");
const args = process.argv.slice(2);
if (args.length === 0) {
    console.error("Usage: waybackurls-mcp <waybackurls binary>");
    process.exit(1);
}
// Create server instance
const server = new mcp_js_1.McpServer({
    name: "waybackurls",
    version: "1.0.0",
});
server.tool("do-waybackurls", "Execute Waybackurls, a tool that fetches known URLs from the Wayback Machine archive for a given domain. This helps in discovering historical endpoints, forgotten API paths, and potentially vulnerable URLs that might not be directly accessible or linked from the current version of the website.", {
    target: zod_1.z.string().url().describe("Target domain to retrieve historical URLs from the Wayback Machine (e.g., example.com)"),
    noSub: zod_1.z.boolean().nullable().describe("When set to true, only retrieves URLs from the exact domain specified, excluding all subdomains"),
}, async ({ target, noSub }) => {
    const waybackurls = (0, child_process_1.spawn)(args[0], [target, ...(noSub ? ['--no-subs'] : [])]);
    let output = '';
    // Handle stdout
    waybackurls.stdout.on('data', (data) => {
        output += data.toString();
    });
    // Handle stderr
    waybackurls.stderr.on('data', (data) => {
        output += data.toString();
    });
    // Handle process completion
    return new Promise((resolve, reject) => {
        waybackurls.on('close', (code) => {
            if (code === 0) {
                resolve({
                    content: [{
                            type: "text",
                            text: output + "\n waybackurls completed successfully"
                        }]
                });
            }
            else {
                reject(new Error(`waybackurls exited with code ${code}`));
            }
        });
        waybackurls.on('error', (error) => {
            reject(new Error(`Failed to start waybackurls: ${error.message}`));
        });
    });
});
// Start the server
async function main() {
    const transport = new stdio_js_1.StdioServerTransport();
    await server.connect(transport);
    console.error("waybackurls MCP Server running on stdio");
}
main().catch((error) => {
    console.error("Fatal error in main():", error);
    process.exit(1);
});
