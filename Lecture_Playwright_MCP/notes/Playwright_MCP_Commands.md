# Playwright MCP Commands Reference

## Setup
```bash
npm install @playwright/mcp
```

## Configuration
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

## Command Options
```bash
npx @playwright/mcp                    # Default (headless, Chromium)
npx @playwright/mcp --headed           # See the browser
npx @playwright/mcp --browser firefox  # Use Firefox
npx @playwright/mcp --viewport-size 1280x720  # Set viewport
```

## All Tools

### Navigation
| Tool | Params | Use |
|------|--------|-----|
| `browser_navigate` | `url` | Go to a URL |
| `browser_navigate_back` | - | Go back |
| `browser_wait_for` | `time`, `selector`, `state` | Wait |
| `browser_tabs` | - | List tabs |

### Click & Input
| Tool | Params | Use |
|------|--------|-----|
| `browser_click` | `element`, `ref` | Click element |
| `browser_fill_form` | `ref`, `value` | Fill input |
| `browser_select_option` | `ref`, `values` | Select dropdown |
| `browser_hover` | `element`, `ref` | Hover |
| `browser_drag` | `startRef`, `endRef` | Drag & drop |
| `browser_type` | `text`, `submit` | Type text |
| `browser_press_key` | `key` | Press key |
| `browser_file_upload` | `paths` | Upload file |
| `browser_handle_dialog` | `accept`, `promptText` | Handle alerts |

### Page Info
| Tool | Params | Use |
|------|--------|-----|
| `browser_snapshot` | - | Get accessibility tree + refs |
| `browser_take_screenshot` | `raw` | Visual capture |
| `browser_console_messages` | - | Console logs |
| `browser_network_requests` | - | Network activity |
| `browser_evaluate` | `expression` | Run JS in page |

### Management
| Tool | Params | Use |
|------|--------|-----|
| `browser_resize` | `width`, `height` | Resize window |
| `browser_close` | - | Close browser |
| `browser_install` | - | Install browsers |
| `browser_run_code` | `code` | Run PW code |

## Common Workflows

### Login Test
```
1. browser_navigate("/login")
2. browser_snapshot()          → get field refs
3. browser_fill_form(username_ref, "user")
4. browser_fill_form(password_ref, "pass")
5. browser_click(login_button_ref)
6. browser_snapshot()          → verify result
```

### Visual Check
```
1. browser_navigate("/page")
2. browser_take_screenshot()   → visual capture
3. browser_snapshot()          → DOM structure
```
