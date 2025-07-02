# Smuggler MCP

> Model Context Protocol (MCP) integration for Smuggler, a tool for detecting HTTP Request Smuggling / Desync vulnerabilities.

## Overview

Smuggler MCP allows you to use the Smuggler HTTP Request Smuggling testing tool through the MCP protocol. This integration offers Smuggler's capabilities to automated security testing processes or AI assistants.

## Installation

### Prerequisites

- Node.js (v16+)
- Python 3.x
- Smuggler (smuggler.py) downloaded from [defparam/smuggler](https://github.com/defparam/smuggler)

### Setup

1. Clone this repository:
   ```
   git clone https://github.com/cyproxio/mcp-for-security
   cd smuggler-mcp
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

To configure the Smuggler MCP server in your MCP client setup:

```json
{
  "smuggler": {
    "command": "node",
    "args": [
      "/path/to/smuggler-mcp/build/index.js",
      "/path/to/python"
      "/path/to/smuggler/smuggler.py"
    ]
  }
}
```

### Example Usage

```javascript
// Run HTTP Request Smuggling test
const result = await mcp.tools.invoke("do-smuggler", {
  url: "http://example.com" 
});

// Test with additional parameters
const result = await mcp.tools.invoke("do-smuggler", {
  url: "http://example.com",
  smuggler_args: ["-m", "GET", "--timeout", "10"]
});
```

### Supported Parameters

- `url`: URL to test (required)
- `smuggler_args`: Additional Smuggler parameters (optional)
  - `-m, --method`: HTTP method (GET, POST, etc.)
  - `-v, --vhost`: Virtual host
  - `-t, --timeout`: Timeout value
  - `-x`: Exit on first finding
  - `--verify`: Level of verification for findings

## Integration with AI Assistants
Smuggler MCP is designed to work with AI assistants that support the Model Context Protocol, enabling natural language interactions for vulnerability testing.

```
User: Can you test this internal site for HTTP request smuggling? http://internal.corp
AI: Running HTTP Request Smuggling tests on http://internal.corp using Smuggler...

[AI runs Smuggler MCP and returns the parsed results]

Smuggler found a potential CL.TE vulnerability using mutation XYZ...
```
## Security Considerations

- Use Smuggler only with explicit authorization
- Target only systems you own or have permission to test
- Avoid triggering backend systems unintentionally
- Use responsibly and ethically


## Troubleshooting

1. Verify Python and smuggler.py are accessible and working
2. Ensure the paths in your configuration are correct
3. Check output logs for Python errors
4. Use verbose logging for debugging


## Acknowledgements

- [Smuggler](https://github.com/defparam/smuggler)
- [Model Context Protocol](https://github.com/modelcontextprotocol) 