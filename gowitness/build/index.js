import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";
import { spawn } from "child_process";
import { readFile, access, readdir, writeFile, unlink, stat } from "fs/promises";
import { join } from "path";
// Get gowitness binary path
const args = process.argv.slice(2);
if (args.length === 0) {
    console.error("Usage: gowitness-mcp <gowitness binary>");
    process.exit(1);
}
const gowitnessPath = args[0];
// Create MCP Server
const server = new McpServer({
    name: "gowitness",
    version: "1.0.0",
});
// Tool: Enhanced 'screenshot' mode with binary return option
server.tool("gowitness-screenshot", "Capture screenshot of the given URL using gowitness scan single. Can save to directory or return as binary data.", {
    url: z.string().url().describe("URL to take a screenshot of"),
    chrome_window_x: z.number().optional().describe("Chrome browser window width in pixels (default 1920)"),
    chrome_window_y: z.number().optional().describe("Chrome browser window height in pixels (default 1080)"),
    screenshot_path: z.string().optional().describe("Path to store screenshots (default ./screenshots)"),
    return_binary: z.boolean().optional().describe("If true, return screenshot as binary array instead of saving"),
    timeout: z.number().optional().describe("Number of seconds before considering a page timed out (default 60)"),
    delay: z.number().optional().describe("Number of seconds delay between navigation and screenshotting (default 3)"),
    fullpage: z.boolean().optional().describe("Do full-page screenshots, instead of just the viewport"),
    format: z.enum(["jpeg", "png"]).optional().describe("Screenshot format (default jpeg)"),
    threads: z.number().optional().describe("Number of concurrent threads (default 6)"),
    write_db: z.boolean().optional().describe("Write results to SQLite database"),
    write_jsonl: z.boolean().optional().describe("Write results as JSON lines"),
    user_agent: z.string().optional().describe("Custom user-agent string")
}, async ({ url, chrome_window_x, chrome_window_y, screenshot_path, return_binary = false, timeout, delay, fullpage, format, threads, write_db, write_jsonl, user_agent }) => {
    const args = ["scan", "single", "--url", url];
    // Add gowitness-specific parameters
    if (chrome_window_x)
        args.push("--chrome-window-x", chrome_window_x.toString());
    if (chrome_window_y)
        args.push("--chrome-window-y", chrome_window_y.toString());
    if (screenshot_path)
        args.push("--screenshot-path", screenshot_path);
    if (timeout)
        args.push("--timeout", timeout.toString());
    if (delay)
        args.push("--delay", delay.toString());
    if (fullpage)
        args.push("--screenshot-fullpage");
    if (format)
        args.push("--screenshot-format", format);
    if (threads)
        args.push("--threads", threads.toString());
    if (write_db)
        args.push("--write-db");
    if (write_jsonl)
        args.push("--write-jsonl");
    if (user_agent)
        args.push("--chrome-user-agent", user_agent);
    // Add default writer to avoid warnings if none specified
    if (!write_db && !write_jsonl) {
        args.push("--write-none");
    }
    const proc = spawn(gowitnessPath, args);
    let output = "";
    proc.stdout.on("data", (data) => {
        output += data.toString();
    });
    proc.stderr.on("data", (data) => {
        output += data.toString();
    });
    return new Promise(async (resolve, reject) => {
        proc.on("close", async (code) => {
            if (code === 0) {
                if (return_binary) {
                    try {
                        // gowitness creates files in the screenshot path directory
                        const screenshotDir = screenshot_path || "./screenshots";
                        const files = await readdir(screenshotDir);
                        const screenshotFile = files.find(file => (file.endsWith('.jpeg') || file.endsWith('.png') || file.endsWith('.jpg')) &&
                            file.includes(getHostnameFromUrl(url)));
                        if (!screenshotFile) {
                            reject(new Error("Screenshot file not found after gowitness execution"));
                            return;
                        }
                        const screenshotPath = join(screenshotDir, screenshotFile);
                        // Read the binary data
                        const binaryData = await readFile(screenshotPath);
                        resolve({
                            content: [{
                                    type: "text",
                                    text: `Screenshot captured successfully. Binary data size: ${binaryData.length} bytes`
                                }],
                            // Include binary data as base64 encoded string for transport
                            binaryData: binaryData.toString('base64'),
                            metadata: {
                                filename: screenshotFile,
                                size: binaryData.length,
                                format: format || "jpeg",
                                url: url
                            }
                        });
                    }
                    catch (error) {
                        reject(new Error(`Failed to read screenshot file: ${error instanceof Error ? error.message : String(error)}`));
                    }
                }
                else {
                    resolve({
                        content: [{
                                type: "text",
                                text: output + "\nGowitness screenshot completed successfully" +
                                    (screenshot_path ? ` Screenshots saved to: ${screenshot_path}` : " Screenshots saved to: ./screenshots")
                            }]
                    });
                }
            }
            else {
                reject(new Error(`gowitness exited with code ${code}:\n${output}`));
            }
        });
        proc.on("error", (error) => {
            reject(new Error(`Failed to start gowitness: ${error.message}`));
        });
    });
});
// Tool: Enhanced 'report' mode
server.tool("gowitness-report", "Generate a report from gowitness screenshots and data", {
    screenshot_path: z.string().optional().describe("Path where gowitness stored screenshots"),
    db_uri: z.string().optional().describe("Database URI to generate report from (e.g., sqlite://gowitness.sqlite3)"),
    output_format: z.enum(["html", "csv", "json"]).optional().describe("Report output format"),
}, async ({ screenshot_path, db_uri, output_format = "html" }) => {
    const args = ["report"];
    if (screenshot_path)
        args.push("--screenshot-path", screenshot_path);
    if (db_uri)
        args.push("--write-db-uri", db_uri);
    // Note: gowitness report command may have different syntax
    // This is a basic implementation - you may need to adjust based on actual gowitness report options
    const proc = spawn(gowitnessPath, args);
    let output = "";
    proc.stdout.on("data", (data) => {
        output += data.toString();
    });
    proc.stderr.on("data", (data) => {
        output += data.toString();
    });
    return new Promise((resolve, reject) => {
        proc.on("close", (code) => {
            if (code === 0) {
                resolve({
                    content: [{
                            type: "text",
                            text: output + `\nGowitness report generated successfully`
                        }]
                });
            }
            else {
                reject(new Error(`gowitness exited with code ${code}:\n${output}`));
            }
        });
        proc.on("error", (error) => {
            reject(new Error(`Failed to start gowitness: ${error.message}`));
        });
    });
});
// Tool: Batch screenshot with file-based approach
server.tool("gowitness-batch-screenshot", "Capture screenshots of multiple URLs using gowitness scan file command", {
    urls: z.array(z.string().url()).describe("Array of URLs to screenshot"),
    screenshot_path: z.string().describe("Path to store screenshots"),
    chrome_window_x: z.number().optional().describe("Chrome browser window width in pixels"),
    chrome_window_y: z.number().optional().describe("Chrome browser window height in pixels"),
    timeout: z.number().optional().describe("Number of seconds before considering a page timed out"),
    delay: z.number().optional().describe("Number of seconds delay between navigation and screenshotting"),
    threads: z.number().optional().describe("Number of concurrent threads"),
    format: z.enum(["jpeg", "png"]).optional().describe("Screenshot format"),
    write_db: z.boolean().optional().describe("Write results to SQLite database"),
    write_jsonl: z.boolean().optional().describe("Write results as JSON lines")
}, async ({ urls, screenshot_path, chrome_window_x, chrome_window_y, timeout, delay, threads, format, write_db, write_jsonl }) => {
    // Create a temporary URLs file
    const urlsFile = join(screenshot_path, 'urls.txt');
    const urlsContent = urls.join('\n');
    try {
        // Write URLs to file
        await writeFile(urlsFile, urlsContent);
        const args = ["scan", "file", "-f", urlsFile];
        // Add gowitness parameters
        args.push("--screenshot-path", screenshot_path);
        if (chrome_window_x)
            args.push("--chrome-window-x", chrome_window_x.toString());
        if (chrome_window_y)
            args.push("--chrome-window-y", chrome_window_y.toString());
        if (timeout)
            args.push("--timeout", timeout.toString());
        if (delay)
            args.push("--delay", delay.toString());
        if (threads)
            args.push("--threads", threads.toString());
        if (format)
            args.push("--screenshot-format", format);
        if (write_db)
            args.push("--write-db");
        if (write_jsonl)
            args.push("--write-jsonl");
        // Add default writer to avoid warnings if none specified
        if (!write_db && !write_jsonl) {
            args.push("--write-none");
        }
        const proc = spawn(gowitnessPath, args);
        let output = "";
        proc.stdout.on("data", (data) => {
            output += data.toString();
        });
        proc.stderr.on("data", (data) => {
            output += data.toString();
        });
        return new Promise((resolve, reject) => {
            proc.on("close", async (code) => {
                // Clean up the temporary URLs file
                try {
                    await unlink(urlsFile);
                }
                catch (cleanupError) {
                    // Ignore cleanup errors
                }
                if (code === 0) {
                    resolve({
                        content: [{
                                type: "text",
                                text: `Batch screenshot completed for ${urls.length} URLs.\nOutput: ${output}\n\nScreenshots saved to: ${screenshot_path}`
                            }]
                    });
                }
                else {
                    reject(new Error(`gowitness exited with code ${code}:\n${output}`));
                }
            });
            proc.on("error", (error) => {
                reject(new Error(`Failed to start gowitness: ${error.message}`));
            });
        });
    }
    catch (error) {
        throw new Error(`Failed to create URLs file: ${error instanceof Error ? error.message : String(error)}`);
    }
});
// Tool: Read screenshot file as binary data
server.tool("gowitness-read-binary", "Read a screenshot file and return it as binary data", {
    file_path: z.string().describe("Path to the screenshot file to read"),
    screenshot_dir: z.string().optional().describe("Directory to search for screenshot files (if file_path is not absolute)"),
}, async ({ file_path, screenshot_dir }) => {
    try {
        let fullPath = file_path;
        // If it's not an absolute path, combine with screenshot_dir
        if (!file_path.includes('\\') && !file_path.includes('/') && screenshot_dir) {
            fullPath = join(screenshot_dir, file_path);
        }
        // Check if file exists
        await access(fullPath);
        // Read the binary data
        const binaryData = await readFile(fullPath);
        const stats = await stat(fullPath);
        return {
            content: [{
                    type: "text",
                    text: `File read successfully. Binary data size: ${binaryData.length} bytes`
                }],
            binaryData: binaryData.toString('base64'),
            metadata: {
                filename: file_path,
                size: binaryData.length,
                path: fullPath,
                lastModified: stats.mtime.toISOString()
            }
        };
    }
    catch (error) {
        throw new Error(`Failed to read file: ${error instanceof Error ? error.message : String(error)}`);
    }
});
// Tool: List screenshot files in directory
server.tool("gowitness-list-screenshots", "List all screenshot files in a directory", {
    screenshot_dir: z.string().optional().describe("Directory to search for screenshots (default: ./screenshots)"),
}, async ({ screenshot_dir = "./screenshots" }) => {
    try {
        await access(screenshot_dir);
        const files = await readdir(screenshot_dir);
        const imageFiles = files.filter(file => file.endsWith('.jpeg') || file.endsWith('.png') || file.endsWith('.jpg'));
        const fileDetails = await Promise.all(imageFiles.map(async (file) => {
            const filePath = join(screenshot_dir, file);
            const stats = await stat(filePath);
            return {
                filename: file,
                path: filePath,
                size: stats.size,
                created: stats.mtime.toISOString()
            };
        }));
        // Sort by creation time (newest first)
        fileDetails.sort((a, b) => new Date(b.created).getTime() - new Date(a.created).getTime());
        return {
            content: [{
                    type: "text",
                    text: `Found ${fileDetails.length} screenshot files in ${screenshot_dir}:\n` +
                        fileDetails.map(f => `• ${f.filename} (${f.size} bytes, ${f.created})`).join('\n')
                }],
            files: fileDetails
        };
    }
    catch (error) {
        throw new Error(`Failed to list screenshots: ${error instanceof Error ? error.message : String(error)}`);
    }
});
function getHostnameFromUrl(url) {
    try {
        const urlObj = new URL(url);
        return urlObj.hostname.replace(/[^a-zA-Z0-9]/g, '_');
    }
    catch {
        return 'unknown';
    }
}
// Start the server
async function main() {
    const transport = new StdioServerTransport();
    await server.connect(transport);
    console.error("Enhanced gowitness MCP Server running on stdio");
}
main().catch((err) => {
    console.error("Fatal error in main():", err);
    process.exit(1);
});
//# sourceMappingURL=index.js.map