# HTTP Headers Security MCP

> HTTP Headers Security MCP is a bridge that connects HTTP header security analysis capabilities with the Model Context Protocol (MCP) ecosystem.

## Overview

HTTP Headers Security MCP enables seamless integration of HTTP security header analysis into MCP-compatible applications and AI-powered workflow systems. This tool evaluates HTTP response headers against OWASP security best practices, identifying potentially dangerous headers that should be removed and recommended security headers that are missing. This bridge allows you to leverage security header analysis through a standardized protocol, making it easier to incorporate into automated security testing pipelines or AI assistant capabilities.

## Features

- Analysis of HTTP response headers against OWASP security standards
- Identification of security headers that should be removed
- Recommendations for missing security headers that should be added
- Simple configuration and setup
- Easy integration with other MCP-compatible tools and systems
- Standardized input/output handling

## Installation

### Prerequisites

- Node.js (v16 or higher)
- MCP SDK
- Axios for HTTP requests

### Setup

1. Clone this repository:
 ```
 git clone https://github.com/cyproxio/mcp-for-security

 cd http-headers-security-mcp
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

Configure the HTTP Headers Security MCP server in your MCP client configuration:

```json
{
  "http-headers-security": {
    "command": "node",
    "args": [
      "/path/to/http-headers-security-mcp/build/index.js"
    ]
  }
}
```

### Analyzing HTTP Headers

Once configured, you can analyze HTTP headers through the MCP interface using the `analyze-http-header` tool:

```javascript
// Example of analyzing HTTP headers through MCP
const result = await mcp.tools.invoke("analyze-http-header", {
  target: "https://example.com"
});

// Parse the JSON result
const headerAnalysis = JSON.parse(result.content[0].text);

// Access the results
const headersToRemove = headerAnalysis.removeHeaders;
const headersToAdd = headerAnalysis.addedHeaders;
```

## How It Works

The HTTP Headers Security MCP works by:

1. Making an HTTP request to the target URL
2. Collecting all HTTP response headers
3. Comparing the headers against two OWASP-based reference lists:
   - Headers that should be removed for security reasons (from `owasp_headers_remove.json`)
   - Headers that should be added for enhanced security (from `owasp_headers_add.json`)
4. Returning a comprehensive analysis with specific recommendations

## Example Response

```json
{
  "removeHeaders": [
    "Server: Apache/2.4.41",
    "X-Powered-By: PHP/7.4.3"
  ],
  "addedHeaders": [
    "Content-Security-Policy: default-src 'self'",
    "X-Frame-Options: DENY",
    "X-Content-Type-Options: nosniff",
    "Strict-Transport-Security: max-age=31536000; includeSubDomains"
  ]
}
```

## Integration with AI Assistants

HTTP Headers Security MCP is designed to work seamlessly with AI assistants that support the Model Context Protocol, enabling natural language interactions for security testing tasks.

Example conversation with an AI assistant:

```
User: Check the security headers of example.com
AI: I'll analyze the HTTP security headers for example.com.

[AI uses HTTP Headers Security MCP to run the analysis and returns the results]

Here's my security header analysis for example.com:

Headers that should be removed:
- Server: Apache/2.4.41 (reveals server software information)
- X-Powered-By: PHP/7.4.3 (reveals technology stack)

Missing security headers that should be added:
- Content-Security-Policy: to prevent XSS attacks
- X-Frame-Options: to prevent clickjacking
- X-Content-Type-Options: to prevent MIME-type sniffing
- Strict-Transport-Security: to enforce HTTPS

These changes would significantly improve the security posture of the website.
```

## Security Considerations

- Always obtain proper authorization before scanning websites
- Use responsibly and ethically
- This tool only analyzes HTTP headers and does not perform invasive testing

## Troubleshooting

If you encounter issues:

1. Verify the target URL is accessible
2. Check for any network restrictions or firewalls
3. Ensure the reference JSON files are correctly formatted and loaded
4. Review server logs for detailed error messages

## Advanced Usage

You can enhance this tool by:

1. Adding custom header security rules
2. Integrating with other security testing frameworks
3. Implementing severity ratings for findings
4. Creating detailed reports with remediation guidance

## Acknowledgments

- OWASP Secure Headers Project: https://owasp.org/www-project-secure-headers/
- Model Context Protocol: https://github.com/modelcontextprotocol