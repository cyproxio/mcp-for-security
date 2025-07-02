# CRTSH MCP

> Certificate Search MCP is a bridge that connects crt.sh, a tool for discovering subdomains using SSL certificate logs, with the Model Context Protocol (MCP) ecosystem.

## Overview

Certificate Search MCP enables seamless integration of crt.sh's capability to discover subdomains into MCP-compatible applications and AI-powered workflow systems. This bridge allows you to leverage SSL certificate transparency logs to find subdomains, potentially hidden services, and expand attack surfaces through a standardized protocol, making it easier to incorporate into automated security testing pipelines or AI assistant capabilities.

## Features

- Integration with Certificate Search (crt.sh) to fetch subdomains from SSL certificate logs
- Comprehensive subdomain discovery without active scanning
- Simple configuration and setup
- Easy integration with other MCP-compatible tools and systems
- Standardized input/output handling

## Installation

### Prerequisites

- Node.js (v16 or higher)
- MCP SDK

### Setup

1. Clone this repository:
 ```
 git clone https://github.com/cyproxio/mcp-for-security
 cd crtsh-mcp
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

Configure the Certificate Search MCP server in your MCP client configuration:

```json
{
  "crtsh": {
    "command": "node",
    "args": [
      "/path/to/crtsh-mcp/build/index.js",
    ]
  }
}
```

### Running crt.sh

Once configured, you can run Certificate Search through the MCP interface using the `crtsh tool:

```javascript
// Example of calling Certificate Search through MCP for a domain
const result = await mcp.tools.invoke("crtsh", {
  target: "example.com"
});
```

## Parameters

Certificate Search MCP supports the following parameters:

- `target`: The domain to retrieve subdomains for (required)

## Examples

### Gather All Historical URLs

```javascript
const result = await mcp.tools.invoke("crtsh", {
  target: "example.com"
});
```

### Process Results for Further Analysis

```javascript
const result = await mcp.tools.invoke("crtsh", {
  target: "example.com"
});

// Parse the JSON results
const domains = JSON.parse(result.content[0].text);

// Filter for specific patterns or categories
const devDomains = domains.filter(domain => domain.includes('dev'));
const apiDomains = domains.filter(domain => domain.includes('api'));
```

## Integration with AI Assistants

Certificate Search MCP is designed to work seamlessly with AI assistants that support the Model Context Protocol, enabling natural language interactions for security testing and reconnaissance tasks.

Example conversation with an AI assistant:

```
User: Find subdomains for example.com
AI: I'll discover subdomains for example.com using SSL certificate logs.

[AI uses Certificate Search MCP to fetch the subdomains and returns the results]

I found the following subdomains for example.com:
- api.example.com
- dev.example.com
- staging.example.com
- mail.example.com
- intranet.example.com
...
```

## Security Considerations

- This tool is intended for legitimate security research and testing
- Always obtain proper authorization before scanning websites
- Use responsibly and ethically
- The tool only retrieves information already publicly available in certificate transparency logs

## Troubleshooting

If you encounter issues:

1. Verify network connectivity to certificate transparency logs
2. Check that the domain has SSL certificates registered
3. Ensure proper permissions are set for execution
4. Review server logs for detailed error messages
5. Some domains may have limited or no certificates in transparency logs

## Usage Tips

- Combine Certificate Search results with other reconnaissance tools for more comprehensive target information
- Look for interesting or unusual subdomains that might indicate sensitive services
- Use the discovered subdomains as input for further security testing
- Regularly monitor changes in subdomain structure to identify new attack surfaces

## Acknowledgments

- Certificate Search Project: https://crt.sh/
- Certificate Transparency: https://certificate.transparency.dev/
- Model Context Protocol: https://github.com/modelcontextprotocol