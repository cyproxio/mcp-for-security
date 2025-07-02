# Alterx MCP

> Alterx MCP is a bridge that connects Alterx, a powerful subdomain permutation tool, with the Model Context Protocol (MCP) ecosystem.

## Overview

Alterx MCP enables seamless integration of Alterx's domain wordlist generation capabilities into MCP-compatible applications and AI-powered workflow systems. This bridge allows you to leverage Alterx's pattern-based permutation system through a standardized protocol, making it easier to incorporate into automated subdomain discovery pipelines or AI assistant capabilities.

## Features

- Pattern-based wordlist generation for subdomain discovery
- Support for multiple permutation patterns and strategies
- Simple configuration and setup
- Easy integration with other MCP-compatible tools and systems

## Installation

### Prerequisites

- Node.js (v16 or higher)
- Alterx installed on your system
- MCP SDK

### Setup

1. Clone this repository:
 ```
 git clone https://github.com/cyproxio/mcp-for-security
 cd alterx-mcp
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

Configure the Alterx MCP server in your MCP client configuration:

```json
{
  "alterx": {
    "command": "node",
    "args": [
      "/path/to/alterx-mcp/build/index.js",
      "alterx"
    ]
  }
}
```

### Running Alterx

Once configured, you can run Alterx through the MCP interface using the `do-alterx` tool:

```javascript
// Example of calling Alterx through MCP
const result = await mcp.tools.invoke("do-alterx", {
  domain: "api.example.com",
  pattern: "{{word}}-{{sub}}.{{suffix}}",
  outputFilePath: "wordlist.txt"
});
```

## Parameters

Alterx MCP supports the following parameters:

- `domain`: The target domain or subdomains to use as a base for creating permutations (required)
- `pattern`: The pattern template to use for generating wordlist variations (required)
- `outputFilePath`: Path where the generated wordlist should be saved (optional)

## Examples

### Basic Permutation

```javascript
const result = await mcp.tools.invoke("do-alterx", {
  domain: "api.example.com",
  pattern: "{{sub}}-{{word}}.{{suffix}}"
});
```

### Multiple Patterns

```javascript
const result = await mcp.tools.invoke("do-alterx", {
  domain: "api.example.com",
  pattern: "{{sub}}-{{word}}.{{suffix}},{{word}}.{{sub}}.{{suffix}}",
  outputFilePath: "combined_wordlist.txt"
});
```

## Integration with AI Assistants

Alterx MCP is designed to work seamlessly with AI assistants that support the Model Context Protocol, enabling natural language interactions for subdomain discovery and enumeration tasks.

Example conversation with an AI assistant:

```
User: Generate subdomain permutations for api.example.com
AI: I'll help you generate subdomain permutations using Alterx.

[AI uses Alterx MCP to run the permutation and returns the results]

I've generated the following subdomain permutations:
- dev-api.example.com
- stage-api.example.com
- test-api.example.com
- api-dev.example.com
- api-stage.example.com
...
```

## Security Considerations

- Always obtain proper authorization before scanning domains for subdomains
- Use responsibly and ethically
- This tool is intended for legitimate security research and testing

## Troubleshooting

If you encounter issues:

1. Verify Alterx is properly installed and accessible
2. Check the path to the Alterx executable in your configuration
3. Ensure proper permissions are set for execution
4. Review server logs for detailed error messages

## Advanced Usage

In more complex scenarios, you can:

1. Chain Alterx with other subdomain discovery tools in your MCP environment
2. Create custom wordlists for different patterns and reuse them across scans
3. Build automated workflows that generate permutations and then validate discovered subdomains

## Acknowledgments

- Alterx Project: https://github.com/projectdiscovery/alterx
- Model Context Protocol: https://github.com/modelcontextprotocol