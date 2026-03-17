# Playwright MCP Interview Questions & Answers

## Basic Questions

### Q1: What is Playwright MCP?
**A:** Playwright MCP is an MCP server that exposes Playwright's browser automation capabilities as MCP tools. It allows AI agents to control a browser through tool calls like `browser_navigate`, `browser_click`, `browser_fill_form`, etc., enabling AI-driven testing without writing Playwright scripts manually.

### Q2: How do you set up Playwright MCP?
**A:**
1. Install: `npm install @playwright/mcp`
2. Add to MCP settings:
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
3. The AI agent can now use browser automation tools.

### Q3: What is the difference between `browser_snapshot` and `browser_take_screenshot`?
**A:**
- **Snapshot** returns the accessibility tree (text-based DOM structure) with element **refs** for interaction. It's fast and allows the AI to "read" the page.
- **Screenshot** returns a visual image of the page. It's slower but allows the AI to "see" the page visually. Useful for visual verification but doesn't provide element refs.

### Q4: What are element refs in Playwright MCP?
**A:** Element refs are unique identifiers assigned to elements in the accessibility snapshot. When the AI takes a snapshot, each interactive element gets a ref. The AI uses these refs in subsequent tool calls (like `browser_click(ref)` or `browser_fill_form(ref, value)`) to target specific elements.

### Q5: What browsers does Playwright MCP support?
**A:** Playwright MCP supports Chromium (default), Firefox, and WebKit. You can specify the browser with `--browser firefox` or `--browser webkit` when starting the server.

## Intermediate Questions

### Q6: When would you use Playwright MCP vs writing Playwright scripts directly?
**A:**
- **Use Playwright MCP when:** doing exploratory testing, testing dynamic UIs, creating initial automation, or non-technical team members need to run tests
- **Use direct scripts when:** running in CI/CD, needing deterministic/repeatable tests, performance matters, or tests are well-defined and stable

### Q7: How does Playwright MCP handle dynamic content?
**A:** The AI agent can:
1. Use `browser_wait_for` to wait for elements or conditions
2. Take repeated snapshots to detect content changes
3. Use `browser_evaluate` to run JavaScript for complex waits
4. Make dynamic decisions based on page state (unlike static scripts)

### Q8: Can Playwright MCP handle file uploads?
**A:** Yes, using the `browser_file_upload` tool with `paths` parameter pointing to local file paths. The AI takes a snapshot to find the file input element, then uses the upload tool with the file path.

### Q9: How does Playwright MCP handle browser dialogs (alerts, confirms)?
**A:** Using the `browser_handle_dialog` tool with `accept: true/false` and optional `promptText` for prompt dialogs. The AI should call this when it expects a dialog to appear.

### Q10: What is `browser_evaluate` used for?
**A:** `browser_evaluate` executes arbitrary JavaScript in the page context. It's used for:
- Getting values not available in the accessibility tree
- Performing complex DOM queries
- Executing page-level operations (scroll, localStorage, etc.)
- Extracting data from the page

## Advanced Questions

### Q11: How would you integrate Playwright MCP into an STLC pipeline?
**A:** In an STLC pipeline:
1. **Planning** - AI uses file MCP to generate test plans from templates
2. **Design** - AI generates test cases based on application exploration via Playwright MCP snapshots
3. **Execution** - Either run Playwright scripts directly (for CI/CD) or use Playwright MCP for exploratory runs
4. **Reporting** - Parse results, create Jira tickets via Jira MCP, generate HTML reports
5. **Closure** - AI compiles summary from all phases

### Q12: How do you handle authentication-protected pages with Playwright MCP?
**A:**
1. Navigate to the login page
2. Use snapshot to find form fields
3. Fill credentials using `browser_fill_form`
4. Click the login button
5. Wait for authentication to complete
6. Continue testing protected pages
For persistent auth, you can save browser state or use API-based login.

### Q13: What are the performance considerations of Playwright MCP?
**A:**
- Each tool call adds AI reasoning time + network round-trip
- Snapshots are faster than screenshots
- Minimize unnecessary snapshots (only take when needed)
- Use `browser_evaluate` for bulk operations instead of multiple tool calls
- For performance-critical testing, use direct Playwright scripts instead

### Q14: How would you debug a failing Playwright MCP session?
**A:**
- Use `--headed` mode to see the browser
- Check `browser_console_messages` for JavaScript errors
- Use `browser_network_requests` to check API calls
- Take screenshots at key points
- Review the snapshot accessibility tree for element structure
- Check if element refs are stale (page may have reloaded)

### Q15: Can Playwright MCP be used for API testing?
**A:** While Playwright MCP is primarily for browser automation, you can:
- Use `browser_evaluate` to make fetch calls from the page context
- Use `browser_network_requests` to monitor API calls made by the page
- For pure API testing, a dedicated API testing tool or Playwright's APIRequestContext in scripts is more appropriate
