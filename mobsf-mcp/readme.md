# MobSF MCP

> MobSF MCP is a bridge that connects Mobile Security Framework (MobSF), the automated mobile application security assessment tool, with the Model Context Protocol (MCP) ecosystem.

## Overview

MobSF MCP enables seamless integration of MobSF's powerful mobile application security testing capabilities into MCP-compatible applications and AI-powered workflow systems. This bridge allows you to leverage MobSF's functionality through a standardized protocol, making it easier to incorporate into automated security testing pipelines or AI assistant capabilities.

## Features

- MobSF functionality exposed through MCP
- Simple configuration and setup
- Easy integration with other MCP-compatible tools and systems
- Standardized input/output handling
- Support for Android (APK), iOS (IPA), and Windows (APPX) mobile applications

## Installation

### Prerequisites

- Node.js (v16 or higher)
- MobSF server installed and running
- MCP SDK

### Setup

1. Clone this repository:
 ```
 git clone https://github.com/cyproxio/mcp-for-security
 cd mobsf-mcp
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

Configure the MobSF MCP server in your MCP client configuration:

```json
{
  "mobsf": {
    "command": "node",
    "args": [
      "/path/to/mobsf-mcp/build/index.js",
      "http://localhost:8000",
      "your_mobsf_api_key"
    ]
  }
}
```

The configuration requires two parameters:
- The MobSF server URL (e.g., `http://localhost:8000`)
- Your MobSF API key

### Available Tools

MobSF MCP provides several tools for interacting with the MobSF server:

#### uploadFile

Upload a mobile application for analysis.

```javascript
const result = await mcp.tools.invoke("uploadFile", {
  file: "/path/to/application.apk"
});
```

#### scanFile

Scan a previously uploaded mobile application.

```javascript
const result = await mcp.tools.invoke("scanFile", {
  hash: "file_hash_from_upload",
  reScan: false // Optional, set to true to force a rescan
});
```

#### getScanLogs

Retrieve detailed scan logs for a previously analyzed application.

```javascript
const result = await mcp.tools.invoke("getScanLogs", {
  hash: "file_hash"
});
```

#### getJsonReport

Generate and retrieve a comprehensive security analysis report in JSON format.

```javascript
const result = await mcp.tools.invoke("getJsonReport", {
  hash: "file_hash"
});
```

#### getRecentScans

Retrieve a list of recently performed security scans.

```javascript
const result = await mcp.tools.invoke("getRecentScans", {
  page: 1,
  pageSize: 10
});
```

## Examples

### Complete Analysis Workflow

```javascript
// Step 1: Upload the mobile application
const uploadResult = await mcp.tools.invoke("uploadFile", {
  file: "/path/to/application.apk"
});

const fileHash = uploadResult.hash;

// Step 2: Scan the uploaded application
const scanResult = await mcp.tools.invoke("scanFile", {
  hash: fileHash
});

// Step 3: Generate a security report
const reportResult = await mcp.tools.invoke("getJsonReport", {
  hash: fileHash
});

// Process the report data as needed
```

### Viewing Recent Scans

```javascript
const recentScans = await mcp.tools.invoke("getRecentScans", {
  page: 1,
  pageSize: 20
});

// Process the list of recent scans
```

## Integration with AI Assistants

MobSF MCP is designed to work seamlessly with AI assistants that support the Model Context Protocol, enabling natural language interactions for mobile application security testing.

Example conversation with an AI assistant:

```
User: Analyze this Android app for security vulnerabilities: /Downloads/my_app.apk
AI: I'll help you analyze this Android application using MobSF.

[AI uses MobSF MCP to upload and scan the app, then presents the results]

Security Analysis Summary for my_app.apk:
- 3 Critical vulnerabilities detected
- 7 High-risk issues identified
- Insecure data storage practices found
- Excessive permissions requested
...
```

## Security Considerations

- Always analyze applications you have permission to test
- Keep your MobSF server and API keys secure
- Consider the privacy implications of uploading sensitive applications
- Use isolated environments for testing potentially malicious applications

## Troubleshooting

If you encounter issues:

1. Verify the MobSF server is running and accessible
2. Check that your API key is correct and has not expired
3. Ensure file paths are correct and the files are accessible
4. Review server logs for detailed error messages



## Acknowledgments

- MobSF Project: https://github.com/MobSF/Mobile-Security-Framework-MobSF
- Model Context Protocol: https://github.com/modelcontextprotocol