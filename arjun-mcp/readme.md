# Arjun MCP

> Arjun MCP is a bridge that connects Arjun, a powerful HTTP parameter discovery tool, with the Model Context Protocol (MCP) ecosystem.



## Overview

Arjun MCP enables seamless integration of Arjun’s advanced hidden parameter discovery capabilities into MCP-compatible applications and AI-powered workflow systems. This bridge allows you to leverage Arjun’s comprehensive scanning features through a standardized protocol, making it easier to incorporate into automated security testing pipelines or AI assistant capabilities.


## Features

- Integration with Arjun to discover hidden HTTP parameters
- Support for scanning single URLs or multiple URLs from a file
- Custom wordlist support for flexible scanning
- Ability to specify HTTP methods (GET, POST, JSON, HEADERS)
- Rate limiting and chunk size configuration
- Simple configuration and setup
- Easy integration with other MCP-compatible tools and systems
- Standardized input/output handling

## Installation

### Prerequisites

- Node.js (v16 or higher)
- Arjun installed on your system
- MCP SDK

### Setup

1. Clone this repository:
   ```
   git clone https://github.com/cyproxio/mcp-for-security
   cd arjun-mcp
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

Configure the Arjun MCP server in your MCP client configuration:

```json
{
  "arjun": {
    "command": "node",
    "args": [
      "/path/to/arjun-mcp/build/index.js",
      "arjun"
    ]
  }
}
```

### Parameters
Arjun MCP supports the following parameters:
- url: Target URL to scan for hidden parameters (required if textFile not provided)
- textFile: Path to file containing multiple URLs (optional)
- wordlist: Path to custom wordlist file for scanning (optional)
- method: HTTP method to use for scanning (optional)
- rateLimit: Maximum requests per second (optional, default: 9999)
- chunkSize: The number of parameters to be sent at once (optional)

## Examples

### Scan a Single URL 

```javascript
const result = await mcp.tools.invoke("arjun", {
  url: "https://example.com"
});
```

### Scan Multiple URLs from a File

```javascript
const result = await mcp.tools.invoke("arjun", {
  textFile: "/path/to/urls.txt"
});
```


### Use a Custom Wordlist and Specific Method

```javascript
const result = await mcp.tools.invoke("arjun", {
  url: "https://example.com",
  wordlist: "/path/to/wordlist.txt",
  method: "POST"
});
```


## Integration with AI Assistants

Arjun MCP is designed to work seamlessly with AI assistants that support the Model Context Protocol, enabling natural language interactions for hidden parameter discovery tasks.

Example conversation with an AI assistant:

```
User: Find hidden parameters on https://example.com
AI: I'll run a scan for hidden HTTP parameters on https://example.com using Arjun.

[AI uses Arjun MCP to perform the scan and returns the results]

I discovered the following hidden parameters:
- user_id
- session_token
- debug
- preview_mode
...

Would you like me to test these parameters for vulnerabilities?
```

## Security Considerations

- This tool is intended for legitimate security research and testing
- Always obtain proper authorization before scanning websites
- Scanning can generate noticeable traffic; adjust rate limits if necessary
- Use responsibly and ethically
- Respect target websites’ terms of service and applicable laws

## Troubleshooting

If you encounter issues:

1. Verify Arjun is properly installed and accessible in your PATH
2. Check the path to the Arjun executable in your configuration
3. Ensure proper permissions are set for execution
4. Review server logs for detailed error messages

## Acknowledgments

- Arjun Project: https://github.com/s0md3v/Arjun
- Model Context Protocol: https://github.com/modelcontextprotocol