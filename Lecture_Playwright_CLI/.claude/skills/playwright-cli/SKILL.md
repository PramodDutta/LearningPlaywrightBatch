---
name: playwright-cli
description: >
  Automate browser interactions using Playwright CLI tools.
  Covers both standard CLI (npx playwright) for test execution,
  codegen, debugging, reporting, and the new @playwright/cli
  for AI-agent-friendly persistent browser sessions.
triggers:
  - playwright
  - codegen
  - browser test
  - e2e test
  - record test
  - login automation
  - headed mode
  - trace viewer
  - html report
  - playwright cli
  - test generation
---

# Playwright CLI Skill

Use this skill when the user asks to run Playwright tests, record tests with codegen, debug tests, view reports/traces, manage browsers, or automate browser interactions via the CLI.

## Standard CLI Commands (npx playwright)

### Run Tests
```bash
npx playwright test                         # Run all tests
npx playwright test --headed                # Visible browser
npx playwright test --debug                 # Debug with Inspector
npx playwright test --ui                    # Interactive UI mode
npx playwright test --grep "login"          # Filter by name
npx playwright test --grep-invert "slow"    # Exclude by name
npx playwright test --project=chromium      # Specific browser
npx playwright test --workers=4             # Parallel execution
npx playwright test --retries=2             # Retry failures
npx playwright test --trace on              # Record traces
npx playwright test --shard=1/3             # Shard for CI
npx playwright test --list                  # List tests (dry run)
npx playwright test --forbid-only           # Fail if test.only exists
npx playwright test --update-snapshots      # Update visual snapshots
npx playwright test tests/login.spec.js     # Run specific file
```

### Record Tests (Codegen)
```bash
npx playwright codegen [url]                       # Record test
npx playwright codegen --output tests/my.spec.js   # Save to file
npx playwright codegen --target python              # Python output
npx playwright codegen --target java                # Java output
npx playwright codegen --target csharp              # C# output
npx playwright codegen --device "iPhone 13"         # Mobile emulation
npx playwright codegen --viewport-size "1280,720"   # Custom viewport
npx playwright codegen --color-scheme dark          # Dark mode
npx playwright codegen --timezone "Asia/Kolkata"    # Timezone
npx playwright codegen --save-storage auth.json     # Save auth state
npx playwright codegen --load-storage auth.json     # Reuse auth state
npx playwright codegen --browser firefox            # Use Firefox
```

### Reports & Debugging
```bash
npx playwright show-report                 # Open HTML report
npx playwright show-trace trace.zip        # View trace file
npx playwright install                     # Install all browsers
npx playwright install chromium            # Install specific browser
npx playwright install --with-deps         # Include OS dependencies
npx playwright clear-cache                 # Clear browser cache
npx playwright merge-reports               # Merge sharded reports
```

## @playwright/cli (AI Agent CLI)

### Setup
```bash
npm install -g @playwright/cli@latest
playwright-cli install
playwright-cli install --skills    # Creates .claude/skills/ for auto-discovery
```

### Interactive Commands
```bash
# Browser control
playwright-cli open [url] -s=[session]     # Open page in named session
playwright-cli goto [url] -s=[session]     # Navigate to URL
playwright-cli reload -s=[session]         # Reload page
playwright-cli close -s=[session]          # Close page

# Inspection (snapshots saved to disk for token efficiency)
playwright-cli snapshot -s=[session]       # Accessibility snapshot
playwright-cli screenshot -s=[session]     # Screenshot to file
playwright-cli pdf -s=[session]            # Save as PDF
playwright-cli eval "expression" -s=[s]    # Evaluate JavaScript
playwright-cli console -s=[session]        # Console messages
playwright-cli network -s=[session]        # Network requests

# Interactions (use refs from snapshot output)
playwright-cli click [ref] -s=[session]    # Click element
playwright-cli fill [ref] "text" -s=[s]    # Fill input field
playwright-cli type [ref] "text" -s=[s]    # Type character by character
playwright-cli press Enter -s=[session]    # Press keyboard key
playwright-cli select [ref] "val" -s=[s]   # Select dropdown option
playwright-cli check [ref] -s=[session]    # Check checkbox
playwright-cli uncheck [ref] -s=[session]  # Uncheck checkbox
playwright-cli drag [src] [dst] -s=[s]     # Drag and drop

# State management
playwright-cli state-save file.json -s=[s] # Save cookies/storage
playwright-cli state-load file.json -s=[s] # Load cookies/storage
playwright-cli cookie-list -s=[session]    # List cookies
playwright-cli localstorage-list -s=[s]    # List localStorage

# Tracing & recording
playwright-cli tracing-start -s=[session]  # Start trace recording
playwright-cli tracing-stop -s=[session]   # Stop and save trace
playwright-cli video-start -s=[session]    # Start video recording
playwright-cli video-stop -s=[session]     # Stop video recording

# Session management
playwright-cli list                        # List active sessions
playwright-cli close-all                   # Close all sessions
```

### Key Flags
- `-s=name` : Named session (allows parallel sessions)
- `--persistent` : Save browser profile to disk
- `--headed` : Show visible browser window

## Codegen Locator Priority
1. `getByRole('button', { name: '...' })` - ARIA role-based (most resilient)
2. `getByText('...')` - Visible text content
3. `getByTestId('...')` - data-testid attribute
4. `getByPlaceholder('...')` - Input placeholder text
5. `locator('css-selector')` - CSS selector (last resort)

## Common Patterns

### Login Test
```javascript
import { test, expect } from '@playwright/test';

test('login with valid credentials', async ({ page }) => {
  await page.goto('https://app.example.com');
  await page.getByPlaceholder('Email').fill('user@test.com');
  await page.getByPlaceholder('Password').fill('password123');
  await page.getByRole('button', { name: 'Sign in' }).click();
  await expect(page).toHaveURL(/dashboard/);
});
```

### CI/CD Pipeline
```bash
npx playwright install --with-deps
npx playwright test \
  --reporter=json,html \
  --workers=4 \
  --retries=2 \
  --trace=on-first-retry \
  --forbid-only
```

### Auth State Reuse
```bash
# Record login once and save state
npx playwright codegen --save-storage auth.json https://app.example.com

# Reuse in subsequent codegen sessions (skip login)
npx playwright codegen --load-storage auth.json https://app.example.com/dashboard
```

## MCP vs CLI Decision Guide
- **Use Standard CLI** for: CI/CD, test runs, codegen, reports, traces
- **Use MCP Server** for: AI agent needs live browser in context window
- **Use @playwright/cli** for: AI agents needing token efficiency (4.6x fewer tokens than MCP)
