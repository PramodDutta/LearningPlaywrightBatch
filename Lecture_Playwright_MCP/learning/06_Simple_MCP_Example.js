/**
 * Simple MCP Server Example
 *
 * This file demonstrates how to create a minimal MCP server
 * using the @modelcontextprotocol/sdk package.
 *
 * SETUP:
 *   npm install @modelcontextprotocol/sdk
 *
 * RUN:
 *   This server is meant to be launched by an MCP host (like Claude Code).
 *   To test it standalone, you can pipe JSON-RPC messages to stdin.
 *
 * WHAT IT DOES:
 *   Exposes two simple tools:
 *   1. greet - Returns a greeting message
 *   2. calculate - Performs basic math operations
 */

// ============================================================
// PART 1: Understanding MCP Server Structure
// ============================================================

/**
 * An MCP Server has three main components:
 *
 * 1. Server Definition - name, version, capabilities
 * 2. Tool Registration - define what tools are available
 * 3. Tool Handlers - implement the logic for each tool
 *
 * The flow is:
 *   Host connects -> Server lists tools -> Host calls tools -> Server returns results
 */

// ============================================================
// PART 2: The MCP Server Code
// ============================================================

/*
 * Below is the complete code for a simple MCP server.
 * Uncomment and run after installing @modelcontextprotocol/sdk
 */

/*
const { McpServer } = require('@modelcontextprotocol/sdk/server/mcp.js');
const { StdioServerTransport } = require('@modelcontextprotocol/sdk/server/stdio.js');
const { z } = require('zod');

// Step 1: Create the MCP Server
const server = new McpServer({
  name: 'simple-example-server',
  version: '1.0.0',
});

// Step 2: Register Tool - "greet"
server.tool(
  'greet',                              // Tool name
  'Generate a greeting message',         // Tool description
  {                                      // Input schema (using Zod)
    name: z.string().describe('Name of the person to greet'),
    style: z.enum(['formal', 'casual']).optional().describe('Greeting style'),
  },
  async ({ name, style }) => {           // Tool handler
    const greeting = style === 'formal'
      ? `Good day, ${name}. How may I assist you?`
      : `Hey ${name}! What's up?`;

    return {
      content: [
        { type: 'text', text: greeting }
      ],
    };
  }
);

// Step 3: Register Tool - "calculate"
server.tool(
  'calculate',
  'Perform a basic math calculation',
  {
    operation: z.enum(['add', 'subtract', 'multiply', 'divide']).describe('Math operation'),
    a: z.number().describe('First number'),
    b: z.number().describe('Second number'),
  },
  async ({ operation, a, b }) => {
    let result;
    switch (operation) {
      case 'add':      result = a + b; break;
      case 'subtract': result = a - b; break;
      case 'multiply': result = a * b; break;
      case 'divide':
        if (b === 0) {
          return {
            content: [{ type: 'text', text: 'Error: Division by zero' }],
            isError: true,
          };
        }
        result = a / b;
        break;
    }

    return {
      content: [
        { type: 'text', text: `${a} ${operation} ${b} = ${result}` }
      ],
    };
  }
);

// Step 4: Start the server with stdio transport
async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error('Simple MCP Server running on stdio');
}

main().catch(console.error);
*/

// ============================================================
// PART 3: How to Use This Server
// ============================================================

/**
 * To use this MCP server with Claude Code:
 *
 * 1. Save this file and install dependencies:
 *    npm install @modelcontextprotocol/sdk zod
 *
 * 2. Add to your Claude Code MCP settings:
 *    {
 *      "mcpServers": {
 *        "simple-example": {
 *          "command": "node",
 *          "args": ["path/to/06_Simple_MCP_Example.js"]
 *        }
 *      }
 *    }
 *
 * 3. In Claude Code, you can now use:
 *    - "Greet John formally" -> calls greet(name: "John", style: "formal")
 *    - "Calculate 42 + 58" -> calls calculate(operation: "add", a: 42, b: 58)
 */

// ============================================================
// PART 4: Simulated Demo (runs without MCP SDK)
// ============================================================

/**
 * Since the MCP SDK may not be installed, here's a runnable
 * simulation showing the tool call flow.
 */

function simulateMCPServer() {
  console.log('=== MCP Server Simulation ===\n');

  // Simulate tool registration
  const tools = {
    greet: {
      name: 'greet',
      description: 'Generate a greeting message',
      inputSchema: {
        type: 'object',
        properties: {
          name: { type: 'string', description: 'Name of the person to greet' },
          style: { type: 'string', enum: ['formal', 'casual'], description: 'Greeting style' },
        },
        required: ['name'],
      },
      handler: ({ name, style }) => {
        return style === 'formal'
          ? `Good day, ${name}. How may I assist you?`
          : `Hey ${name}! What's up?`;
      },
    },
    calculate: {
      name: 'calculate',
      description: 'Perform a basic math calculation',
      inputSchema: {
        type: 'object',
        properties: {
          operation: { type: 'string', enum: ['add', 'subtract', 'multiply', 'divide'] },
          a: { type: 'number' },
          b: { type: 'number' },
        },
        required: ['operation', 'a', 'b'],
      },
      handler: ({ operation, a, b }) => {
        const ops = { add: (a, b) => a + b, subtract: (a, b) => a - b, multiply: (a, b) => a * b, divide: (a, b) => b !== 0 ? a / b : 'Error: Division by zero' };
        return `${a} ${operation} ${b} = ${ops[operation](a, b)}`;
      },
    },
  };

  // Step 1: Tool Discovery
  console.log('Step 1: Tool Discovery (tools/list)');
  console.log('Request:  { method: "tools/list" }');
  console.log('Response:', JSON.stringify(Object.values(tools).map(t => ({
    name: t.name,
    description: t.description,
  })), null, 2));
  console.log();

  // Step 2: Tool Call - Greet
  console.log('Step 2: Tool Call - greet');
  console.log('Request:  { method: "tools/call", params: { name: "greet", arguments: { name: "Pramod", style: "formal" } } }');
  const greetResult = tools.greet.handler({ name: 'Pramod', style: 'formal' });
  console.log('Response:', greetResult);
  console.log();

  // Step 3: Tool Call - Calculate
  console.log('Step 3: Tool Call - calculate');
  console.log('Request:  { method: "tools/call", params: { name: "calculate", arguments: { operation: "multiply", a: 7, b: 6 } } }');
  const calcResult = tools.calculate.handler({ operation: 'multiply', a: 7, b: 6 });
  console.log('Response:', calcResult);
  console.log();

  console.log('=== Simulation Complete ===');
  console.log('\nThis demonstrates the MCP flow:');
  console.log('1. Host asks server for available tools');
  console.log('2. Host sends tool call requests with arguments');
  console.log('3. Server executes the tool and returns results');
}

// Run the simulation
simulateMCPServer();
