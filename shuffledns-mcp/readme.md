# shuffledns MCP

> shuffledns MCP is a bridge that connects shuffledns, a fast and powerful DNS enumeration tool, with the Model Context Protocol (MCP) ecosystem.

## Overview

shuffledns MCP enables seamless integration of shuffledns’s capabilities for DNS brute forcing, DNS resolving, and filtering into MCP-compatible applications and AI-driven workflow systems. This bridge allows you to efficiently discover subdomains, validate DNS records, and filter live hosts through a standardized protocol, making it easy to incorporate into automated reconnaissance pipelines or AI assistant capabilities.

## Features

- Integration with shuffledns for fast DNS brute force and resolution
- Support for different operational modes: bruteforce, resolve, and filter
- Ability to use custom resolvers and wordlists
- Optional rate limiting for fine-tuned performance
- Simple configuration and setup
- Standardized input/output handling compatible with other MCP tools

## Installation

### Prerequisites

- Node.js (v16 or higher)
- shuffledns and massdns installed on your system
- MCP SDK

### Setup

1. Clone this repository:
 ```
 git clone https://github.com/cyproxio/mcp-for-security
 cd shuffledns-mcp
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

Configure the shuffledns MCP server in your MCP client configuration:

```json
{
  "shuffledns": {
    "command": "node",
    "args": [
      "/path/to/shuffledns-mcp/build/index.js",
      "shuffledns",
      "massdns"
    ]
  }
}
```

### Running shuffledns

Once configured, you can run shuffledns through the MCP interface using the shuffledns tool:

```javascript
// Example of calling shuffledns through MCP
const result = await mcp.tools.invoke("shuffledns", {
  target: "example.com",
  resolver: "/path/to/resolvers.txt",
  mode: "bruteforce",
  wordlist: "/path/to/wordlist.txt",
  rateLimit: 1000 // optional
});

```

## Parameters

shuffledns MCP supports the following parameters:
- target: Domain name to scan (e.g., example.com) (required)
- resolver: Path to the resolver file containing DNS resolvers (required)
- mode: The operation mode to use:
  - bruteforce: Perform a DNS brute force attack using a wordlist
  - resolve: Resolve a list of domain names
  - filter: Filter a list of subdomains to find active hosts
  - wordlist: Path to the wordlist for subdomain enumeration (required)
- rateLimit: Number of DNS requests per second (optional)

## Examples

### Basic DNS Brute Forcing

```javascript
const result = await mcp.tools.invoke("shuffledns", {
  target: "example.com",
  resolver: "/path/to/resolvers.txt",
  mode: "bruteforce",
  wordlist: "/path/to/wordlist.txt"
});
```

### DNS Resolution of Existing Subdomains

```javascript
const result = await mcp.tools.invoke("shuffledns", {
  target: "example.com",
  resolver: "/path/to/resolvers.txt",
  mode: "resolve",
  wordlist: "/path/to/existing-subdomains.txt"
});
```

## Integration with AI Assistants

shuffledns MCP is designed to work seamlessly with AI assistants that support the Model Context Protocol, enabling natural language interactions for subdomain discovery and DNS reconnaissance.

Example conversation with an AI assistant:

```
User: Find subdomains for example.com
AI: I'll perform a DNS brute force on example.com to discover subdomains.

[AI uses shuffledns MCP to scan the domain and returns the results]

I found the following subdomains:
- api.example.com
- mail.example.com
- dev.example.com

Would you like me to check if they are active?
```

## Security Considerations

- This tool is intended for authorized security testing and research purposes only.
- Always obtain proper authorization before performing scans on external systems.
- Be mindful of DNS resolver usage policies and avoid abuse.
- Use responsible scanning practices and respect target systems.


## Troubleshooting

If you encounter issues:

1.	Ensure shuffledns is properly installed and accessible in the system PATH.
2.  Ensure massdns is properly installed and accessible in the system PATH.
3.	Check if the resolver file and wordlist paths are correct.
4.	Review server logs for detailed error messages.
5.	Adjust rate limits if DNS errors or throttling occur.


## Usage Tips

- Use high-quality resolvers for faster and more reliable results.
- Combine shuffledns output with HTTP probes (e.g., httpx) for comprehensive asset discovery.
- Use filtering mode after brute forcing to identify only live subdomains.
- Adjust rate limits based on your system and resolver capabilities to avoid packet loss.

## Acknowledgments

- shuffledns Project: https://github.com/projectdiscovery/shuffledns
- massdns Project: https://github.com/blechschmidt/massdns
- Model Context Protocol: https://github.com/modelcontextprotocol