# Masscan MCP

> Masscan MCP is a bridge that connects Masscan, the ultra-fast port scanner, with the Model Context Protocol (MCP) ecosystem.

## Overview

Masscan MCP enables seamless integration of Masscan's high-speed network scanning capabilities into MCP-compatible applications and AI-powered workflow systems. This bridge allows you to leverage Masscan functionality through a standardized protocol, making it easier to incorporate into automated security testing pipelines or AI assistant capabilities.

## Features

- Full Masscan functionality exposed through MCP
- Simple configuration and setup
- Easy integration with other MCP-compatible tools and systems
- Standardized input/output handling

## Installation

### Prerequisites

- Node.js (v16 or higher)
- Masscan installed on your system
- MCP SDK

### Setup

1. Clone this repository:
 ```
 git clone https://github.com/cyproxio/mcp-for-security
 cd masscan-mcp
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

Configure the Masscan MCP server in your MCP client configuration:

```json
{
  "masscan": {
    "command": "node",
    "args": [
      "/path/to/masscan-mcp/build/index.js",
      "masscan"
    ]
  }
}
```

### Running Masscan

Once configured, you can run Masscan through the MCP interface using the `do-masscan` tool:

```javascript
// Example of calling Masscan through MCP
const result = await mcp.tools.invoke("do-masscan", {
  target: "192.168.1.0/24",
  port: "80,443,8080"
});
```

### Parameters

Masscan MCP currently supports two main parameters:

- `target`: IP address or range to scan (e.g., "192.168.1.1", "10.0.0.0/24")
- `port`: Port or port ranges to scan (e.g., "80", "22-25", "80,443,8080")

## Examples

### Scan a Single Host

```javascript
const result = await mcp.tools.invoke("do-masscan", {
  target: "192.168.1.1",
  port: "1-65535"
});
```

## Integration with AI Assistants

Masscan MCP is designed to work seamlessly with AI assistants that support the Model Context Protocol, enabling natural language interactions for security testing tasks.

Example conversation with an AI assistant:

```
User: Scan my local network 192.168.1.0/24 for web servers
AI: I'll help you scan your network for web servers using Masscan.

[AI uses Masscan MCP to run the scan and returns the results]

Masscan has found the following open web ports:
- 192.168.1.5:80
- 192.168.1.10:443
- 192.168.1.15:8080
...
```

## Security Considerations

- Always obtain proper authorization before scanning networks
- Use responsibly and ethically
- Be aware that Masscan is designed for speed and may generate significant network traffic
- Consider using slower scan rates in production environments

## Troubleshooting

If you encounter issues:

1. Verify Masscan is properly installed and accessible
2. Check the path to the Masscan executable in your configuration
3. Ensure proper permissions are set for execution (Masscan typically requires root/administrator privileges)
4. Review server logs for detailed error messages

## Advanced Usage

While the current MCP implementation provides basic functionality, Masscan itself supports many advanced features. Future versions of this bridge may include additional parameters. 

## Acknowledgments

- Masscan Project: https://github.com/robertdavidgraham/masscan
- Model Context Protocol: https://github.com/modelcontextprotocol