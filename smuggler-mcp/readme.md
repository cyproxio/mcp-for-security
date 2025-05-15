# Smuggler MCP

> Model Context Protocol (MCP) integration for Smuggler, a tool for detecting HTTP Request Smuggling / Desync vulnerabilities.

## Overview

Smuggler MCP allows you to use the Smuggler HTTP Request Smuggling testing tool through the MCP protocol. This integration offers Smuggler's capabilities to automated security testing processes or AI assistants.

## Installation

### Prerequisites

- Node.js (v16+)
- Python 3.x
- Git

### Quick Setup

```bash
git clone https://github.com/username/smuggler-mcp
cd smuggler-mcp
./run.sh
```

The `run.sh` script automatically:
- Downloads Smuggler
- Installs required node modules
- Compiles the project
- Starts the MCP server

## Usage

Add to your MCP client configuration:

```json
{
  "smuggler": {
    "command": "node",
    "args": [
      "/path/to/smuggler-mcp/build/index.js",
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

## Security Warning

- Obtain necessary permissions before testing websites
- Use in an ethical manner

## License

MIT

## Acknowledgements

- [Smuggler](https://github.com/defparam/smuggler)
- [Model Context Protocol](https://github.com/modelcontextprotocol) 