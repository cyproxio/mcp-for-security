# SSLScan MCP

> SSLScan MCP is a bridge that connects SSLScan, the comprehensive SSL/TLS security testing tool, with the Model Context Protocol (MCP) ecosystem.

## Overview

SSLScan MCP enables seamless integration of SSLScan's SSL/TLS assessment capabilities into MCP-compatible applications and AI-powered workflow systems. This bridge allows you to leverage SSLScan functionality through a standardized protocol, making it easier to incorporate into automated security testing pipelines or AI assistant capabilities.

## Features

- Full SSLScan functionality exposed through MCP
- Simple configuration and setup
- Easy integration with other MCP-compatible tools and systems
- Standardized input/output handling
- Support for all SSLScan options and configurations

## Installation

### Prerequisites

- Node.js (v16 or higher)
- SSLScan installed on your system
- MCP SDK

### Setup

1. Clone this repository:
 ```
 git clone https://github.com/cyproxio/mcp-for-security
 cd sslscan-mcp
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

Configure the SSLScan MCP server in your MCP client configuration:

```json
{
  "sslscan": {
    "command": "node",
    "args": [
      "/path/to/sslscan-mcp/build/index.js",
      "sslscan"
    ]
  }
}
```

### Running SSLScan Tests

Once configured, you can run SSLScan tests through the MCP interface using the `do-sslscan` tool:

```javascript
// Example of calling SSLScan through MCP
const result = await mcp.tools.invoke("do-sslscan", {
  target: "https://example.com",
  sslscan_args: ["--no-fallback", "--no-heartbleed"]
});
```

### Available Options

SSLScan MCP supports all standard SSLScan parameters through the `sslscan_args` array. 

## Examples

### Basic SSL/TLS Assessment

```javascript
const result = await mcp.tools.invoke("do-sslscan", {
  target: "https://example.com",
  sslscan_args: []
});
```

### Check for Legacy Protocol Support

```javascript
const result = await mcp.tools.invoke("do-sslscan", {
  target: "https://example.com",
  sslscan_args: ["--ssl3", "--tls10"]
});
```

### Comprehensive SSL/TLS Audit

```javascript
const result = await mcp.tools.invoke("do-sslscan", {
  target: "https://example.com",
  sslscan_args: [
    "--show-certificate",
    "--show-ciphers",
    "--no-fallback",
    "--no-heartbleed"
  ]
});
```

### STARTTLS for Email Servers

```javascript
const result = await mcp.tools.invoke("do-sslscan", {
  target: "mail.example.com",
  sslscan_args: ["--starttls-smtp"]
});
```

## Integration with AI Assistants

SSLScan MCP is designed to work seamlessly with AI assistants that support the Model Context Protocol, enabling natural language interactions for SSL/TLS security testing tasks.

Example conversation with an AI assistant:

```
User: Check the SSL/TLS configuration of example.com
AI: I'll help you analyze the SSL/TLS configuration of example.com using SSLScan.

[AI uses SSLScan MCP to run the assessment and returns the results]

SSLScan results for example.com:
- TLSv1.0 is disabled
- TLSv1.3 is supported
- Weak ciphers are not supported
- Certificate is valid and trusted
- No Heartbleed vulnerability detected
...
```

## Security Considerations

- Always obtain proper authorization before testing websites
- Use responsibly and ethically
- Some tests may be logged by the target server's security monitoring systems

## Troubleshooting

If you encounter issues:

1. Verify SSLScan is properly installed and accessible
2. Check the path to the SSLScan executable in your configuration
3. Ensure proper permissions are set for execution
4. Review server logs for detailed error messages
5. Confirm that the target URL begins with `https://` for proper SSL/TLS scanning

## Acknowledgments

- SSLScan Project: https://github.com/rbsec/sslscan
- Model Context Protocol: https://github.com/modelcontextprotocol