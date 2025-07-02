# WPSCAN MCP

> WPScan MCP is a bridge that connects WPScan, a powerful WordPress vulnerability scanner, with the Model Context Protocol (MCP) ecosystem.


## Overview

WPScan MCP enables seamless integration of WPScan’s advanced WordPress vulnerability scanning features into MCP-compatible applications and AI-powered security workflows. This allows for automated, standardized reconnaissance and enumeration of WordPress websites, ideal for penetration testing pipelines and AI security assistants.

## Installation

### Prerequisites

- Node.js (v16+)
- MCP SDK
- WPScan installed and executable from the command line

### Setup

1. Clone this repository:
   ```
   git clone https://github.com/cyproxio/mcp-for-security
   cd wpscan-mcp
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
  "wpscan": {
    "command": "node",
    "args": [
      "/path/to/wpscan-mcp/build/index.js",
      "/usr/bin/wpscan"
    ]
  }
}
```

### Example Usage

#### Basic Scan
```javascript
const result = await mcp.tools.invoke("do-wpscan", {
  url: "https://example.com",
  enumerate: ["vp", "vt", "tt", "cb", "dbe"]
});
```

#### Stealthier Scan with Proxy and Random Agent
```javascript
const result = await mcp.tools.invoke("do-wpscan", {
  url: "https://example.com",
  detection_mode: "passive",
  proxy: "http://127.0.0.1:8080",
  random_user_agent: true
});
```

### Supported Parameters

- `url` (required): The target WordPress site to scan
- `detection_mode`: "mixed" (default), "passive", or "aggressive"
- `random_user_agent`: Whether to rotate user agents to avoid detection
- `max_threads`: Number of threads to speed up scanning (default: 5)
- `disable_tls_checks`: Disable TLS certificate validation
- `proxy`: Proxy to route traffic through (e.g., http://127.0.0.1:8080)
- `cookies`: Cookie string to use (e.g., PHPSESSID=1234; logged_in=true)
- `force`: Force scanning even if WP is not detected
- `enumerate`: Array of enumeration types:
  - `vp`: Vulnerable plugins
  - `ap`: All plugins
  - `p`: Popular plugins
  - `vt`: Vulnerable themes
  - `at`: All themes
  - `t`: Popular themes
  - `tt`: Timthumb vulnerabilities
  -	`cb`: Configuration backups
  -	`dbe`: Database exports

## Integration with AI Assistants
WPScan MCP works seamlessly with AI assistants that support the Model Context Protocol. This allows natural language commands to trigger WPScan in real-time.

```
User: Scan https://example.com for WordPress vulnerabilities.
AI: Running WPScan against https://example.com using passive detection...

[WPScan MCP runs and returns findings]

Results: 3 vulnerable plugins found, 1 outdated theme, timthumb vulnerability detected.
```
## Security Considerations

- Only scan sites you own or have explicit permission to test
- Aggressive scanning can trigger security alerts on target websites
- Passive mode is recommended for stealthy enumeration
- Always review output manually before making security decisions


## Troubleshooting

1. Ensure WPScan is installed and executable from CLI
2. Validate proxy and TLS settings are correct
3. Make sure the URL is accessible and valid
4. Use verbose output or server logs for error tracking


## Acknowledgements

- [WPScan](https://github.com/wpscanteam/wpscan)
- [Model Context Protocol](https://github.com/modelcontextprotocol) 