# MCP Tools Reference

## Playwright MCP Tools

### Navigation

| Tool | Parameters | Description |
|------|-----------|-------------|
| `browser_navigate` | `url: string` | Navigate to a URL |
| `browser_navigate_back` | none | Go back in browser history |
| `browser_wait_for` | `time?: number`, `selector?: string`, `state?: string` | Wait for time, element, or state |
| `browser_tabs` | none | List all open browser tabs |

### Element Interaction

| Tool | Parameters | Description |
|------|-----------|-------------|
| `browser_click` | `element: string`, `ref: string` | Click an element by ref |
| `browser_fill_form` | `ref: string`, `value: string` | Fill a form field |
| `browser_select_option` | `ref: string`, `values: string[]` | Select dropdown option(s) |
| `browser_hover` | `element: string`, `ref: string` | Hover over an element |
| `browser_drag` | `startRef: string`, `endRef: string` | Drag from one element to another |

### Input

| Tool | Parameters | Description |
|------|-----------|-------------|
| `browser_type` | `text: string`, `submit?: boolean` | Type text character by character |
| `browser_press_key` | `key: string` | Press keyboard key (Enter, Tab, etc.) |
| `browser_file_upload` | `paths: string[]` | Upload files to file input |
| `browser_handle_dialog` | `accept: boolean`, `promptText?: string` | Handle alert/confirm/prompt dialogs |

### Page Information

| Tool | Parameters | Description |
|------|-----------|-------------|
| `browser_snapshot` | none | Get accessibility tree (DOM snapshot) |
| `browser_take_screenshot` | `raw?: boolean` | Capture visual screenshot |
| `browser_console_messages` | none | Get browser console output |
| `browser_network_requests` | none | Get network activity log |
| `browser_evaluate` | `expression: string` | Execute JavaScript in page context |

### Browser Management

| Tool | Parameters | Description |
|------|-----------|-------------|
| `browser_resize` | `width: number`, `height: number` | Resize browser window |
| `browser_close` | none | Close the browser |
| `browser_install` | none | Install browser binaries |
| `browser_run_code` | `code: string` | Run arbitrary Playwright code |

---

## Jira MCP Tools (Conceptual)

| Tool | Parameters | Description |
|------|-----------|-------------|
| `create_issue` | `project: string`, `summary: string`, `description: string`, `type: string`, `priority?: string` | Create a new Jira issue |
| `get_issue` | `issueKey: string` | Get issue details |
| `search_issues` | `jql: string`, `maxResults?: number` | Search issues with JQL |
| `update_issue` | `issueKey: string`, `fields: object` | Update issue fields |
| `add_comment` | `issueKey: string`, `body: string` | Add a comment to an issue |
| `transition_issue` | `issueKey: string`, `transition: string` | Change issue status |
| `assign_issue` | `issueKey: string`, `accountId: string` | Assign issue to a user |
| `attach_file` | `issueKey: string`, `filePath: string` | Attach a file to an issue |

---

## File System MCP Tools

| Tool | Parameters | Description |
|------|-----------|-------------|
| `read_file` | `path: string` | Read file contents |
| `write_file` | `path: string`, `content: string` | Write content to a file |
| `list_directory` | `path: string` | List directory contents |
| `create_directory` | `path: string` | Create a new directory |
| `move_file` | `source: string`, `destination: string` | Move or rename a file |
| `search_files` | `path: string`, `pattern: string` | Search for files matching a pattern |
| `get_file_info` | `path: string` | Get file metadata (size, dates) |

---

## Common MCP Tool Patterns

### Pattern 1: Navigate and Verify
```
browser_navigate(url) -> browser_snapshot() -> verify content
```

### Pattern 2: Fill and Submit Form
```
browser_snapshot() -> browser_fill_form(ref, value) -> browser_click(submit_ref)
```

### Pattern 3: Read, Process, Write
```
read_file(template) -> process data -> write_file(output)
```

### Pattern 4: Test and Report
```
run tests -> parse results -> create_issue(for each failure)
```

---

## Tool Input Schema Format

Every MCP tool has a JSON Schema that describes its inputs:

```json
{
  "name": "browser_navigate",
  "description": "Navigate to a URL in the browser",
  "inputSchema": {
    "type": "object",
    "properties": {
      "url": {
        "type": "string",
        "description": "URL to navigate to"
      }
    },
    "required": ["url"]
  }
}
```

The AI model reads these schemas to understand:
- What parameters the tool accepts
- Which parameters are required vs optional
- What types and formats are expected
- What the tool does (from the description)
