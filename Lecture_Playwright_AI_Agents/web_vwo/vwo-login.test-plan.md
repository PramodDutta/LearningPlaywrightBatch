# VWO Login Page Test Plan

## Application Overview

Test plan for the login page at https://app.vwo.com. Covers happy path login, field validation, error handling, security (XSS/SQLi), session behaviour, accessibility, and UI verification. All scenarios assume a blank browser session (no cookies, no saved credentials) unless stated otherwise. A valid VWO account is required for positive/happy-path tests.

## Test Scenarios

### 1. Functional — Happy Path

**Seed:** `Lecture_Playwright_AI_Agents/web_vwo/seed.spec.js`

#### 1.1. TC-001: Successful login with valid credentials

**File:** `Lecture_Playwright_AI_Agents/web_vwo/tests/functional/tc001-valid-login.spec.js`

**Steps:**
  1. Navigate to https://app.vwo.com
    - expect: The login page is displayed with Email and Password fields and a Sign In button visible
  2. Enter a valid registered email address in the Email field
    - expect: The email is entered into the field
  3. Enter the correct password in the Password field
    - expect: The password is masked (shown as dots/asterisks)
  4. Click the 'Sign In' button
    - expect: The user is redirected to the VWO dashboard
    - expect: No error messages are displayed
    - expect: The URL no longer points to the login page
    - expect: The user's account name or avatar appears in the navigation

### 2. Functional — Negative & Error Cases

**Seed:** `Lecture_Playwright_AI_Agents/web_vwo/seed.spec.js`

#### 2.1. TC-002: Login with incorrect password

**File:** `Lecture_Playwright_AI_Agents/web_vwo/tests/functional/tc002-wrong-password.spec.js`

**Steps:**
  1. Navigate to https://app.vwo.com
    - expect: Login page is displayed
  2. Enter a valid registered email in the Email field
    - expect: Email is entered
  3. Enter an intentionally incorrect password in the Password field
    - expect: Password field accepts the input
  4. Click the 'Sign In' button
    - expect: Login fails
    - expect: A generic error message is shown (e.g. 'Invalid email or password')
    - expect: The user remains on the login page
    - expect: The error message does NOT reveal whether the email exists

#### 2.2. TC-003: Login with unregistered email

**File:** `Lecture_Playwright_AI_Agents/web_vwo/tests/functional/tc003-unregistered-email.spec.js`

**Steps:**
  1. Navigate to https://app.vwo.com
    - expect: Login page is displayed
  2. Enter an email address that has never been registered (e.g., notregistered_abc123@example.com) in the Email field
    - expect: Email is entered
  3. Enter any password in the Password field
    - expect: Password field accepts the input
  4. Click the 'Sign In' button
    - expect: Login fails
    - expect: A generic error message is shown — identical or equivalent to the wrong-password error
    - expect: The application does NOT disclose that the email account does not exist (prevents user enumeration)

#### 2.3. TC-014: Enter key submits the login form

**File:** `Lecture_Playwright_AI_Agents/web_vwo/tests/functional/tc014-enter-key-submit.spec.js`

**Steps:**
  1. Navigate to https://app.vwo.com
    - expect: Login page is displayed
  2. Enter a valid email in the Email field
    - expect: Email is entered
  3. Enter the correct password in the Password field
    - expect: Password is entered
  4. Press the Enter key while focus is in the Password field
    - expect: The form is submitted (identical behaviour to clicking Sign In)
    - expect: The user is successfully logged in and redirected to the dashboard

### 3. Validation — Field Constraints

**Seed:** `Lecture_Playwright_AI_Agents/web_vwo/seed.spec.js`

#### 3.1. TC-004: Login with empty Email field

**File:** `Lecture_Playwright_AI_Agents/web_vwo/tests/validation/tc004-empty-email.spec.js`

**Steps:**
  1. Navigate to https://app.vwo.com
    - expect: Login page is displayed
  2. Leave the Email field empty and enter any text in the Password field
    - expect: Password field is populated; Email field is empty
  3. Click the 'Sign In' button
    - expect: Form submission is blocked
    - expect: A validation error appears near the Email field (e.g. 'Email is required' or 'Please enter your email')
    - expect: No network request is made

#### 3.2. TC-005: Login with empty Password field

**File:** `Lecture_Playwright_AI_Agents/web_vwo/tests/validation/tc005-empty-password.spec.js`

**Steps:**
  1. Navigate to https://app.vwo.com
    - expect: Login page is displayed
  2. Enter a valid email in the Email field and leave the Password field empty
    - expect: Email field is populated; Password field is empty
  3. Click the 'Sign In' button
    - expect: Form submission is blocked
    - expect: A validation error appears near the Password field (e.g. 'Password is required')
    - expect: No network request is made

#### 3.3. TC-006: Login with both fields empty

**File:** `Lecture_Playwright_AI_Agents/web_vwo/tests/validation/tc006-both-fields-empty.spec.js`

**Steps:**
  1. Navigate to https://app.vwo.com
    - expect: Login page is displayed with empty Email and Password fields
  2. Click the 'Sign In' button without entering any data
    - expect: Form submission is blocked
    - expect: Validation error messages appear for both the Email and Password fields
    - expect: User remains on the login page

#### 3.4. TC-007: Login with invalid email format

**File:** `Lecture_Playwright_AI_Agents/web_vwo/tests/validation/tc007-invalid-email-format.spec.js`

**Steps:**
  1. Navigate to https://app.vwo.com
    - expect: Login page is displayed
  2. Enter 'plaintext' (no @ symbol) in the Email field and any password in the Password field, then click Sign In
    - expect: Validation error shown for email format; form is not submitted
  3. Clear the Email field. Enter 'missingdomain@' (no TLD) in the Email field, then click Sign In
    - expect: Validation error shown for email format; form is not submitted
  4. Clear the Email field. Enter '@nodomain.com' (no local part) in the Email field, then click Sign In
    - expect: Validation error shown for email format; form is not submitted
  5. Clear the Email field. Enter 'spaces in@email.com' (space within email) in the Email field, then click Sign In
    - expect: Validation error shown for email format; form is not submitted

#### 3.5. TC-018: Very long input in Email and Password fields

**File:** `Lecture_Playwright_AI_Agents/web_vwo/tests/validation/tc018-long-input.spec.js`

**Steps:**
  1. Navigate to https://app.vwo.com
    - expect: Login page is displayed
  2. Enter a string of 500+ characters in the Email field
    - expect: The field accepts or truncates the input; the page does not crash
  3. Enter a string of 500+ characters in the Password field
    - expect: The field accepts or truncates the input; the page does not crash
  4. Click the 'Sign In' button
    - expect: The application handles the request gracefully
    - expect: Either a validation error is displayed or a generic error message is returned
    - expect: No server error (HTTP 500) details are exposed to the user
    - expect: The page remains stable

#### 3.6. TC-021: Email with leading and trailing spaces

**File:** `Lecture_Playwright_AI_Agents/web_vwo/tests/validation/tc021-email-spaces.spec.js`

**Steps:**
  1. Navigate to https://app.vwo.com
    - expect: Login page is displayed
  2. Enter a valid email with leading spaces (e.g. '   user@example.com') in the Email field and the correct password
    - expect: Input is accepted by the field
  3. Click the 'Sign In' button
    - expect: The system either trims the whitespace and logs in successfully, OR displays a clear validation error about the email format
    - expect: The user is NOT unexpectedly locked out due to whitespace

#### 3.7. TC-022: Email in different case (uppercase vs registered lowercase)

**File:** `Lecture_Playwright_AI_Agents/web_vwo/tests/validation/tc022-email-case-sensitivity.spec.js`

**Steps:**
  1. Navigate to https://app.vwo.com
    - expect: Login page is displayed
  2. Enter the valid registered email in ALL UPPERCASE (e.g. 'USER@EXAMPLE.COM') with the correct password
    - expect: Input is accepted by the field
  3. Click the 'Sign In' button
    - expect: Preferably, login succeeds because email matching is case-insensitive
    - expect: If the system is case-sensitive, a clear and helpful error message is displayed

### 4. Forgot Password Flow

**Seed:** `Lecture_Playwright_AI_Agents/web_vwo/seed.spec.js`

#### 4.1. TC-008: Forgot password link navigates to reset page

**File:** `Lecture_Playwright_AI_Agents/web_vwo/tests/forgot-password/tc008-forgot-password-navigation.spec.js`

**Steps:**
  1. Navigate to https://app.vwo.com
    - expect: Login page is displayed
  2. Locate the 'Forgot password?' link on the login page
    - expect: The link is visible on the login page
  3. Click the 'Forgot password?' link
    - expect: User is navigated to the password reset page
    - expect: The reset page shows an input for the registered email address
    - expect: A submit/reset button is visible

#### 4.2. TC-009: Forgot password — submit valid registered email

**File:** `Lecture_Playwright_AI_Agents/web_vwo/tests/forgot-password/tc009-forgot-password-valid-email.spec.js`

**Steps:**
  1. Navigate to https://app.vwo.com and click the 'Forgot password?' link
    - expect: Password reset page is displayed
  2. Enter a valid registered email address in the reset email field
    - expect: Email is entered
  3. Click the reset/submit button
    - expect: A confirmation message is displayed (e.g. 'Password reset instructions have been sent to your email')
    - expect: No error is shown
    - expect: The page does not reveal whether the email is registered

#### 4.3. TC-010: Forgot password — submit unregistered email

**File:** `Lecture_Playwright_AI_Agents/web_vwo/tests/forgot-password/tc010-forgot-password-unregistered-email.spec.js`

**Steps:**
  1. Navigate to https://app.vwo.com and click the 'Forgot password?' link
    - expect: Password reset page is displayed
  2. Enter an email address that is NOT registered with VWO
    - expect: Email is entered
  3. Click the reset/submit button
    - expect: A generic confirmation message is shown — identical or equivalent to the valid-email confirmation
    - expect: The system does NOT reveal that the email is not registered (prevents user enumeration attack)

### 5. Security

**Seed:** `Lecture_Playwright_AI_Agents/web_vwo/seed.spec.js`

#### 5.1. TC-016: XSS injection attempt in Email field

**File:** `Lecture_Playwright_AI_Agents/web_vwo/tests/security/tc016-xss-email.spec.js`

**Steps:**
  1. Navigate to https://app.vwo.com
    - expect: Login page is displayed
  2. Enter the XSS payload <script>alert('XSS')</script> in the Email field and any text in the Password field
    - expect: The field accepts the input
  3. Click the 'Sign In' button
    - expect: No script executes and no alert dialog appears
    - expect: The input is rejected or sanitized
    - expect: A validation or generic error message is shown
    - expect: The page remains stable with no content injection visible

#### 5.2. TC-017: SQL injection attempt in Email field

**File:** `Lecture_Playwright_AI_Agents/web_vwo/tests/security/tc017-sql-injection-email.spec.js`

**Steps:**
  1. Navigate to https://app.vwo.com
    - expect: Login page is displayed
  2. Enter the SQL injection payload \' OR \'1\'=\'1\' -- in the Email field and any text in the Password field
    - expect: The field accepts the input
  3. Click the 'Sign In' button
    - expect: Login fails — no unauthorized access is granted
    - expect: A generic error message is displayed
    - expect: No database error messages or stack traces are exposed in the response or page

### 6. UI & Accessibility

**Seed:** `Lecture_Playwright_AI_Agents/web_vwo/seed.spec.js`

#### 6.1. TC-011: Password field is masked by default

**File:** `Lecture_Playwright_AI_Agents/web_vwo/tests/ui/tc011-password-masking.spec.js`

**Steps:**
  1. Navigate to https://app.vwo.com
    - expect: Login page is displayed
  2. Click on the Password field and type any text
    - expect: Characters are masked (displayed as dots or asterisks)
    - expect: The actual text is not visible

#### 6.2. TC-012: Password visibility toggle (show/hide)

**File:** `Lecture_Playwright_AI_Agents/web_vwo/tests/ui/tc012-password-toggle.spec.js`

**Steps:**
  1. Navigate to https://app.vwo.com
    - expect: Login page is displayed
  2. Enter text in the Password field
    - expect: Text is masked by default
  3. Click the eye icon / 'Show' button next to the Password field
    - expect: The password text becomes visible in plain text
  4. Click the eye icon / 'Hide' button again
    - expect: The password text is masked again

#### 6.3. TC-013: Tab key navigation between form fields

**File:** `Lecture_Playwright_AI_Agents/web_vwo/tests/ui/tc013-tab-navigation.spec.js`

**Steps:**
  1. Navigate to https://app.vwo.com
    - expect: Login page is displayed
  2. Click on the Email field to give it focus, then press the Tab key
    - expect: Focus moves to the Password field
    - expect: The focused element has a visible focus indicator (outline or highlight)
  3. Press the Tab key again
    - expect: Focus moves to the Sign In button (or the next logical element)
    - expect: Tab order is logical and consistent with reading order

#### 6.4. TC-015: Login page UI elements verification

**File:** `Lecture_Playwright_AI_Agents/web_vwo/tests/ui/tc015-ui-verification.spec.js`

**Steps:**
  1. Navigate to https://app.vwo.com
    - expect: VWO logo is displayed prominently
    - expect: Email field is present with a visible label
    - expect: Password field is present with a visible label
    - expect: 'Sign In' / 'Log in' button is visible and correctly labelled
    - expect: 'Forgot password?' link is present
    - expect: Page title in the browser tab contains 'VWO' or similar brand text
    - expect: No broken images or layout issues are visible

#### 6.5. TC-024: Accessibility — form fields have ARIA labels

**File:** `Lecture_Playwright_AI_Agents/web_vwo/tests/ui/tc024-accessibility-aria.spec.js`

**Steps:**
  1. Navigate to https://app.vwo.com
    - expect: Login page is displayed
  2. Inspect the Email input element for accessible labelling
    - expect: Email field has an associated <label> element or aria-label attribute with a descriptive name
  3. Inspect the Password input element for accessible labelling
    - expect: Password field has an associated <label> element or aria-label attribute with a descriptive name
  4. Inspect the Sign In button for an accessible name
    - expect: Sign In button has a descriptive text label or aria-label
  5. Trigger a validation error (e.g., submit empty form) and inspect the error message element
    - expect: Error messages are linked to their respective form fields via aria-describedby or equivalent
    - expect: The form uses a semantic <form> element or role='form'

### 7. Session Behaviour

**Seed:** `Lecture_Playwright_AI_Agents/web_vwo/seed.spec.js`

#### 7.1. TC-019: Browser back button after successful login

**File:** `Lecture_Playwright_AI_Agents/web_vwo/tests/session/tc019-back-button-after-login.spec.js`

**Steps:**
  1. Navigate to https://app.vwo.com and log in with valid credentials
    - expect: User is on the VWO dashboard
  2. Click the browser Back button
    - expect: The user is NOT returned to the login page with an active session exposed
    - expect: Either the user stays on the dashboard, or if redirected to the login page, they are immediately forwarded back to the dashboard (session still active)

#### 7.2. TC-020: Session persists after page refresh

**File:** `Lecture_Playwright_AI_Agents/web_vwo/tests/session/tc020-session-after-refresh.spec.js`

**Steps:**
  1. Navigate to https://app.vwo.com and log in with valid credentials
    - expect: User is on the VWO dashboard
  2. Press F5 (or Ctrl+R / Cmd+R on Mac) to refresh the page
    - expect: The user remains logged in
    - expect: The session is not lost upon page refresh
    - expect: Dashboard content reloads correctly without returning to the login page

#### 7.3. TC-023: Concurrent login from two different browser sessions

**File:** `Lecture_Playwright_AI_Agents/web_vwo/tests/session/tc023-concurrent-sessions.spec.js`

**Steps:**
  1. Open a standard browser window, navigate to https://app.vwo.com, and log in with valid credentials
    - expect: User is logged in successfully in Session A
  2. Open a second browser window in incognito/private mode, navigate to https://app.vwo.com, and log in with the same credentials
    - expect: Either both sessions are active simultaneously (multi-session allowed), OR
    - expect: One session is invalidated with a clear notification to the user
    - expect: No unexpected errors, crashes, or data corruption occurs in either session
