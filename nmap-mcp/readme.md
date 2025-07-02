# Nmap MCP

> Nmap MCP is a bridge that connects Nmap, the industry-standard network scanner, with the Model Context Protocol (MCP) ecosystem.

## Overview

Nmap MCP enables seamless integration of Nmap's comprehensive network scanning and security auditing capabilities into MCP-compatible applications and AI-powered workflow systems. This bridge allows you to leverage Nmap's functionality through a standardized protocol, making it easier to incorporate into automated security testing pipelines or AI assistant capabilities.

## Features

- Full Nmap functionality exposed through MCP
- Simple configuration and setup
- Easy integration with other MCP-compatible tools and systems
- Standardized input/output handling

## Installation

### Prerequisites

- Node.js (v16 or higher)
- Nmap installed on your system
- MCP SDK

### Setup

1. Clone this repository:
 ```
  git clone https://github.com/cyproxio/mcp-for-security
 cd nmap-mcp
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

Configure the Nmap MCP server in your MCP client configuration:

```json
{
  "nmap": {
    "command": "node",
    "args": [
      "/path/to/nmap-mcp/build/index.js",
      "nmap"
    ]
  }
}
```

### Running Nmap Scans

Once configured, you can run Nmap scans through the MCP interface using the `do-nmap` tool:

```javascript
// Example of calling Nmap through MCP
const result = await mcp.tools.invoke("do-nmap", {
  target: "192.168.1.1",
  nmap_args: ["-sV", "-p", "1-1000"]
});
```

### Available Options

Nmap MCP supports all standard Nmap parameters through the `nmap_args` array.

## Examples

### Basic Port Scan

```javascript
const result = await mcp.tools.invoke("do-nmap", {
  target: "192.168.1.1",
  nmap_args: ["-p", "1-1000"]
});
```
## Integration with AI Assistants

Nmap MCP is designed to work seamlessly with AI assistants that support the Model Context Protocol, enabling natural language interactions for security testing tasks.

Example conversation with an AI assistant:

```
User: Scan the host 192.168.1.1 for open web servers and SSH
AI: I'll help you scan that host using Nmap.

[AI uses Nmap MCP to run the scan and returns the results]

Nmap scan results for 192.168.1.1:
- Port 22/tcp: open (SSH)
- Port 80/tcp: open (HTTP)
- Port 443/tcp: open (HTTPS)
...
```

## Security Considerations

- Always obtain proper authorization before scanning networks
- Use responsibly and ethically
- Be aware that some Nmap scan types can be detected by security systems
- Consider using quieter scan options in sensitive environments

## Troubleshooting

If you encounter issues:

1. Verify Nmap is properly installed and accessible
2. Check the path to the Nmap executable in your configuration
3. Ensure proper permissions are set for execution (some Nmap scan types require root/administrator privileges)
4. Review server logs for detailed error messages

## Acknowledgments

- Nmap Project: https://nmap.org
- Model Context Protocol: https://github.com/modelcontextprotocol