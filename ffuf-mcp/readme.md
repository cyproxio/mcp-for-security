# FFUF MCP

> FFUF MCP is a bridge that connects FFUF (Fuzz Faster U Fool), the high-speed web fuzzer, with the Model Context Protocol (MCP) ecosystem.

## Overview

FFUF MCP enables seamless integration of FFUF's powerful web fuzzing capabilities into MCP-compatible applications and AI-powered workflow systems. This bridge allows you to leverage FFUF functionality through a standardized protocol, making it easier to incorporate into automated security testing pipelines or AI assistant capabilities.

## Features

- Full FFUF functionality exposed through MCP
- Simple configuration and setup
- Easy integration with other MCP-compatible tools and systems
- Standardized input/output handling

## Installation

### Prerequisites

- Node.js (v16 or higher)
- FFUF installed on your system
- MCP SDK

### Setup

1. Clone this repository:
 ```
 git clone https://github.com/cyproxio/mcp-for-security
 cd ffuf-mcp
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

Configure the FFUF MCP server in your MCP client configuration:

```json
{
  "ffuf": {
    "command": "node",
    "args": [
      "/path/to/ffuf-mcp/build/index.js",
      "ffuf"
    ]
  }
}
```

### Running FFUF Tests

Once configured, you can run FFUF tests through the MCP interface using the `do-ffuf` tool:

```javascript
// Example of calling FFUF through MCP
const result = await mcp.tools.invoke("do-ffuf", {
  url: "http://example.com/FUZZ",
  ffuf_args: ["-w", "/path/to/wordlist.txt"]
});
```

### Available Options

FFUF MCP supports all standard FFUF parameters.
See the [FFUF documentation](https://github.com/ffuf/ffuf) for a full list of available options.

## Examples

### Directory Fuzzing

```javascript
const result = await mcp.tools.invoke("do-ffuf", {
  url: "http://target-website.com/FUZZ",
  ffuf_args: [
    "-w", "/path/to/common-directories.txt",
    "-mc", "200,204,301,302,307,401,403"
  ]
});
```

## Integration with AI Assistants

FFUF MCP is designed to work seamlessly with AI assistants that support the Model Context Protocol, enabling natural language interactions for security testing tasks.

Example conversation with an AI assistant:

```
User: Fuzz for hidden directories on http://example.com
AI: I'll help you fuzz for hidden directories using FFUF.

[AI uses FFUF MCP to run the test and returns the results]

FFUF has discovered the following directories:
- /admin (Status: 301)
- /api (Status: 200)
- /backup (Status: 403)
...
```

## Troubleshooting

If you encounter issues:

1. Verify FFUF is properly installed and accessible
2. Check the path to the FFUF executable in your configuration
3. Ensure proper permissions are set for execution
4. Review server logs for detailed error messages

## Acknowledgments

- FFUF Project: https://github.com/ffuf/ffuf
- Model Context Protocol: https://github.com/modelcontextprotocol