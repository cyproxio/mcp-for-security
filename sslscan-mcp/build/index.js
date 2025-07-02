"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mcp_js_1 = require("@modelcontextprotocol/sdk/server/mcp.js");
const stdio_js_1 = require("@modelcontextprotocol/sdk/server/stdio.js");
const zod_1 = require("zod");
const child_process_1 = require("child_process");
const args = process.argv.slice(2);
if (args.length === 0) {
    console.error("Usage: sslscan-mcp <sslscan binary>");
    process.exit(1);
}
// Create server instance
const server = new mcp_js_1.McpServer({
    name: "sslscan",
    version: "1.0.0",
});
server.tool("do-sslscan", "Execute SSLScan, a comprehensive SSL/TLS scanner that identifies supported cipher suites, SSL/TLS versions, certificate information, and security vulnerabilities in SSL/TLS configurations of web servers and other services. It helps security professionals assess the security posture of SSL/TLS implementations.", {
    target: zod_1.z.string().url().describe("Target URL to scan (must begin with https:// for proper SSL/TLS scanning)"),
    sslscan_args: zod_1.z.array(zod_1.z.string()).describe(`--sni-name=<name>    Hostname for SNI
  --ipv4, -4           Only use IPv4
  --ipv6, -6           Only use IPv6

  --show-certificate   Show full certificate information
  --show-certificates  Show chain full certificates information
  --show-client-cas    Show trusted CAs for TLS client auth
  --no-check-certificate  Don't warn about weak certificate algorithm or keys
  --ocsp               Request OCSP response from server
  --pk=<file>          A file containing the private key or a PKCS#12 file
                       containing a private key/certificate pair
  --pkpass=<password>  The password for the private  key or PKCS#12 file
  --certs=<file>       A file containing PEM/ASN1 formatted client certificates

  --ssl2               Only check if SSLv2 is enabled
  --ssl3               Only check if SSLv3 is enabled
  --tls10              Only check TLSv1.0 ciphers
  --tls11              Only check TLSv1.1 ciphers
  --tls12              Only check TLSv1.2 ciphers
  --tls13              Only check TLSv1.3 ciphers
  --tlsall             Only check TLS ciphers (all versions)
  --show-ciphers       Show supported client ciphers
  --show-cipher-ids    Show cipher ids
  --iana-names         Use IANA/RFC cipher names rather than OpenSSL ones
  --show-times         Show handhake times in milliseconds

  --no-cipher-details  Disable EC curve names and EDH/RSA key lengths output
  --no-ciphersuites    Do not check for supported ciphersuites
  --no-compression     Do not check for TLS compression (CRIME)
  --no-fallback        Do not check for TLS Fallback SCSV
  --no-groups          Do not enumerate key exchange groups
  --no-heartbleed      Do not check for OpenSSL Heartbleed (CVE-2014-0160)
  --no-renegotiation   Do not check for TLS renegotiation
  --show-sigs          Enumerate signature algorithms

  --starttls-ftp       STARTTLS setup for FTP
  --starttls-imap      STARTTLS setup for IMAP
  --starttls-irc       STARTTLS setup for IRC
  --starttls-ldap      STARTTLS setup for LDAP
  --starttls-mysql     STARTTLS setup for MYSQL
  --starttls-pop3      STARTTLS setup for POP3
  --starttls-psql      STARTTLS setup for PostgreSQL
  --starttls-smtp      STARTTLS setup for SMTP
  --starttls-xmpp      STARTTLS setup for XMPP
  --xmpp-server        Use a server-to-server XMPP handshake
  --rdp                Send RDP preamble before starting scan

  --bugs               Enable SSL implementation bug work-arounds
  --no-colour          Disable coloured output
  --sleep=<msec>       Pause between connection request. Default is disabled
  --timeout=<sec>      Set socket timeout. Default is 3s
  --connect-timeout=<sec>  Set connect timeout. Default is 75s
  --verbose            Display verbose output
  --version            Display the program version
  --xml=<file>         Output results to an XML file. Use - for STDOUT.
`)
}, async ({ target, sslscan_args }) => {
    const sslscan = (0, child_process_1.spawn)(args[0], [...sslscan_args, target]);
    let output = '';
    // Handle stdout
    sslscan.stdout.on('data', (data) => {
        output += data.toString();
    });
    // Handle stderr
    sslscan.stderr.on('data', (data) => {
        output += data.toString();
    });
    // Handle process completion
    return new Promise((resolve, reject) => {
        sslscan.on('close', (code) => {
            if (code === 0) {
                resolve({
                    content: [{
                            type: "text",
                            text: output + "\n sslscan completed successfully"
                        }]
                });
            }
            else {
                reject(new Error(`sslscan exited with code ${code}`));
            }
        });
        sslscan.on('error', (error) => {
            reject(new Error(`Failed to start sslscan: ${error.message}`));
        });
    });
});
// Start the server
async function main() {
    const transport = new stdio_js_1.StdioServerTransport();
    await server.connect(transport);
    console.error("sslscan MCP Server running on stdio");
}
main().catch((error) => {
    console.error("Fatal error in main():", error);
    process.exit(1);
});
