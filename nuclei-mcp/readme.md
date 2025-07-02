# Nuclei MCP

> Nuclei MCP is a bridge that connects Nuclei, the powerful vulnerability scanner, with the Model Context Protocol (MCP) ecosystem.

## Overview

Nuclei MCP enables seamless integration of Nuclei's template-based vulnerability scanning capabilities into MCP-compatible applications and AI-powered workflow systems. This bridge allows you to leverage Nuclei functionality through a standardized protocol, making it easier to incorporate into automated security testing pipelines or AI assistant capabilities.

## Features

- Simple configuration and setup
- Easy integration with other MCP-compatible tools and systems
- Standardized input/output handling
- Access to Nuclei's extensive template library

## Installation

### Prerequisites

- Node.js (v16 or higher)
- Nuclei installed on your system
- MCP SDK

### Setup

1. Clone this repository:
 ```
 git clone https://github.com/cyproxio/mcp-for-security
 cd nuclei-mcp
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

Configure the Nuclei MCP server in your MCP client configuration:

```json
{
  "nuclei": {
    "command": "node",
    "args": [
      "/path/to/nuclei-mcp/build/index.js",
      "nuclei"
    ]
  }
}
```

### Running Nuclei Scans

Once configured, you can run Nuclei scans through the MCP interface using the `do-nuclei` tool:

```javascript
// Example of calling Nuclei through MCP
const result = await mcp.tools.invoke("do-nuclei", {
  url: "https://example.com",
  tags: "cve,rce,tech"
});
```

### Getting Available Tags

You can retrieve all available Nuclei template tags using the `get-nuclei-tags` tool:

```javascript
// Get all available Nuclei tags
const tagsResult = await mcp.tools.invoke("get-nuclei-tags", {});
const tags = JSON.parse(tagsResult.content[0].text);
```

## Parameters

Nuclei MCP currently supports the following parameters:

- `url`: The target URL to scan (required)
- `tags`: Comma-separated list of template tags to filter which checks to run (optional)

## Examples

### Basic Vulnerability Scan

```javascript
const result = await mcp.tools.invoke("do-nuclei", {
  url: "https://target-website.com"
});
```

### Targeted Scan with Specific Tags

```javascript
const result = await mcp.tools.invoke("do-nuclei", {
  url: "https://target-website.com",
  tags: "cve,oast,ssrf"
});
```

## Integration with AI Assistants

Nuclei MCP is designed to work seamlessly with AI assistants that support the Model Context Protocol, enabling natural language interactions for security testing tasks.

Example conversation with an AI assistant:

```
User: Check example.com for common security vulnerabilities
AI: I'll help you scan example.com for security vulnerabilities using Nuclei.

[AI uses Nuclei MCP to run the scan and returns the results]

Nuclei scan results for example.com:
- Found CVE-2021-XXXX in the login page
- Detected an open redirect vulnerability
- Identified outdated WordPress version
...
```

## Security Considerations

- Always obtain proper authorization before scanning websites for vulnerabilities
- Use responsibly and ethically
- Consider the potential impact of active scanning on production systems
- Some templates may generate significant traffic or potentially disruptive tests

## Troubleshooting

If you encounter issues:

1. Verify Nuclei is properly installed and accessible
2. Check the path to the Nuclei executable in your configuration
3. Ensure proper permissions are set for execution
4. Review server logs for detailed error messages

## Future Enhancements

Future versions of this bridge may include additional parameters such as:

- Support for more Nuclei options (rate-limiting, concurrency, etc.)
- Template management and customization
- Scan reporting in various formats

## Acknowledgments

- Nuclei Project: https://github.com/projectdiscovery/nuclei
- Model Context Protocol: https://github.com/modelcontextprotocol