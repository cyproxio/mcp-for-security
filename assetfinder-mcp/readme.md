# Assetfinder MCP

> Assetfinder MCP is a bridge that connects Assetfinder, a subdomain discovery tool by Tomnomnom, with the Model Context Protocol (MCP) ecosystem.

## Overview

Assetfinder MCP enables seamless integration of Assetfinder’s passive subdomain enumeration capabilities into MCP-compatible applications and AI-powered systems. This allows automated workflows and AI assistants to quickly discover related domains and subdomains for reconnaissance and analysis using a standardized interface.


## Features

- Integration with Assetfinder for passive subdomain discovery
- Fast and lightweight enumeration of subdomains
- Optional discovery of related root domains
- Seamless usage within AI assistants or automation pipelines
- Standardized input/output handling through MCP

## Installation

### Prerequisites

- Node.js (v16 or higher)
- assetfinder installed on your system
- MCP SDK

### Setup

1. Clone this repository:
   ```
   git clone https://github.com/cyproxio/mcp-for-security
   cd assetfinder-mcp
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

Configure the Assetfinder MCP server in your MCP client configuration:

```json
{
  "assetfinder": {
    "command": "node",
    "args": [
      "/path/to/assetfinder-mcp/build/index.js",
      "assetfinder"
    ]
  }
}
```

### Parameters
Assetfinder MCP supports the following parameter:
* target:  The domain name to enumerate subdomains for (e.g., example.com).


## Examples

### Basic Subdomain Enumeration

```javascript
const result = await mcp.tools.invoke("assetfinder", {
  target: "example.com"
});
```

### Use in an Automated Workflow

```javascript
const domains = ["example.com", "testsite.org"];
for (const domain of domains) {
  const result = await mcp.tools.invoke("assetfinder", { target: domain });
  console.log(`${domain} → ${result.join(", ")}`);
}
```


## Integration with AI Assistants
Assetfinder MCP is designed to be easily used within AI assistants that support the Model Context Protocol. This allows natural language-driven subdomain reconnaissance tasks.

Example conversation with an AI assistant:

```
User: Find all subdomains of example.com.
AI: Running assetfinder for example.com...

[AI uses Assetfinder MCP and returns the results]

I found the following subdomains:
- www.example.com
- api.example.com
- mail.example.com
...
```

## Security Considerations

- Assetfinder performs passive enumeration and does not actively scan the target.
- Ensure you have proper authorization to query domains.
- Use responsibly and in accordance with legal and ethical guidelines.

## Troubleshooting

If you encounter issues:

1.	Ensure assetfinder is installed and accessible in your terminal (which assetfinder).
2.	Make sure your MCP configuration path points to the correct build output.
3.	Verify that the target parameter is a valid domain.
4.	Check logs for detailed error messages.

## Acknowledgments

- Assetfinder by Tomnomnom: https://github.com/tomnomnom/assetfinder
- Model Context Protocol: https://github.com/modelcontextprotocol