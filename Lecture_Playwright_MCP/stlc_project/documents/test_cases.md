# Test Cases: The Internet - Herokuapp

| Field | Value |
|-------|-------|
| **Version** | 1.0 |
| **Author** | QA Automation Team |
| **Date** | 2026-03-17 |
| **Total Test Cases** | 10 |

---

## TC-001: Homepage Loads Correctly

| Field | Value |
|-------|-------|
| **Priority** | High |
| **Category** | Smoke |
| **Spec File** | `01_homepage.spec.js` |

**Preconditions:** Browser is open, internet is accessible

**Steps:**
1. Navigate to `https://the-internet.herokuapp.com`
2. Wait for page to load completely
3. Check the page title
4. Verify the heading "Welcome to the-internet" is visible

**Expected Result:** Page loads with correct title and heading

---

## TC-002: Navigation Links Work

| Field | Value |
|-------|-------|
| **Priority** | High |
| **Category** | Smoke |
| **Spec File** | `02_navigation.spec.js` |

**Preconditions:** Homepage is loaded

**Steps:**
1. Navigate to homepage
2. Verify navigation links are present
3. Click on "Form Authentication" link
4. Verify navigation to the login page

**Expected Result:** Links navigate to correct pages

---

## TC-003: Input Fields Accept Text

| Field | Value |
|-------|-------|
| **Priority** | Medium |
| **Category** | Functional |
| **Spec File** | `03_search.spec.js` |

**Preconditions:** Application is accessible

**Steps:**
1. Navigate to the Inputs page (`/inputs`)
2. Locate the number input field
3. Type a value into the input field
4. Verify the value is entered correctly

**Expected Result:** Input field accepts and displays the entered value

---

## TC-004: Form Authentication Works

| Field | Value |
|-------|-------|
| **Priority** | High |
| **Category** | Functional |
| **Spec File** | `04_form_submit.spec.js` |

**Preconditions:** Login page is accessible

**Steps:**
1. Navigate to `/login`
2. Verify the login form is present
3. Verify username and password fields exist
4. Verify the Login button is visible

**Expected Result:** Login form is present with all required fields

---

## TC-005: Valid Login Succeeds

| Field | Value |
|-------|-------|
| **Priority** | High |
| **Category** | Functional |
| **Spec File** | `05_login_valid.spec.js` |

**Preconditions:** Login page is accessible

**Steps:**
1. Navigate to `/login`
2. Enter username: `tomsmith`
3. Enter password: `SuperSecretPassword!`
4. Click the Login button
5. Verify success message appears
6. Verify secure area page is displayed

**Expected Result:** User logs in successfully, sees success message

---

## TC-006: Invalid Login Shows Error

| Field | Value |
|-------|-------|
| **Priority** | High |
| **Category** | Negative |
| **Spec File** | `06_login_invalid.spec.js` |

**Preconditions:** Login page is accessible

**Steps:**
1. Navigate to `/login`
2. Enter username: `invaliduser`
3. Enter password: `invalidpass`
4. Click the Login button
5. Verify error message appears

**Expected Result:** Error message is displayed, user remains on login page

---

## TC-007: Broken Link Detection [EXPECTED FAIL]

| Field | Value |
|-------|-------|
| **Priority** | Medium |
| **Category** | Functional |
| **Spec File** | `07_broken_link.spec.js` |

**Preconditions:** Application is accessible

**Steps:**
1. Navigate to `/broken_images`
2. Find all images on the page
3. Assert that a non-existent image URL returns 200

**Expected Result:** INTENTIONAL FAILURE - asserts a broken image returns 200 status

---

## TC-008: Page Title Verification [EXPECTED FAIL]

| Field | Value |
|-------|-------|
| **Priority** | Medium |
| **Category** | Functional |
| **Spec File** | `08_wrong_title.spec.js` |

**Preconditions:** Application is accessible

**Steps:**
1. Navigate to homepage
2. Assert the page title is "Wrong Title That Does Not Exist"

**Expected Result:** INTENTIONAL FAILURE - title does not match

---

## TC-009: Timeout Handling [EXPECTED FAIL]

| Field | Value |
|-------|-------|
| **Priority** | Low |
| **Category** | Negative |
| **Spec File** | `09_timeout_page.spec.js` |

**Preconditions:** Application is accessible

**Steps:**
1. Navigate to `/dynamic_loading/1`
2. Wait for a non-existent element with 1ms timeout
3. Assert the element is visible

**Expected Result:** INTENTIONAL FAILURE - timeout waiting for element

---

## TC-010: Visual Elements Present

| Field | Value |
|-------|-------|
| **Priority** | Medium |
| **Category** | Functional |
| **Spec File** | `10_visual_check.spec.js` |

**Preconditions:** Application is accessible

**Steps:**
1. Navigate to homepage
2. Verify the main heading exists
3. Verify the sub-heading exists
4. Verify the link list container exists
5. Verify the footer is present

**Expected Result:** All key visual elements are present on the page

---

## Summary

| Priority | Count |
|----------|-------|
| High | 5 |
| Medium | 4 |
| Low | 1 |
| **Total** | **10** |

| Category | Count |
|----------|-------|
| Smoke | 2 |
| Functional | 6 |
| Negative | 2 |
