import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";
import { spawn } from 'child_process';

const args = process.argv.slice(2);
if (args.length !== 2) {
    console.error("Usage: commix-mcp [python path] [commix.py path]");
    process.exit(1);
}

const server = new McpServer({
    name: "commix",
    version: "1.0.0",
});

server.tool(
    "do-commix",
    "Run Smuggler to detect HTTP Request Smuggling vulnerabilities",
    {
        url: z.string().url().describe("Target URL to detect HTTP Request Smuggling")
    },
    async ({ url }) => {
        const baseArgs = [args[1],"-u", url];
        const allArgs = [...baseArgs, url];
        let output = '';

        const commix = spawn(args[0],allArgs);

        commix.stdout.on('data', (data) => {
            output += data.toString();
        });

        commix.stderr.on('data', (data) => {
            output += data.toString();
        });

        return new Promise((resolve, reject) => {
            commix.on('close', (code) => {
                if (code === 0) {
                    output = removeAnsiCodes(output);
                    
                    resolve({
                        content: [{
                            type: "text",
                            text: output
                        }]
                    });
                } else {
                    reject(new Error(`commix exited with code ${code}`));
                }
            });
            
            commix.on('error', (error) => {
                reject(new Error(`Failed to start commix: ${error.message}`));
            });
        });
    },
);

function removeAnsiCodes(input: string): string {
    return input.replace(/\x1B\[[0-9;]*[mGK]/g, '');
}

async function main() {
    const transport = new StdioServerTransport();
    await server.connect(transport);
    console.error("Smuggler MCP Server running on stdio");
}

main().catch((error) => {
    console.error("Fatal error in main():", error);
    process.exit(1);
}); 