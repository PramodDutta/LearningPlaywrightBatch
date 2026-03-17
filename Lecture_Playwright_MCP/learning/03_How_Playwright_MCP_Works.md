# How Playwright MCP Works

## What is Playwright MCP?

**Playwright MCP** is an MCP server that exposes Playwright's browser automation capabilities as MCP tools. Instead of writing Playwright scripts manually, an AI agent can use these tools to control a browser through natural language instructions.

## How to Set Up Playwright MCP

### Installation

```bash
npm install @playwright/mcp
```

### Configure in Claude Code

Add to your MCP settings (`.claude/settings.json` or project settings):

```json
{
  "mcpServers": {
    "playwright": {
      "command": "npx",
      "args": ["@playwright/mcp@latest"]
    }
  }
}
```

### Configure in Claude Desktop

Add to `claude_desktop_config.json`:

```json
{
  "mcpServers": {
    "playwright": {
      "command": "npx",
      "args": ["@playwright/mcp@latest"],
      "env": {
        "DISPLAY": ":1"
      }
    }
  }
}
```

### Options

```bash
# Run in headed mode (see the browser)
npx @playwright/mcp --headed

# Use a specific browser
npx @playwright/mcp --browser firefox

# Set viewport size
npx @playwright/mcp --viewport-size 1280x720
```

## Available Playwright MCP Tools

### Navigation Tools

| Tool | Description | Key Parameters |
|------|-------------|----------------|
| `browser_navigate` | Navigate to a URL | `url` (string) |
| `browser_navigate_back` | Go back in history | none |
| `browser_wait_for` | Wait for condition | `time` (ms), `selector`, `state` |

### Interaction Tools

| Tool | Description | Key Parameters |
|------|-------------|----------------|
| `browser_click` | Click an element | `element` (description), `ref` (element ref) |
| `browser_fill_form` | Fill form fields | `ref`, `value` |
| `browser_select_option` | Select dropdown option | `ref`, `values` |
| `browser_hover` | Hover over element | `element`, `ref` |
| `browser_drag` | Drag and drop | `startRef`, `endRef` |
| `browser_type` | Type text character by character | `text`, `submit` |
| `browser_press_key` | Press a keyboard key | `key` (e.g., "Enter", "Tab") |

### Information Tools

| Tool | Description | Key Parameters |
|------|-------------|----------------|
| `browser_snapshot` | Get accessibility tree snapshot | none |
| `browser_take_screenshot` | Capture screenshot | `raw` (boolean) |
| `browser_console_messages` | Get console logs | none |
| `browser_network_requests` | Get network activity | none |

### Form & File Tools

| Tool | Description | Key Parameters |
|------|-------------|----------------|
| `browser_file_upload` | Upload a file | `paths` (file paths) |
| `browser_handle_dialog` | Accept/dismiss dialogs | `accept` (boolean), `promptText` |

### Advanced Tools

| Tool | Description | Key Parameters |
|------|-------------|----------------|
| `browser_evaluate` | Run JavaScript in page | `expression` (JS code) |
| `browser_run_code` | Run Playwright code snippet | `code` (Playwright script) |
| `browser_tabs` | List open tabs | none |
| `browser_resize` | Resize browser window | `width`, `height` |
| `browser_close` | Close the browser | none |
| `browser_install` | Install browser binaries | none |

## How It Works: Step by Step

### Example: Testing a Login Flow

When you tell Claude "Test the login on the-internet.herokuapp.com", here's what happens:

**Step 1: AI decides to navigate**
```
AI thinks: "I need to go to the login page first"
AI calls: browser_navigate(url: "https://the-internet.herokuapp.com/login")
```

**Step 2: AI takes a snapshot to see the page**
```
AI calls: browser_snapshot()
Result: Shows form with username field, password field, login button
```

**Step 3: AI fills the form**
```
AI calls: browser_fill_form(ref: "username_field_ref", value: "tomsmith")
AI calls: browser_fill_form(ref: "password_field_ref", value: "SuperSecretPassword!")
```

**Step 4: AI clicks login**
```
AI calls: browser_click(ref: "login_button_ref")
```

**Step 5: AI verifies the result**
```
AI calls: browser_snapshot()
Result: Shows "You logged into a secure area!" message
```

## Snapshot vs Screenshot

### Snapshot (`browser_snapshot`)
- Returns the **accessibility tree** (text-based DOM structure)
- AI can "read" the page structure
- Provides element **refs** for interaction
- Fast and lightweight
- **Best for**: Finding elements, reading content, getting refs

### Screenshot (`browser_take_screenshot`)
- Returns a **visual image** of the page
- AI can "see" the page visually
- Useful for visual verification
- Slower and larger payload
- **Best for**: Visual checks, debugging layout issues

## Playwright MCP vs Direct Playwright Scripts

| Aspect | Direct Playwright | Playwright MCP |
|--------|------------------|----------------|
| **Who writes code** | Developer | AI agent |
| **Flexibility** | Fixed script | Dynamic decisions |
| **Error handling** | Pre-coded | AI adapts in real-time |
| **Setup** | Write test files | Configure MCP server |
| **Maintenance** | Update scripts manually | AI adjusts automatically |
| **Speed** | Faster (no AI overhead) | Slower (AI reasoning) |
| **Best for** | CI/CD pipelines | Exploratory testing, one-off tasks |
| **Reliability** | Deterministic | May vary between runs |

### When to Use Each

**Use Direct Playwright when:**
- Running tests in CI/CD pipelines
- You need deterministic, repeatable tests
- Performance matters
- Tests are well-defined and stable

**Use Playwright MCP when:**
- Doing exploratory testing
- Testing dynamic or changing UIs
- You want AI to discover and test features
- Creating initial test automation (then convert to scripts)
- Non-technical team members need to run tests

## Real-World Example: AI Agent Testing a Todo App

```
User: "Test the todo app at todoapp.com"

AI Agent's Actions:
1. browser_navigate("https://todoapp.com")
2. browser_snapshot() -> sees input field and empty list
3. browser_fill_form(input_ref, "Buy groceries")
4. browser_press_key("Enter")
5. browser_snapshot() -> sees "Buy groceries" in the list
6. browser_fill_form(input_ref, "Walk the dog")
7. browser_press_key("Enter")
8. browser_snapshot() -> sees both items
9. browser_click(checkbox_ref) -> marks first item done
10. browser_snapshot() -> verifies item is crossed out
11. browser_take_screenshot() -> visual proof

AI Agent: "I tested the todo app. I was able to:
- Add items (Buy groceries, Walk the dog)
- Mark items as complete
- Verify the UI updates correctly
See the screenshot for visual confirmation."
```

## Security Considerations

- Playwright MCP runs a real browser - it can access any URL
- Be careful with credentials (use environment variables)
- The AI agent can see page content including sensitive data
- Use headed mode during development to monitor actions
- In CI/CD, run in headless mode with restricted network access

## Summary

- Playwright MCP turns browser automation into MCP tools
- AI agents use `browser_snapshot` to "see" pages and get element refs
- They use `browser_click`, `browser_fill_form` etc. to interact
- It's best for exploratory testing and AI-driven test automation
- Direct Playwright scripts are still better for CI/CD pipelines
