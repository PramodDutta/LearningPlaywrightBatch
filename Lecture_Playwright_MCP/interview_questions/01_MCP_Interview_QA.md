# MCP Interview Questions & Answers

## Basic Questions

### Q1: What is MCP?
**A:** MCP (Model Context Protocol) is an open standard created by Anthropic that provides a unified protocol for AI models to connect to external tools, data sources, and services. It standardizes how AI applications discover and use tools, similar to how USB-C provides a standard connector for devices.

### Q2: What problem does MCP solve?
**A:** Before MCP, connecting AI to external tools required custom integrations for each tool with different APIs, auth methods, and data formats. MCP provides one standardized protocol to connect to any tool, reducing integration complexity from N custom integrations to 1 protocol.

### Q3: What are the three main roles in MCP?
**A:**
1. **Host** - The application running the AI model (e.g., Claude Code, Claude Desktop)
2. **Client** - The protocol handler inside the host that manages MCP connections
3. **Server** - The tool provider that exposes capabilities (e.g., Playwright MCP, Jira MCP)

### Q4: What transport mechanisms does MCP support?
**A:** MCP supports two transports:
- **stdio** - Server runs as a child process, communicating through stdin/stdout. Best for local tools.
- **HTTP/SSE** - Server runs as a web service, using HTTP POST for requests and Server-Sent Events for responses. Best for remote/shared tools.

### Q5: What message format does MCP use?
**A:** MCP uses **JSON-RPC 2.0** format. Each message has a `jsonrpc` version, an `id`, a `method` (like `tools/call`), and `params` with the tool name and arguments.

## Intermediate Questions

### Q6: How does tool discovery work in MCP?
**A:** When an MCP client connects to a server, it sends an `initialize` request followed by a `tools/list` request. The server responds with a list of all available tools, each with a name, description, and JSON Schema for its input parameters. The AI model uses these schemas to understand what tools are available and how to use them.

### Q7: What is the difference between MCP tools and resources?
**A:**
- **Tools** are actions the AI can perform (e.g., `browser_click`, `create_issue`). They take input and produce output.
- **Resources** are data sources the AI can read (e.g., file contents, database records). They provide context without side effects.

### Q8: How does MCP handle security?
**A:** MCP security operates at multiple levels:
- The **host** controls which servers can be connected
- **User approval** is required before tool execution (in most hosts)
- Servers can require **authentication** (API tokens, OAuth)
- The transport layer can use **TLS encryption** for HTTP connections
- Tool calls are **logged** for auditing

### Q9: Can multiple MCP servers be connected simultaneously?
**A:** Yes. A host can maintain connections to multiple MCP servers at the same time. For example, Claude Code can be connected to Playwright MCP (for browser automation), Jira MCP (for issue tracking), and GitHub MCP (for repository management) simultaneously. Each connection is independent.

### Q10: How would you create a custom MCP server?
**A:** Using the `@modelcontextprotocol/sdk` package:
1. Create a `McpServer` instance with name and version
2. Register tools using `server.tool()` with name, description, input schema (Zod), and handler function
3. Connect the server to a transport (stdio or HTTP)
4. The handler function receives arguments and returns content array

## Advanced Questions

### Q11: What are MCP prompts and how do they differ from tools?
**A:** MCP prompts are pre-built templates that servers can offer to hosts. While tools perform actions, prompts provide structured conversation starters or workflows. For example, a testing MCP server might offer a "generate-test-plan" prompt that guides the AI through a structured test planning process.

### Q12: How would you handle errors in an MCP tool response?
**A:** MCP tool responses can include an `isError: true` field to indicate failure. The content array should contain a descriptive error message. The AI model can then decide how to handle the error - retry, try an alternative approach, or report the error to the user.

### Q13: What is the lifecycle of an MCP connection?
**A:**
1. **Initialize** - Client sends capabilities, server responds with its capabilities
2. **Discovery** - Client requests available tools, resources, and prompts
3. **Usage** - Client sends tool calls, server executes and returns results
4. **Shutdown** - Either side can close the connection gracefully

### Q14: How does MCP compare to function calling in LLMs?
**A:** Function calling is a feature within a single LLM API where the model can request to call pre-defined functions. MCP is a broader protocol that standardizes how AI applications connect to external tool servers. MCP builds on top of function calling by providing a standard way to discover, describe, and invoke tools across different servers and transports.

### Q15: What are the limitations of MCP?
**A:**
- **Latency** - Each tool call adds round-trip time between client and server
- **Statelessness** - MCP doesn't maintain state between tool calls (servers must handle this)
- **Security surface** - Each connected server is a potential attack vector
- **Ecosystem maturity** - Still growing; not all tools have MCP servers yet
- **Debugging** - Tool call chains can be hard to trace and debug

### Q16: How would you test an MCP server?
**A:**
- Unit test individual tool handlers
- Integration test with a mock MCP client
- End-to-end test by connecting to a real host (Claude Code)
- Test error handling with invalid inputs
- Test concurrent tool calls
- Verify JSON-RPC message format compliance

### Q17: What is the role of JSON Schema in MCP?
**A:** JSON Schema defines the input parameters for each tool. It tells the AI model:
- What parameters the tool accepts
- Which are required vs optional
- Data types and formats
- Descriptions for each parameter
The AI uses this schema to generate correct tool call arguments without prior training on the specific tool.

### Q18: How can MCP be used in CI/CD pipelines?
**A:** MCP servers can be integrated into CI/CD by:
- Running Playwright MCP for automated browser testing
- Using Jira MCP to create tickets for failures
- Using GitHub MCP to comment on PRs with test results
- Using file system MCP to generate and store reports
- Orchestrating all of these through a pipeline script

### Q19: What is the difference between MCP and traditional REST APIs?
**A:**
| MCP | REST API |
|-----|----------|
| Standardized tool discovery | Read docs manually |
| AI-native tool schemas | Human-oriented endpoints |
| Built-in type system (JSON Schema) | Various documentation formats |
| Bidirectional (SSE) | Request-response only |
| One protocol for all tools | Different design per API |

### Q20: How do you handle authentication in MCP servers?
**A:** Authentication can be handled at multiple levels:
- **Environment variables** - API keys passed via env vars in server config
- **OAuth flow** - Server handles token exchange
- **Basic auth** - Username/password in headers (for REST-based servers)
- **Transport-level** - TLS client certificates for HTTP transport
- The host typically manages and injects credentials into the server process.
