# Gowitness MCP

> Gowitness MCP is a bridge that connects gowitness, the powerful web screenshot and reconnaissance tool, with the Model Context Protocol (MCP) ecosystem.

## Overview

Gowitness MCP enables seamless integration of gowitness's web screenshot and reconnaissance capabilities into MCP-compatible applications and AI-powered workflow systems. This bridge allows you to leverage gowitness functionality through a standardized protocol, making it easier to incorporate web reconnaissance and visual documentation into automated security testing pipelines or AI assistant capabilities.

## Features

- Full gowitness functionality exposed through MCP
- Flexible storage options: save to disk or return binary data
- Batch screenshot processing for multiple URLs
- Support for both JPEG and PNG formats
- Advanced Chrome browser configuration options
- Database and JSON export capabilities
- File management and binary data access tools
- Easy integration with other MCP-compatible tools and systems
- Standardized input/output handling

## Installation

### Prerequisites

- Node.js (v16 or higher)
- Go (for installing gowitness)
- gowitness installed on your system
- MCP SDK

### Setup

1. Clone this repository:
    
    ```bash
    git clone https://github.com/cyproxio/mcp-for-security
    cd gowitness-mcp
    ```
    
2. Install gowitness:
    
    ```bash
    go install github.com/sensepost/gowitness@latest
    ```
    
3. Install dependencies and build:
    
    ```bash
    npm install && npm run build
    ```
    
4. Configure for Claude (automated):
    
    ```bash
    # Windows PowerShell
    .\setup-mcp.ps1
    
    # Unix/Linux/macOS
    ./build.sh
    ```
    

## Usage

### Basic Configuration

Configure the Gowitness MCP server in your MCP client configuration:

```json
{
  "mcpServers": {
    "gowitness": {
      "command": "node",
      "args": [
        "/path/to/gowitness-mcp/build/index.js",
        "gowitness"
      ],
      "env": {
        "PATH": "${PATH}"
      }
    }
  }
}
```

### Taking Screenshots

Once configured, you can capture web screenshots through the MCP interface using the available tools:

#### Single Screenshot (Binary Return)

```javascript
// Screenshot without saving to disk - returns binary data
const result = await mcp.tools.invoke("gowitness-screenshot", {
  url: "https://example.com"
});
```

#### Single Screenshot (Save to Directory)

```javascript
// Screenshot with file persistence
const result = await mcp.tools.invoke("gowitness-screenshot", {
  url: "https://example.com",
  screenshot_path: "./my-screenshots"
});
```

#### Batch Screenshots

```javascript
// Multiple URLs at once
const result = await mcp.tools.invoke("gowitness-batch-screenshot", {
  urls: [
    "https://example.com",
    "https://google.com",
    "https://github.com"
  ],
  screenshot_path: "./batch-screenshots"
});
```

### Available Tools

- **`gowitness-screenshot`** - Capture single URL screenshots with extensive options
- **`gowitness-batch-screenshot`** - Process multiple URLs efficiently
- **`gowitness-list-screenshots`** - List saved screenshot files with metadata
- **`gowitness-read-binary`** - Read screenshot files as binary data
- **`gowitness-report`** - Generate reports from captured data

### Advanced Options

Gowitness MCP supports all standard gowitness parameters including:

- **Browser Settings**: Window dimensions, user agents, proxy configuration
- **Capture Options**: Full-page screenshots, custom delays, timeouts
- **Output Formats**: JPEG/PNG format selection
- **Data Persistence**: Database logging, JSON export
- **Performance**: Concurrent threading for batch operations

See the [gowitness documentation](https://github.com/sensepost/gowitness) for complete parameter details.

## Integration with AI Assistants

Gowitness MCP is designed to work seamlessly with AI assistants that support the Model Context Protocol, enabling natural language interactions for web reconnaissance and documentation tasks.

Example conversation with an AI assistant:

```
User: Take screenshots of the main pages on example.com for documentation
AI: I'll capture screenshots of the main pages on example.com for you.

[AI uses Gowitness MCP to capture the screenshots]

I've successfully captured screenshots of:
- Homepage (example.com) - 1.2MB PNG
- About page (example.com/about) - 890KB PNG  
- Contact page (example.com/contact) - 756KB PNG

All screenshots have been saved to ./documentation-screenshots/
```

```
User: I need to document a suspicious website without saving files locally
AI: I'll capture the website and return the image data directly without saving files.

[AI uses binary return mode]

I've captured the website screenshot and returned it as binary data. The image shows...
[Analysis of the screenshot content]
```

## Storage Behavior

### Binary Mode (No Directory Specified)

- Returns screenshot as base64-encoded binary data
- Temporary files are automatically cleaned up
- Perfect for inline analysis and processing

### File Mode (Directory Specified)

- Saves screenshots to specified directory
- Files persist for later access and analysis
- Can optionally also return binary data

### Batch Mode

- Always saves to specified directory for organization
- Efficient concurrent processing of multiple URLs
- Comprehensive progress reporting

## Troubleshooting

If you encounter issues:

1. **"spawn gowitness ENOENT"**
    
    - Verify gowitness is installed: `gowitness --help`
    - Ensure gowitness is in your PATH
    - Try using absolute path in MCP configuration
2. **Screenshot capture failures**
    
    - Check URL accessibility and network connectivity
    - Verify target website allows automated access
    - Try increasing timeout and delay parameters
3. **Permission errors**
    
    - Ensure write permissions for screenshot directories
    - Check that Chrome/Chromium can be accessed by gowitness
4. **Binary return issues**
    
    - Use the file mode first to verify screenshots work
    - Then use list and read tools to access binary data
    - Check available files with `gowitness-list-screenshots`

## Acknowledgments

- Gowitness Project: https://github.com/sensepost/gowitness
- Model Context Protocol: https://github.com/modelcontextprotocol
- SensePost team for creating the excellent gowitness tool