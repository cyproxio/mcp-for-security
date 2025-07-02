# Scout Suite MCP

> Scout Suite MCP is a bridge that integrates Scout Suite, a multi-cloud security auditing tool, with the Model Context Protocol (MCP) ecosystem.


## Overview

Scout Suite MCP enables automated security auditing of cloud environments (AWS, Azure, GCP) using Scout Suite’s powerful capabilities, accessible through the standardized MCP interface. It allows AI assistants and automation tools to perform in-depth cloud configuration analysis, detect potential misconfigurations, and generate comprehensive security reports.


## Features

- Multi-cloud support (AWS, Azure, GCP)
- Service and region-based filtering
- Multiple authentication methods (profile or access keys)
- Summary or full report generation
- Custom IP range mapping support
- Seamless integration with AI assistants via MCP
- Clean JSON output for further automation or reporting

### Cloud Providers Supported

| Provider | Description |
|------|-------------|
|AWS|Audit AWS accounts using profile or access keys. Filter services and regions.
|Azure|(Coming soon) Audit Azure subscriptions with token-based authentication.
|GCP|(Coming soon) Audit GCP projects via service account JSON credentials.


## Installation

### Prerequisites

- Node.js (v16 or higher)
- Scout Suite installed on your system
- MCP SDK

### Setup

1. Clone this repository:
   ```
   git clone https://github.com/cyproxio/mcp-for-security
   cd Scout Suite-mcp
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

Configure the Scout Suite MCP server in your MCP client configuration:

```json
{
  "Scout Suite": {
    "command": "node",
    "args": [
      "/path/to/Scout Suite-mcp/build/index.js",
      "/path/to/scoutsuite binary"
    ]
  }
}
```


## Examples

### Audit an AWS Account

```javascript
const result = await mcp.tools.invoke("do-Scout Suite-aws", {
  profile: "prod-account",
  services: ["ec2", "s3", "iam"],
  regions: "us-east-1,eu-central-1",
  full_report: false
});
```


## Integration with AI Assistants
Scout Suite MCP is designed for direct use by AI agents to perform cloud security assessments through natural language requests.

Example conversation with an AI assistant:

```
User: Audit our AWS environment for misconfigurations.
AI: Running Scout Suite on AWS using profile "prod-account"...
[Scout Suite MCP invoked and returns the results] ...
```

## Troubleshooting

If you encounter issues:

1.	Ensure scout suite is installed and accessible in your terminal (which scout).
2.	Make sure your MCP configuration path points to the correct build output.
3.	Verify that the target parameter is a valid domain.
4.	Check logs for detailed error messages.

## Acknowledgments

- Scout Suite by NCC Group: https://github.com/nccgroup/Scout Suite
- Model Context Protocol: https://github.com/modelcontextprotocol