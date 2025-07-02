# Waybackurls MCP

> Waybackurls MCP is a bridge that connects Waybackurls, a tool for retrieving historical URLs from the Wayback Machine, with the Model Context Protocol (MCP) ecosystem.

## Overview

Waybackurls MCP enables seamless integration of Waybackurls' capability to discover historical endpoints into MCP-compatible applications and AI-powered workflow systems. This bridge allows you to leverage the Internet Archive's Wayback Machine to find forgotten API paths, old endpoints, and potentially vulnerable URLs through a standardized protocol, making it easier to incorporate into automated security testing pipelines or AI assistant capabilities.

## Features

- Integration with Waybackurls to fetch historical URLs from the Wayback Machine
- Option to include or exclude subdomains in the search
- Simple configuration and setup
- Easy integration with other MCP-compatible tools and systems
- Standardized input/output handling

## Installation

### Prerequisites

- Node.js (v16 or higher)
- Waybackurls installed on your system
- MCP SDK

### Setup

1. Clone this repository:
 ```
 git clone https://github.com/cyproxio/mcp-for-security
 cd waybackurls-mcp
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

Configure the Waybackurls MCP server in your MCP client configuration:

```json
{
  "waybackurls": {
    "command": "node",
    "args": [
      "/path/to/waybackurls-mcp/build/index.js",
      "waybackurls"
    ]
  }
}
```

### Running Waybackurls

Once configured, you can run Waybackurls through the MCP interface using the `do-waybackurls` tool:

```javascript
// Example of calling Waybackurls through MCP for a domain including subdomains
const result = await mcp.tools.invoke("do-waybackurls", {
  target: "example.com",
  noSub: false
});

// Example of calling Waybackurls through MCP for a domain excluding subdomains
const resultNoSubs = await mcp.tools.invoke("do-waybackurls", {
  target: "example.com",
  noSub: true
});
```

## Parameters

Waybackurls MCP supports the following parameters:

- `target`: The domain to retrieve historical URLs for (required)
- `noSub`: Boolean flag to control whether subdomains should be included (default: false)

## Examples

### Gather All Historical URLs

```javascript
const result = await mcp.tools.invoke("do-waybackurls", {
  target: "example.com",
  noSub: false
});
```

### Gather Historical URLs for Main Domain Only

```javascript
const result = await mcp.tools.invoke("do-waybackurls", {
  target: "example.com",
  noSub: true
});
```

### Process Results for Further Analysis

```javascript
const result = await mcp.tools.invoke("do-waybackurls", {
  target: "example.com"
});

// Split the results into individual URLs
const urls = result.content[0].text.trim().split('\n');

// Filter for specific file types or patterns
const jsFiles = urls.filter(url => url.endsWith('.js'));
const apiEndpoints = urls.filter(url => url.includes('/api/'));
```

## Integration with AI Assistants

Waybackurls MCP is designed to work seamlessly with AI assistants that support the Model Context Protocol, enabling natural language interactions for security testing and reconnaissance tasks.

Example conversation with an AI assistant:

```
User: Find historical URLs for example.com
AI: I'll retrieve historical URLs for example.com using the Wayback Machine.

[AI uses Waybackurls MCP to fetch the URLs and returns the results]

I found the following interesting historical endpoints for example.com:
- Several old API endpoints: /api/v1/users, /api/v2/products
- Previously accessible admin pages: /admin/dashboard, /admin/users
- Backup files: /backup/db.sql, /backup/config.old
...
```

## Security Considerations

- This tool is intended for legitimate security research and testing
- Always obtain proper authorization before scanning websites
- Use responsibly and ethically
- The tool only retrieves information already publicly archived by the Internet Archive

## Troubleshooting

If you encounter issues:

1. Verify Waybackurls is properly installed and accessible
2. Check the path to the Waybackurls executable in your configuration
3. Ensure proper permissions are set for execution
4. Review server logs for detailed error messages
5. Some domains may have limited or no history in the Wayback Machine

## Usage Tips

- Combine Waybackurls results with other reconnaissance tools for more comprehensive target information
- Filter results to focus on specific file types or directories of interest
- Look for patterns in historical URLs that might indicate abandoned features or testing endpoints
- Use the results to inform your security testing or bug bounty hunting

## Acknowledgments

- Waybackurls Project: https://github.com/tomnomnom/waybackurls
- Internet Archive Wayback Machine: https://archive.org/web/
- Model Context Protocol: https://github.com/modelcontextprotocol