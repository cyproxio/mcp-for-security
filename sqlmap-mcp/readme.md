# SQLMap MCP

> SQLMap MCP is a bridge that connects SQLMap, the popular SQL injection detection and exploitation tool, with the Model Context Protocol (MCP) ecosystem.

## Overview

SQLMap MCP enables seamless integration of SQLMap's powerful SQL injection testing capabilities into MCP-compatible applications and AI-powered workflow systems. This bridge allows you to leverage SQLMap functionality through a standardized protocol, making it easier to incorporate into automated security testing pipelines or AI assistant capabilities.

## Features

- Full SQLMap functionality exposed through MCP
- Simple configuration and setup
- Easy integration with other MCP-compatible tools and systems
- Standardized input/output handling

## Installation

### Prerequisites

- Node.js (v16 or higher)
- SQLMap installed on your system
- MCP SDK

### Setup

1. Clone this repository:
   ```
   git clone https://github.com/cyproxio/mcp-for-security
   cd sqlmap-mcp
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

Configure the SQLMap MCP server in your MCP client configuration:

```json
{
  "sqlmap": {
    "command": "node",
    "args": [
      "/path/to/sqlmap-mcp/build/index.js",
      "sqlmap"
    ]
  }
}
```

### Running SQLMap Tests

Once configured, you can run SQLMap tests through the MCP interface using the `do-sqlmap` tool:

```javascript
// Example of calling SQLMap through MCP
const result = await mcp.tools.invoke("do-sqlmap", {
  url: "http://example.com/vulnerable.php?id=1",
  sqlmap_args: ["--batch", "--dbs"]
});
```

### Available Options

SQLMap MCP supports all standard SQLMap parameters.
See the [SQLMap documentation](https://github.com/sqlmapproject/sqlmap/wiki/Usage) for a full list of available options.

## Examples

### Basic Database Enumeration

```javascript
const result = await mcp.tools.invoke("do-sqlmap", {
  url: "http://vulnerable-website.com/page.php?id=1",
  sqlmap_args: ["--batch", "--dbs"]
});
```

### Targeted Table Dump

```javascript
const result = await mcp.tools.invoke("do-sqlmap", {
  url: "http://vulnerable-website.com/page.php?id=1",
  sqlmap_args: [
    "--batch",
    "-D", "target_database",
    "-T", "users",
    "--dump"
  ]
});
```

## Integration with AI Assistants

SQLMap MCP is designed to work seamlessly with AI assistants that support the Model Context Protocol, enabling natural language interactions for security testing tasks.

Example conversation with an AI assistant:

```
User: Test this website for SQL injection: http://testphp.vulnweb.com/artists.php?artist=1
AI: I'll help you test that website for SQL injection vulnerabilities using SQLMap.

[AI uses SQLMap MCP to run the test and returns the results]

SQLMap has detected a potential SQL injection vulnerability in the 'artist' parameter...
```

## Security Considerations

- Always obtain proper authorization before testing websites for vulnerabilities
- Use responsibly and ethically
- Consider using `--random-agent` and proxies for more discreet testing

## Troubleshooting

If you encounter issues:

1. Verify SQLMap is properly installed and accessible
2. Check the path to the SQLMap executable in your configuration
3. Ensure proper permissions are set for execution
4. Review server logs for detailed error messages

## Acknowledgments

- SQLMap Project: https://github.com/sqlmapproject/sqlmap
- Model Context Protocol: https://github.com/modelcontextprotocol