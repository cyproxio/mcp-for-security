# Amass MCP

> Amass MCP is a bridge that connects Amass, a powerful reconnaissance tool for network mapping and subdomain enumeration, with the Model Context Protocol (MCP) ecosystem.

## Overview

Amass MCP enables seamless integration of Amass's advanced reconnaissance capabilities into MCP-compatible applications and AI-powered workflow systems. This bridge allows you to leverage Amass's comprehensive subdomain discovery, intelligence gathering, and network mapping features through a standardized protocol, making it easier to incorporate into automated security testing pipelines or AI assistant capabilities.

## Features

- Integration with Amass to perform advanced subdomain enumeration and reconnaissance
- Support for both passive and active enumeration modes
- Intelligence gathering capabilities with organization and WHOIS lookups
- Brute force subdomain discovery with custom wordlist support
- Simple configuration and setup
- Easy integration with other MCP-compatible tools and systems
- Standardized input/output handling

## Installation

### Prerequisites

- Node.js (v16 or higher)
- Amass installed on your system
- MCP SDK

### Setup

1. Clone this repository:
 ```
 git clone https://github.com/cyproxio/mcp-for-security
 cd amass-mcp
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

Configure the Amass MCP server in your MCP client configuration:

```json
{
  "amass": {
    "command": "node",
    "args": [
      "/path/to/amass-mcp/build/index.js",
      "amass"
    ]
  }
}
```

### Running Amass

Once configured, you can run Amass through the MCP interface using the `amass` tool with various subcommands:

```javascript
// Example of calling Amass enum through MCP for passive reconnaissance
const result = await mcp.tools.invoke("amass", {
  subcommand: "enum",
  domain: "example.com",
  enum_type: "passive"
});

// Example of calling Amass intel with organization search
const intelResult = await mcp.tools.invoke("amass", {
  subcommand: "intel",
  intel_organization: "Example Corp",
  intel_whois: true
});
```

## Parameters

Amass MCP supports the following parameters:

- `subcommand`: The Amass operation mode to use (required)
  - `enum`: Perform subdomain enumeration and network mapping
  - `intel`: Gather intelligence about target domains from various sources

- For `enum` subcommand:
  - `domain`: Target domain to perform reconnaissance against (required)
  - `enum_type`: Enumeration approach type (optional)
    - `active`: Includes DNS resolution and potential network interactions with target
    - `passive`: Only uses information from third-party sources without direct target interaction
  - `enum_brute`: Whether to perform brute force subdomain discovery (optional)
  - `enum_brute_wordlist`: Path to custom wordlist file for brute force operations (optional)

- For `intel` subcommand:
  - `domain`: Target domain to gather intelligence on (optional if organization is provided)
  - `intel_organization`: Organization name to search for (optional if domain is provided)
  - `intel_whois`: Whether to include WHOIS data in intelligence gathering (optional)

## Examples

### Passive Subdomain Enumeration

```javascript
const result = await mcp.tools.invoke("amass", {
  subcommand: "enum",
  domain: "example.com",
  enum_type: "passive"
});
```

### Active Subdomain Enumeration with Brute Force

```javascript
const result = await mcp.tools.invoke("amass", {
  subcommand: "enum",
  domain: "example.com",
  enum_type: "active",
  enum_brute: true,
  enum_brute_wordlist: "/path/to/subdomains.txt"
});
```

### Intelligence Gathering for an Organization

```javascript
const result = await mcp.tools.invoke("amass", {
  subcommand: "intel",
  intel_organization: "Example Corp",
  intel_whois: true
});
```

### Domain Intelligence with WHOIS

```javascript
const result = await mcp.tools.invoke("amass", {
  subcommand: "intel",
  domain: "example.com",
  intel_whois: true
});
```

## Integration with AI Assistants

Amass MCP is designed to work seamlessly with AI assistants that support the Model Context Protocol, enabling natural language interactions for security testing and reconnaissance tasks.

Example conversation with an AI assistant:

```
User: Perform reconnaissance on example.com
AI: I'll run a passive subdomain enumeration for example.com using Amass.

[AI uses Amass MCP to perform the enumeration and returns the results]

I found the following subdomains for example.com:
- api.example.com
- mail.example.com
- dev.example.com
- admin.example.com
- staging.example.com
...

Would you like me to gather intelligence about the organization as well?
```

## Security Considerations

- This tool is intended for legitimate security research and testing
- Always obtain proper authorization before scanning websites
- Active enumeration may generate significant traffic to the target
- Use responsibly and ethically
- Consider using passive mode for initial reconnaissance to minimize detection

## Troubleshooting

If you encounter issues:

1. Verify Amass is properly installed and accessible in your PATH
2. Check the path to the Amass executable in your configuration
3. Ensure proper permissions are set for execution
4. Review server logs for detailed error messages
5. For large domains, consider increasing timeouts or memory limits

## Usage Tips

- Combine Amass results with other reconnaissance tools for more comprehensive target information
- Start with passive enumeration before using active techniques
- Use custom wordlists tailored to the target's industry or technology stack
- Filter results to focus on interesting subdomains that might indicate sensitive services
- Use the intel subcommand to discover related domains and organizations

## Acknowledgments

- Amass Project: https://github.com/OWASP/Amass
- OWASP Foundation
- Model Context Protocol: https://github.com/modelcontextprotocol