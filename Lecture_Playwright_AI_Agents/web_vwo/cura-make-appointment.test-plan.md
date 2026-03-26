# CURA Healthcare - Successful Make Appointment Test Plan

## Application Overview

End-to-end test plan for the successful 'Make Appointment' flow on the CURA Healthcare Service demo application (https://katalon-demo-cura.herokuapp.com/). Covers navigating to the site, clicking Make Appointment, logging in with valid credentials, filling the appointment form, submitting, and verifying the confirmation page. All scenarios assume a fresh browser session with no prior login state.

## Test Scenarios

### 1. E2E - Successful Make Appointment Flow

**Seed:** `Lecture_Playwright_AI_Agents/web_vwo/seed.spec.js`

#### 1.1. TC-001: Complete end-to-end successful appointment booking

**File:** `Lecture_Playwright_AI_Agents/web_vwo/tests/appointment/tc001-full-happy-path.spec.js`

**Steps:**
  1. Navigate to https://katalon-demo-cura.herokuapp.com/
    - expect: The CURA Healthcare Service homepage is displayed
    - expect: The page title contains 'CURA Healthcare Service'
    - expect: A 'Make Appointment' button is visible on the page
  2. Click the 'Make Appointment' button on the homepage
    - expect: The user is redirected to the login page (URL contains '/profile.php#login')
    - expect: A login form is displayed with Username and Password input fields
    - expect: A 'Login' button is visible
  3. Enter 'John Doe' in the Username field
    - expect: The username 'John Doe' is entered in the Username field
  4. Enter 'ThisIsNotAPassword' in the Password field
    - expect: The password is entered and the characters are masked (dots/asterisks)
  5. Click the 'Login' button
    - expect: Login succeeds and the user is redirected to the Make Appointment page (URL contains '/#appointment')
    - expect: The Make Appointment form is displayed with the following fields: Facility dropdown, Apply for hospital readmission checkbox, Healthcare Program radio buttons, Visit Date input, and a Comment textarea
    - expect: A 'Book Appointment' button is visible at the bottom of the form
  6. Select 'Tokyo CURA Healthcare Center' from the Facility dropdown
    - expect: 'Tokyo CURA Healthcare Center' is selected and displayed in the Facility dropdown
  7. Leave the 'Apply for hospital readmission' checkbox unchecked (do not click it)
    - expect: The checkbox remains unchecked — readmission is set to 'No'
  8. Select the 'Medicare' radio button under Healthcare Program
    - expect: The 'Medicare' radio button is selected
    - expect: Other radio buttons (Medicaid, None) are deselected
  9. Click on the Visit Date input field and enter '25/03/2026'
    - expect: The date '25/03/2026' is entered in the Visit Date field
    - expect: A date picker may appear — the date should be set correctly either via picker or direct input
  10. Leave the Comment field empty (optional field)
    - expect: The Comment field remains empty
  11. Click the 'Book Appointment' button
    - expect: The appointment is successfully booked
    - expect: The user is redirected to the Appointment Confirmation page (URL contains '/appointment.php#summary')
    - expect: The page displays the heading 'Appointment Confirmation'
    - expect: The page displays the message: 'Please be informed that your appointment has been booked as following:'
    - expect: Facility shows: 'Tokyo CURA Healthcare Center'
    - expect: Apply for hospital readmission shows: 'No'
    - expect: Healthcare Program shows: 'Medicare'
    - expect: Visit Date shows: '25/03/2026'

#### 1.2. TC-002: Verify homepage elements before making appointment

**File:** `Lecture_Playwright_AI_Agents/web_vwo/tests/appointment/tc002-homepage-elements.spec.js`

**Steps:**
  1. Navigate to https://katalon-demo-cura.herokuapp.com/
    - expect: The page loads successfully with no errors
    - expect: The page title is 'CURA Healthcare Service'
    - expect: The CURA Healthcare Service logo/brand text is visible
    - expect: The 'Make Appointment' button/link is prominently displayed
    - expect: A navigation menu (hamburger icon) is available in the top-right corner
  2. Click the hamburger menu icon (toggle navigation)
    - expect: A sidebar menu opens
    - expect: Menu items include: Home, Login, and possibly other links

#### 1.3. TC-003: Verify login page elements and labels

**File:** `Lecture_Playwright_AI_Agents/web_vwo/tests/appointment/tc003-login-page-verification.spec.js`

**Steps:**
  1. Navigate to https://katalon-demo-cura.herokuapp.com/ and click 'Make Appointment'
    - expect: The login page is displayed
  2. Inspect the login form elements
    - expect: A heading or label 'Login' is visible
    - expect: Username input field is present with a placeholder or label 'Username'
    - expect: Password input field is present with a placeholder or label 'Password'
    - expect: A 'Login' submit button is present
    - expect: The password field type is 'password' (characters masked)

#### 1.4. TC-004: Verify appointment form elements and defaults

**File:** `Lecture_Playwright_AI_Agents/web_vwo/tests/appointment/tc004-appointment-form-elements.spec.js`

**Steps:**
  1. Navigate to https://katalon-demo-cura.herokuapp.com/, click 'Make Appointment', and log in with valid credentials (Username: John Doe, Password: ThisIsNotAPassword)
    - expect: The Make Appointment form page is displayed
  2. Inspect the Facility dropdown
    - expect: The dropdown contains these options: 'Tokyo CURA Healthcare Center', 'Hongkong CURA Healthcare Center', 'Seoul CURA Healthcare Center'
    - expect: A default option is pre-selected (typically 'Tokyo CURA Healthcare Center')
  3. Inspect the 'Apply for hospital readmission' checkbox
    - expect: The checkbox is present and unchecked by default
  4. Inspect the Healthcare Program radio buttons
    - expect: Three radio buttons are present: 'Medicare', 'Medicaid', 'None'
    - expect: One is selected by default (typically 'Medicare')
  5. Inspect the Visit Date field
    - expect: A date input field is present
    - expect: It may have a calendar/date picker icon
    - expect: The field is initially empty or has placeholder text
  6. Inspect the Comment textarea
    - expect: A text area is present for optional comments
    - expect: It is initially empty
  7. Inspect the 'Book Appointment' button
    - expect: The button is present, visible, and enabled

#### 1.5. TC-005: Book appointment with Tokyo CURA Healthcare Center

**File:** `Lecture_Playwright_AI_Agents/web_vwo/tests/appointment/tc005-appointment-facility-tokyo.spec.js`

**Steps:**
  1. Navigate to https://katalon-demo-cura.herokuapp.com/, click 'Make Appointment', log in with Username: John Doe, Password: ThisIsNotAPassword
    - expect: The Make Appointment form is displayed
  2. Select 'Tokyo CURA Healthcare Center' from the Facility dropdown
    - expect: 'Tokyo CURA Healthcare Center' is shown as selected
  3. Leave the 'Apply for hospital readmission' checkbox unchecked
    - expect: Checkbox remains unchecked
  4. Select the 'Medicare' radio button
    - expect: 'Medicare' is selected
  5. Enter '25/03/2026' in the Visit Date field
    - expect: The date is entered correctly
  6. Click 'Book Appointment'
    - expect: Appointment Confirmation page is displayed
    - expect: Facility: 'Tokyo CURA Healthcare Center'
    - expect: Apply for hospital readmission: 'No'
    - expect: Healthcare Program: 'Medicare'
    - expect: Visit Date: '25/03/2026'

#### 1.6. TC-006: Book appointment with Hongkong CURA Healthcare Center

**File:** `Lecture_Playwright_AI_Agents/web_vwo/tests/appointment/tc006-appointment-facility-hongkong.spec.js`

**Steps:**
  1. Navigate to https://katalon-demo-cura.herokuapp.com/, click 'Make Appointment', log in with valid credentials
    - expect: The Make Appointment form is displayed
  2. Select 'Hongkong CURA Healthcare Center' from the Facility dropdown
    - expect: 'Hongkong CURA Healthcare Center' is shown as selected
  3. Leave readmission unchecked, select 'Medicaid', enter date '25/03/2026'
    - expect: Form fields are filled correctly
  4. Click 'Book Appointment'
    - expect: Appointment Confirmation page is displayed
    - expect: Facility: 'Hongkong CURA Healthcare Center'
    - expect: Healthcare Program: 'Medicaid'
    - expect: Apply for hospital readmission: 'No'
    - expect: Visit Date: '25/03/2026'

#### 1.7. TC-007: Book appointment with Seoul CURA Healthcare Center

**File:** `Lecture_Playwright_AI_Agents/web_vwo/tests/appointment/tc007-appointment-facility-seoul.spec.js`

**Steps:**
  1. Navigate to https://katalon-demo-cura.herokuapp.com/, click 'Make Appointment', log in with valid credentials
    - expect: The Make Appointment form is displayed
  2. Select 'Seoul CURA Healthcare Center' from the Facility dropdown
    - expect: 'Seoul CURA Healthcare Center' is shown as selected
  3. Leave readmission unchecked, select 'None' for Healthcare Program, enter date '25/03/2026'
    - expect: Form fields are filled correctly
  4. Click 'Book Appointment'
    - expect: Appointment Confirmation page is displayed
    - expect: Facility: 'Seoul CURA Healthcare Center'
    - expect: Healthcare Program: 'None'
    - expect: Apply for hospital readmission: 'No'
    - expect: Visit Date: '25/03/2026'

#### 1.8. TC-008: Book appointment with hospital readmission checked

**File:** `Lecture_Playwright_AI_Agents/web_vwo/tests/appointment/tc008-appointment-with-readmission.spec.js`

**Steps:**
  1. Navigate to https://katalon-demo-cura.herokuapp.com/, click 'Make Appointment', log in with valid credentials
    - expect: The Make Appointment form is displayed
  2. Select 'Tokyo CURA Healthcare Center' from the Facility dropdown
    - expect: Facility selected
  3. Check the 'Apply for hospital readmission' checkbox
    - expect: The checkbox is now checked (ticked)
  4. Select the 'Medicare' radio button and enter date '25/03/2026'
    - expect: Form fields are filled
  5. Click 'Book Appointment'
    - expect: Appointment Confirmation page is displayed
    - expect: Facility: 'Tokyo CURA Healthcare Center'
    - expect: Apply for hospital readmission: 'Yes'
    - expect: Healthcare Program: 'Medicare'
    - expect: Visit Date: '25/03/2026'

#### 1.9. TC-009: Book appointment with a comment

**File:** `Lecture_Playwright_AI_Agents/web_vwo/tests/appointment/tc009-appointment-with-comment.spec.js`

**Steps:**
  1. Navigate to https://katalon-demo-cura.herokuapp.com/, click 'Make Appointment', log in with valid credentials
    - expect: The Make Appointment form is displayed
  2. Select 'Tokyo CURA Healthcare Center', leave readmission unchecked, select 'Medicare', enter date '25/03/2026'
    - expect: Form fields are filled
  3. Enter 'This is a test comment for the appointment' in the Comment field
    - expect: The comment text is entered in the textarea
  4. Click 'Book Appointment'
    - expect: Appointment Confirmation page is displayed
    - expect: All appointment details are shown correctly
    - expect: The comment may or may not appear on the confirmation page (verify behaviour)

#### 1.10. TC-010: Verify all confirmation page elements after successful booking

**File:** `Lecture_Playwright_AI_Agents/web_vwo/tests/appointment/tc010-confirmation-page-elements.spec.js`

**Steps:**
  1. Complete the full appointment booking flow (login, fill form with Tokyo CURA Healthcare Center, unchecked readmission, Medicare, date 25/03/2026, click Book Appointment)
    - expect: Appointment Confirmation page is displayed
  2. Verify the page heading
    - expect: The heading 'Appointment Confirmation' is displayed prominently at the top
  3. Verify the confirmation message text
    - expect: The text 'Please be informed that your appointment has been booked as following:' is displayed
  4. Verify the Facility label and value
    - expect: Label 'Facility' is visible
    - expect: Value 'Tokyo CURA Healthcare Center' is displayed next to or below the label
  5. Verify the Apply for hospital readmission label and value
    - expect: Label 'Apply for hospital readmission' is visible
    - expect: Value 'No' is displayed
  6. Verify the Healthcare Program label and value
    - expect: Label 'Healthcare Program' is visible
    - expect: Value 'Medicare' is displayed
  7. Verify the Visit Date label and value
    - expect: Label 'Visit Date' is visible
    - expect: Value '25/03/2026' is displayed
  8. Check if a 'Go to Homepage' link/button is available on the confirmation page
    - expect: A link or button to return to the homepage is present

#### 1.11. TC-011: Login with invalid credentials (negative test)

**File:** `Lecture_Playwright_AI_Agents/web_vwo/tests/appointment/tc011-login-invalid-credentials.spec.js`

**Steps:**
  1. Navigate to https://katalon-demo-cura.herokuapp.com/ and click 'Make Appointment'
    - expect: The login page is displayed
  2. Enter 'InvalidUser' in the Username field and 'WrongPassword' in the Password field
    - expect: Credentials are entered
  3. Click the 'Login' button
    - expect: Login fails
    - expect: An error message is displayed (e.g., 'Login failed! Please ensure the username and password are valid.')
    - expect: The user remains on the login page
    - expect: No access is granted to the appointment form

#### 1.12. TC-012: Login with empty username and password (negative test)

**File:** `Lecture_Playwright_AI_Agents/web_vwo/tests/appointment/tc012-login-empty-fields.spec.js`

**Steps:**
  1. Navigate to https://katalon-demo-cura.herokuapp.com/ and click 'Make Appointment'
    - expect: The login page is displayed
  2. Leave both Username and Password fields empty
    - expect: Both fields are empty
  3. Click the 'Login' button
    - expect: Login fails
    - expect: An error message is shown or the form is not submitted
    - expect: The user remains on the login page

#### 1.13. TC-013: Submit appointment form without entering a visit date

**File:** `Lecture_Playwright_AI_Agents/web_vwo/tests/appointment/tc013-appointment-without-date.spec.js`

**Steps:**
  1. Navigate to https://katalon-demo-cura.herokuapp.com/, click 'Make Appointment', log in with valid credentials
    - expect: The Make Appointment form is displayed
  2. Select a facility, select a healthcare program, but leave the Visit Date field empty
    - expect: All fields except Visit Date are filled
  3. Click 'Book Appointment'
    - expect: Either the form submission is blocked with a validation error asking for a date, OR the form submits with an empty date (verify the actual behaviour — this tests whether date is a required field)

#### 1.14. TC-014: Navigate back to homepage from confirmation page

**File:** `Lecture_Playwright_AI_Agents/web_vwo/tests/appointment/tc014-navigate-back-from-confirmation.spec.js`

**Steps:**
  1. Complete the full appointment booking flow to reach the Appointment Confirmation page
    - expect: The Appointment Confirmation page is displayed
  2. Click the 'Go to Homepage' link/button (if present) or use the hamburger menu to navigate to Home
    - expect: The user is redirected back to the homepage
    - expect: The homepage is displayed correctly

#### 1.15. TC-015: Verify each Healthcare Program radio button selection

**File:** `Lecture_Playwright_AI_Agents/web_vwo/tests/appointment/tc015-all-healthcare-programs.spec.js`

**Steps:**
  1. Navigate to the Make Appointment form (after login)
    - expect: The form is displayed with three healthcare program options
  2. Click the 'Medicare' radio button
    - expect: 'Medicare' is selected; 'Medicaid' and 'None' are deselected
  3. Click the 'Medicaid' radio button
    - expect: 'Medicaid' is selected; 'Medicare' and 'None' are deselected
  4. Click the 'None' radio button
    - expect: 'None' is selected; 'Medicare' and 'Medicaid' are deselected
