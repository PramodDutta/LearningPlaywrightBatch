# Test Plan: The Internet - Herokuapp

| Field | Value |
|-------|-------|
| **Version** | 1.0 |
| **Author** | QA Automation Team |
| **Date** | 2026-03-17 |
| **Environment** | Production |
| **Browser** | Chromium |

---

## 1. Introduction

This test plan describes the testing approach for **The Internet - Herokuapp**. It outlines the scope, test strategy, resources, schedule, and deliverables for the testing effort.

## 2. Objectives

- Verify core functionality works as expected
- Identify defects before production release
- Ensure user flows are complete and error-free
- Validate UI elements and navigation

## 3. Scope

### In Scope
- Homepage loading and content verification
- Navigation between pages
- Form input and submission
- Authentication (login/logout) with valid and invalid credentials
- Link validation
- Page title verification
- Element visibility and timeout handling
- Visual element checks

### Out of Scope
- Performance testing
- Security testing
- API testing
- Cross-browser testing (Chromium only)
- Mobile responsiveness

## 4. Test Strategy

### Test Approach
- **Automation Tool:** Playwright with @playwright/test
- **Test Type:** End-to-end functional testing
- **Browser:** Chromium
- **Environment:** Production

### Test Levels
- Smoke Testing (critical paths)
- Functional Testing (all features)
- Negative Testing (invalid inputs, error handling)

## 5. Test Environment

| Component | Details |
|-----------|---------|
| Application URL | https://the-internet.herokuapp.com |
| Browser | Chromium |
| OS | Cross-platform (Node.js) |
| Framework | Playwright v1.58+ |
| Reporter | HTML + JSON |

## 6. Entry Criteria

- Application is deployed and accessible
- Test environment is configured
- Test data is available
- Test cases are reviewed and approved

## 7. Exit Criteria

- All planned test cases executed
- All critical/high priority defects resolved
- Test report generated and reviewed
- No open blockers

## 8. Test Cases Summary

| TC ID | Title | Priority | Expected |
|-------|-------|----------|----------|
| TC-001 | Homepage loads correctly | High | PASS |
| TC-002 | Navigation links work | High | PASS |
| TC-003 | Input fields accept text | Medium | PASS |
| TC-004 | Form Authentication works | High | PASS |
| TC-005 | Valid login succeeds | High | PASS |
| TC-006 | Invalid login shows error | High | PASS |
| TC-007 | Broken link detection | Medium | FAIL (intentional) |
| TC-008 | Page title verification | Medium | FAIL (intentional) |
| TC-009 | Timeout handling | Low | FAIL (intentional) |
| TC-010 | Visual elements present | Medium | PASS |

## 9. Risk Assessment

| Risk | Impact | Mitigation |
|------|--------|-----------|
| Application downtime | High | Use stable test environment |
| Flaky tests | Medium | Implement proper waits, no retries |
| Environment differences | Medium | Use consistent browser version |

## 10. Schedule

| Phase | Duration |
|-------|----------|
| Test Planning | 1 day |
| Test Case Design | 1 day |
| Test Execution | 1 day |
| Defect Reporting | Ongoing |
| Test Closure | 1 day |

## 11. Deliverables

- [x] Test Plan (this document)
- [x] Test Cases Document
- [ ] Test Execution Report (HTML)
- [ ] Defect Reports (Jira tickets)
- [ ] Test Summary Report
