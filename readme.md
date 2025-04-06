# MCP for Security Tools

This repository contains Model Context Protocol (MCP) server implementations for various security testing tools, making them accessible through a standardized interface.

## Tools

### FFUF MCP Server
A server implementation that wraps the FFUF fuzzing tool, allowing it to be used through the MCP interface.

#### Features
- URL-based fuzzing
- Support for all FFUF command line arguments

#### Parameters
- `url`: Target URL to fuzz
- `ffuf_args`: Array of additional FFUF arguments


#### Usage
```bash
ffuf-mcp <ffuf binary>
```

#### Claude Configuration

```json
 "ffuf": {
      "command": "node",
      "args": [
        "/path/to/build/index.js",
        "ffuf"
      ]
    }
```

### SQLmap MCP Server
A server implementation that wraps the SQLmap SQL injection testing tool, allowing it to be used through the MCP interface.

#### Features
- URL-based SQL injection testing
- Support for all SQLmap command line arguments
- Error handling and status reporting
- Comprehensive SQL injection testing capabilities

#### Parameters
- `url`: Target URL to test for SQL injection
- `sqlmap_args`: Array of additional SQLmap arguments


#### Usage
```bash
sqlmap-mcp <sqlmap binary or python3 sqlmap>
```


#### Claude Configuration

```json
 "sqlmap": {
      "command": "node",
      "args": [
        "/path/to/build/index.js",
        "sqlmap"
      ]
    }
```


### Masscan MCP Server
A server implementation that wraps the Masscan tool, allowing it to be used through the MCP interface.

#### Features
- Target based Port Scanning
- Support for all Masscan command line arguments
- Error handling and status reporting

#### Parameters
- `target`: Target ip to scanning ports 
- `port`: Port nubmers to target ip 
- `masscan_args`: Array of additional masscan arguments


#### Usage
```bash
masscan-mcp <masscan>
```


#### Claude Configuration

```json
 "masscan": {
      "command": "node",
      "args": [
        "/path/to/build/index.js",
        "masscan"
      ]
    }
```

### nmap MCP Server
A server implementation that wraps the nmap scanning tool, allowing it to be used through the MCP interface.

#### Features
- Target based port scanning 
- Support for all nmap command line arguments

#### Parameters
- `target`: Target ìp to fuzz
- `nmap_args`: Array of additional nmap arguments


#### Usage
```bash
nmap-mcp <nmap binary>
```

#### Claude Configuration

```json
 "nmap": {
      "command": "node",
      "args": [
        "/path/to/build/index.js",
        "nmap"
      ]
    }
```


### Mobsf MCP Server
A server implementation that wraps the Mobsf tool, allowing it to be used through the MCP interface.

#### Features
- MobSF functionality exposed through MCP
- Simple configuration and setup
- Easy integration with other MCP-compatible tools and systems
- Standardized input/output handling
- Support for Android (APK), iOS (IPA), and Windows (APPX) mobile applications

#### Parameters
- `base_url`:  The MobSF server URL (e.g., `http://localhost:8000`)
- `api_key `: Your MobSF API key


#### Usage
```bash
mobsf-mcp <base_url> <api_key>
```

#### Claude Configuration

```json
 "mobsf": {
      "command": "node",
      "args": [
         "/path/to/build/index.js",
        "http://127.0.0.1:8000",
        "<api key>"
      ]
    }
```


### Nuclei MCP Server
A server implementation that wraps the nuclei tool, allowing it to be used through the MCP interface.

#### Features
- Simple configuration and setup
- Easy integration with other MCP-compatible tools and systems
- Standardized input/output handling
- Access to Nuclei's extensive template library

#### Parameters
- `url`: The target URL to scan (required)
- `tags`: Comma-separated list of template tags to filter which checks to run (optional)


#### Usage
```bash
nuclei-mcp <nuclei>
```

#### Claude Configuration

```json
 "nuclei": {
      "command": "node",
      "args": [
        "/path/to/build/index.js",
        "</usr/local/go/bin/nuclei>"
      ]
    }
```


### Sslcan MCP Server
A server implementation that wraps the sslscan tool, allowing it to be used through the MCP interface.

#### Features
- Full SSLScan functionality exposed through MCP
- Simple configuration and setup
- Easy integration with other MCP-compatible tools and systems
- Standardized input/output handling
- Support for all SSLScan options and configurations

#### Parameters
- `target`: The target URL to scan (required)
- `sslscan_args`: Array of additional sslscan arguments


#### Usage
```bash
sslscan-mcp <sslscan>
```

#### Claude Configuration

```json
 "sslscan": {
      "command": "node",
      "args": [
        "/path/to/build/index.js",
        "<sslscan>"
      ]
    }
```


## TO-DO Tools 
- amass
- massdns
- gowitness
- httpx
- ...

## Development

The project uses TypeScript and the Model Context Protocol SDK. To contribute:

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## License