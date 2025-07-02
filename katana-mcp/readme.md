# Katana MCP

> Katana MCP is a bridge that connects Katana, a fast and customizable web crawler, with the Model Context Protocol (MCP) ecosystem.


## Overview

Katana MCP enables seamless integration of Katana’s advanced crawling and endpoint discovery capabilities into MCP-compatible applications and AI-powered systems. This allows automated workflows and AI assistants to perform deep reconnaissance, link extraction, and JavaScript parsing using a standardized interface.


## Features

- Integration with Katana for high-performance web crawling
- JavaScript endpoint parsing and JSluice support
- Configurable crawling strategies (depth-first or breadth-first)
- Headless browser-based crawling (experimental)
- Local Chrome integration support
- Custom header and cookie injection
- Easy integration with AI assistants or automated testing tools
- Standardized input/output handling through MCP

## Installation

### Prerequisites

- Node.js (v16 or higher)
- katana installed on your system
- MCP SDK

### Setup

1. Clone this repository:
   ```
   git clone https://github.com/cyproxio/mcp-for-security
   cd katana-mcp
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Build the project:
   ```
   npm install && npm run build
   ```

## Usage

### Basic Configuration

Configure the Katana MCP server in your MCP client configuration:

```json
{
  "katana": {
    "command": "node",
    "args": [
      "/path/to/katana-mcp/build/index.js",
      "katana"
    ]
  }
}
```

### Parameters
Katana MCP supports the following parameters:
- target (required): List of target URLs (e.g., https://example.com) to scan.
- exclude: URLs or patterns to exclude from crawling.
- depth: Maximum crawl depth.
- js_crawl: Enable endpoint parsing from JavaScript files.
- jsluice: Enable memory-intensive JSluice parsing.
- headers: List of custom headers/cookies in Header:Value format.
- strategy: Crawling strategy (depth-first or breadth-first). Default: depth-first.
- headless: Enable headless hybrid crawling using a browser (experimental).
- system_chrome: Use system-installed Chrome instead of bundled version.
- show_brwoser: Show the browser window even when headless mode is active.

## Examples

### Basic Crawl on a Single Target

```javascript
const result = await mcp.tools.invoke("katana", {
  target: ["https://example.com"]
});
```

### Crawl with JavaScript Parsing and Depth

```javascript
const result = await mcp.tools.invoke("katana", {
  target: ["https://example.com"],
  depth: 3,
  js_crawl: true
});
```


### Headless Browser Crawling with Custom Headers

```javascript
const result = await mcp.tools.invoke("katana", {
  target: ["https://example.com"],
  headless: true,
  headers: ["Authorization: Bearer TOKEN", "Cookie: session=abcd1234"]
});
```


## Integration with AI Assistants
Katana MCP is optimized for use with AI assistants that support the Model Context Protocol. This enables natural language-driven reconnaissance and crawling tasks.

Example conversation with an AI assistant:

```
User: Crawl https://example.com and extract all endpoints.
AI: Starting a deep crawl on https://example.com using Katana...

[AI uses Katana MCP and returns the results]

I found the following endpoints:
- /api/user
- /assets/js/app.js
- /admin/dashboard
...

Would you like to analyze the JavaScript files for hidden endpoints?
```

## Security Considerations

- Use only on systems you are authorized to scan.
- Crawling can be intensive and may be flagged as suspicious — adjust rate, depth, and headers appropriately.
- Use responsibly and in compliance with legal and ethical standards.

## Troubleshooting

If you encounter issues:

1.	Ensure Katana is installed and accessible from your terminal.
2.	Check that the command path in your MCP config points to the correct build file.
3.	Validate all required parameters are passed.
4.	Review logs for execution errors.

## Acknowledgments

- Katana Project: https://github.com/projectdiscovery/katana
- Model Context Protocol: https://github.com/modelcontextprotocol