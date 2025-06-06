"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mcp_js_1 = require("@modelcontextprotocol/sdk/server/mcp.js");
const stdio_js_1 = require("@modelcontextprotocol/sdk/server/stdio.js");
const zod_1 = require("zod");
const pty = require('node-pty');
const args = process.argv.slice(2);
if (args.length === 0) {
    console.error("Usage: katana-mcp <katana binary>");
    process.exit(1);
}
// Create server instance
const server = new mcp_js_1.McpServer({
    name: "katana",
    version: "1.0.0",
});
server.tool("do-katana", "Performs fast and configurable web crawling on the given target URLs, identifying endpoints, parameters, and JS-based links.", {
    target: zod_1.z.array(zod_1.z.string()).describe("List of target URLs (e.g., https://example.com) to scan for endpoints and JavaScript-based links."),
    exclude: zod_1.z.array(zod_1.z.string()).optional().describe("List of URLs or regex patterns to exclude from crawling."),
    depth: zod_1.z.number().optional().describe("Maximum crawl depth (e.g., 3 for three levels deep)."),
    js_crawl: zod_1.z.boolean().optional().describe("Enable crawling and endpoint extraction from JavaScript files."),
    jsluice: zod_1.z.boolean().optional().describe("Enable JSluice parsing for deeper JavaScript-based link analysis (memory intensive)."),
    headers: zod_1.z.array(zod_1.z.string()).optional().describe("List of custom headers or cookies to include in requests (format: Header:Value)."),
    strategy: zod_1.z.enum(["depth-first", "breadth-first"]).optional().describe("Crawling strategy to use: 'depth-first' or 'breadth-first' (default is depth-first)."),
    headless: zod_1.z.boolean().optional().describe("Enable headless browser-based hybrid crawling (experimental)."),
    system_chrome: zod_1.z.boolean().optional().describe("Use the locally installed Chrome browser instead of the built-in one."),
    show_brwoser: zod_1.z.boolean().optional().describe("Show the browser window even in headless mode (for debugging/visual inspection)."),
}, async ({ target, exclude, depth, js_crawl, jsluice, headers, strategy, headless, system_chrome, show_brwoser }) => {
    const katanaArgs = ["-u", target.join(","), "-silent"];
    if (exclude && exclude.length > 0) {
        katanaArgs.push("-exclude", exclude.join(","));
    }
    if (depth !== undefined) {
        katanaArgs.push("-d", depth.toString());
    }
    if (js_crawl) {
        katanaArgs.push("-jc");
    }
    if (jsluice) {
        katanaArgs.push("-jsl");
    }
    if (headers && headers.length > 0) {
        headers.forEach(header => katanaArgs.push("-H", header));
    }
    if (strategy) {
        katanaArgs.push("-strategy", strategy);
    }
    if (headless) {
        katanaArgs.push("-headless");
    }
    if (system_chrome) {
        katanaArgs.push("-system-chrome");
    }
    if (show_brwoser) {
        katanaArgs.push("-show-browser");
    }
    let output = "";
    const katana = pty.spawn(args[0], katanaArgs, {
        name: 'xterm-color',
        cols: 80,
        rows: 30,
        cwd: process.cwd(),
        env: process.env
    });
    katana.on('data', function (data) {
        output += data.toString();
    });
    // Handle process completion
    return new Promise((resolve, reject) => {
        katana.on('close', function (code) {
            if (code === 0 || typeof code === "undefined") {
                output = removeAnsiCodes(output);
                const resolveData = {
                    content: [{
                            type: "text",
                            text: output
                        }]
                };
                resolve(resolveData);
            }
            else {
                reject(new Error(`katana exited with code ${code}`));
            }
        });
        katana.on('error', function (error) {
            if (typeof error.cause !== "undefined") {
                reject(new Error(`Error to start katana: ${error.cause}`));
            }
        });
    });
});
function removeAnsiCodes(input) {
    return input.replace(/\x1B\[[0-9;]*m/g, '');
}
// Start the server
async function main() {
    const transport = new stdio_js_1.StdioServerTransport();
    await server.connect(transport);
    console.error("katana MCP Server running on stdio");
}
main().catch((error) => {
    console.error("Fatal error in main():", error);
    process.exit(1);
});
