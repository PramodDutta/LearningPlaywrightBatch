# Exercise 2: Browser Automation with Playwright MCP

## Objective
Use Playwright MCP tools to automate browser interactions through an AI agent.

## Scenario
You need to test the login flow on `https://the-internet.herokuapp.com/login`.

## Tasks

### Task 1: Navigate and Explore

Ask Claude (with Playwright MCP configured) to:
1. Navigate to the login page
2. Take a snapshot to see the page structure
3. Identify the username field, password field, and login button

**Write down the element refs you find:**
- Username field ref: ___________
- Password field ref: ___________
- Login button ref: ___________

### Task 2: Perform a Valid Login

Ask Claude to:
1. Fill username with `tomsmith`
2. Fill password with `SuperSecretPassword!`
3. Click the login button
4. Take a snapshot to verify the result

**What success message do you see?** ___________

### Task 3: Test an Invalid Login

Ask Claude to:
1. Navigate back to `/login`
2. Enter invalid credentials (`baduser` / `badpass`)
3. Click login
4. Verify the error message

**What error message appears?** ___________

### Task 4: Take a Screenshot

Ask Claude to take a screenshot of the result page after login attempt.

## Bonus Challenge
Ask Claude to automate a complete flow:
1. Navigate to homepage
2. Click on "Checkboxes" link
3. Toggle both checkboxes
4. Take a screenshot of the result

## Expected Outcome
- You successfully used MCP tools for navigation, form filling, clicking, and verification
- You understand the snapshot → interact → verify cycle
