# httpx MCP

> httpx MCP is a bridge that connects httpx, a fast and multi-purpose HTTP toolkit for probing web servers, with the Model Context Protocol (MCP) ecosystem.

## Overview

httpx MCP enables seamless integration of httpx's capabilities to scan and analyze HTTP/HTTPS services into MCP-compatible applications and AI-powered workflow systems. This bridge allows you to detect active web services, extract valuable information about web servers, and identify technologies in use through a standardized protocol, making it easier to incorporate into automated security testing pipelines or AI assistant capabilities.

## Features

- Integration with httpx to scan for active HTTP and HTTPS services
- Support for multiple target domains in a single scan
- Customizable port scanning
- Extensive probing options for detailed web server analysis
- Technology detection based on the Wappalyzer dataset
- Response analysis including status codes, headers, and content
- Simple configuration and setup
- Easy integration with other MCP-compatible tools and systems
- Standardized input/output handling

## Installation

### Prerequisites

- Node.js (v16 or higher)
- httpx installed on your system
- MCP SDK

### Setup

1. Clone this repository:
 ```
 git clone https://github.com/cyproxio/mcp-for-security
 cd httpx-mcp
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

Configure the httpx MCP server in your MCP client configuration:

```json
{
  "httpx": {
    "command": "node",
    "args": [
      "/path/to/httpx-mcp/build/index.js",
      "httpx"
    ]
  }
}
```

### Running httpx

Once configured, you can run httpx through the MCP interface using the `httpx` tool:

```javascript
// Example of calling httpx through MCP for a single domain
const result = await mcp.tools.invoke("httpx", {
  target: ["example.com"]
});

// Example of calling httpx with multiple targets and probes
const detailedResult = await mcp.tools.invoke("httpx", {
  target: ["example.com", "example.org", "example.net"],
  ports: ["80", "443", "8080", "8443"],
  probes: ["title", "status-code", "tech-detect", "web-server"]
});
```

## Parameters

httpx MCP supports the following parameters:

- `target`: A list of domain names to scan for HTTP and HTTPS services (required)
- `ports`: Custom ports to scan (optional, defaults to standard HTTP/HTTPS ports)
- `probes`: List of probe options to extract specific information (optional)

### Available Probe Options

- `status-code`: Display response status-code
- `content-length`: Display response content-length
- `content-type`: Display response content-type
- `location`: Display response redirect location
- `favicon`: Display mmh3 hash for '/favicon.ico' file
- `hash`: Display response body hash (supported: md5, mmh3, simhash, sha1, sha256, sha512)
- `jarm`: Display jarm fingerprint hash
- `response-time`: Display response time
- `line-count`: Display response body line count
- `word-count`: Display response body word count
- `title`: Display page title
- `body-preview`: Display first N characters of response body (default 100)
- `web-server`: Display server name
- `tech-detect`: Display technology in use based on wappalyzer dataset
- `method`: Display HTTP request method
- `websocket`: Display server using websocket
- `ip`: Display host IP
- `cname`: Display host CNAME
- `extract-fqdn`: Get domain and subdomains from response body and header
- `asn`: Display host ASN information
- `cdn`: Display CDN/WAF in use (default true)
- `probe`: Display probe status

## Examples

### Basic Scan of Multiple Domains

```javascript
const result = await mcp.tools.invoke("httpx", {
  target: ["example.com", "example.org", "example.net"]
});
```

### Scan with Custom Ports

```javascript
const result = await mcp.tools.invoke("httpx", {
  target: ["example.com"],
  ports: ["80", "443", "8080", "8443"]
});
```

### Comprehensive Web Technology Analysis

```javascript
const result = await mcp.tools.invoke("httpx", {
  target: ["example.com"],
  probes: ["tech-detect", "web-server", "title", "status-code", "content-type"]
});
```

### Extract Subdomains from Response

```javascript
const result = await mcp.tools.invoke("httpx", {
  target: ["example.com"],
  probes: ["extract-fqdn", "status-code"]
});
```

## Integration with AI Assistants

httpx MCP is designed to work seamlessly with AI assistants that support the Model Context Protocol, enabling natural language interactions for web server discovery and analysis.

Example conversation with an AI assistant:

```
User: Can you check what web technologies are used by example.com?
AI: I'll scan example.com to identify the web technologies in use.

[AI uses httpx MCP to scan the domain and returns the results]

I found the following technologies on example.com:
- Web Server: nginx/1.18.0
- Technologies: Bootstrap, jQuery, Google Analytics
- Status Code: 200 OK
- Title: Example Domain

Would you like me to analyze any other aspects of this website?
```

## Security Considerations

- This tool is intended for legitimate security research and testing
- Always obtain proper authorization before scanning websites
- Respect rate limits to avoid overwhelming target servers
- Use responsibly and ethically
- The tool only performs passive analysis of publicly available information

## Troubleshooting

If you encounter issues:

1. Verify httpx is properly installed and accessible
2. Check the path to the httpx executable in your configuration
3. Ensure proper permissions are set for execution
4. Review server logs for detailed error messages
5. For large scans, consider increasing timeouts or memory limits

## Usage Tips

- Combine httpx results with other reconnaissance tools for more comprehensive target information
- Use the tech-detect probe to quickly identify technologies that might have known vulnerabilities
- The extract-fqdn probe can help discover additional subdomains not found through other methods
- Use body-preview to get a quick glimpse of the response content without downloading everything
- The CDN detection can help identify which targets might be protected by WAFs

## Acknowledgments

- httpx Project: https://github.com/projectdiscovery/httpx
- Model Context Protocol: https://github.com/modelcontextprotocol