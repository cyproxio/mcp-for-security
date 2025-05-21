import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";
import { spawn } from 'child_process';

const args = process.argv.slice(2);
if (args.length === 0) {
    console.error("Usage: smuggler-mcp [smuggler.py path]");
    process.exit(1);
}

const server = new McpServer({
    name: "smuggler",
    version: "1.0.0",
});

server.tool(
    "do-smuggler",
    "Run Smuggler to detect HTTP Request Smuggling vulnerabilities",
    {
        url: z.string().url().describe("Target URL to detect HTTP Request Smuggling"),
        smuggler_args: z.array(z.string()).optional().describe(`Additional smuggler arguments
        -m, --method METHOD  Specify the HTTP method to use (default: POST)
        -v, --vhost VHOST    Specify a virtual host to use
        -l, --len            Enable Content-Length header in all requests
        -c, --configfile FILE
                             Specify a configuration file to load payloads from
        -x                   Exit on the first finding
        -t, --timeout TIMEOUT
                             Socket timeout value (default: 5)
        -verify VERIFY       Verify findings with more requests; never, quick or thorough (default: quick)`)
    },
    async ({ url, smuggler_args = [] }) => {
        const baseArgs = [args[0], "-u", url];
        const allArgs = [...baseArgs, ...smuggler_args];
        let output = '';

        const smuggler = spawn('python3', allArgs);

        smuggler.stdout.on('data', (data) => {
            output += data.toString();
        });

        smuggler.stderr.on('data', (data) => {
            output += data.toString();
        });

        return new Promise((resolve, reject) => {
            smuggler.on('close', (code) => {
                if (code === 0) {
                    output = removeAnsiCodes(output);
                    const vulnResults = parseResults(output);
                    
                    resolve({
                        content: [{
                            type: "text",
                            text: output
                        }],
                        metadata: {
                            findings: vulnResults
                        }
                    });
                } else {
                    reject(new Error(`Smuggler exited with code ${code}`));
                }
            });
            
            smuggler.on('error', (error) => {
                reject(new Error(`Failed to start Smuggler: ${error.message}`));
            });
        });
    },
);

function removeAnsiCodes(input: string): string {
    return input.replace(/\x1B\[[0-9;]*[mGK]/g, '');
}

interface VulnEntry {
    mutation: string;
    severity: string;
}

function parseResults(output: string): any {
    const vulnerabilities: {
        cl_te: VulnEntry[];
        te_cl: VulnEntry[];
    } = {
        cl_te: [],
        te_cl: []
    };

    const clteRegex = /\[(\+|\!)\] Potential (CL\.TE) Vulnerability Found \((\w+)\)/gi;
    const teclRegex = /\[(\+|\!)\] Potential (TE\.CL) Vulnerability Found \((\w+)\)/gi;

    let match;
    while ((match = clteRegex.exec(output)) !== null) {
        vulnerabilities.cl_te.push({
            mutation: match[3],
            severity: match[1] === '+' ? 'high' : 'medium'
        });
    }

    while ((match = teclRegex.exec(output)) !== null) {
        vulnerabilities.te_cl.push({
            mutation: match[3],
            severity: match[1] === '+' ? 'high' : 'medium'
        });
    }

    return vulnerabilities;
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