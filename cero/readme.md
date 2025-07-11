# CERO MCP

> Cero MCP is a bridge that connects Cero, a high-performance TLS certificate scanner, with the Model Context Protocol (MCP) ecosystem.


## Overview

Cero MCP enables seamless integration of Cero’s TLS certificate-based domain enumeration capabilities into MCP-compatible applications and AI-powered reconnaissance workflows. This allows for automated subdomain discovery and infrastructure analysis, ideal for penetration testing pipelines, OSINT, and AI security agents.

## Installation

### Prerequisites

- Node.js (v16+)
- MCP SDK
- Go 1.18+ (if building Cero from source)
- Cero binary available in system path or specified manually

### Setup

1. Clone this repository:
   ```
   git clone https://github.com/cyproxio/mcp-for-security
   cd cero-mcp
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Build the project:
   ```
   npm run build
   ```


## Usage

### Basic Configuration

To configure the Cero MCP server in your MCP client setup:

```json
{
  "cero": {
    "command": "node",
    "args": [
      "/path/to/cero-mcp/build/index.js",
      "/usr/local/bin/cero"
    ]
  }
}
```

### Example Usage

#### Basic TSL Scan
```javascript
const result = await mcp.tools.invoke("do-cero", {
  target: "example.com"
});
```

#### Concurrent Scan with Custom Ports and Timeout
```javascript
const result = await mcp.tools.invoke("do-cero", {
  target: "192.168.1.0/24",
  concurrency: 100,
  ports: ["443", "8443", "993"],
  timeOut: 6
});
```

### Supported Parameters

- `target` (required): The target hostname, IP address, or CIDR range to scan
- `concurrency`: Maximum number of concurrent TLS connections (default varies)
- `ports`: List of ports to probe for TLS certificates (e.g., ["443", "8443"])
- `timeOut`: Timeout for each TLS connection in seconds (default: 4)

## Integration with AI Assistants
Cero MCP integrates directly into AI assistants that support the Model Context Protocol. This allows natural language instructions to trigger deep certificate-based enumeration.

```
User: Find subdomains for *.example.com using TLS certificate data.
AI: Running Cero scan against example.com on ports 443 and 8443...

[Cero MCP runs and returns discovered domains]

Results: Found 6 domains via certificate SAN fields including mail.example.com and api.example.com.
```
## Security Considerations

- Only scan IP ranges and hosts you are authorized to assess
- Excessive concurrency can lead to rate-limiting or blacklisting
- Always validate certificate data manually before further use
- Timeout values may affect results in high-latency environments


## Troubleshooting

1. Ensure the Cero binary is installed and accessible from the command line
2. Confirm network access to the target IP or domain
3. Make sure the target is accessible and valid


## Acknowledgements

- [cero](https://github.com/glebarez/cero)
- [Model Context Protocol](https://github.com/modelcontextprotocol) 