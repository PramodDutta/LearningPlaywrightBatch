# Test Cases: {{PROJECT_NAME}}

| Field | Value |
|-------|-------|
| **Version** | {{VERSION}} |
| **Author** | {{AUTHOR}} |
| **Date** | {{DATE}} |
| **Total Test Cases** | {{TOTAL_TESTS}} |

---

## Test Case Format

Each test case follows this structure:

| Field | Description |
|-------|-------------|
| **TC ID** | Unique identifier (TC-001, TC-002, ...) |
| **Title** | Brief description of what is tested |
| **Preconditions** | What must be true before the test |
| **Steps** | Step-by-step instructions |
| **Expected Result** | What should happen |
| **Priority** | High / Medium / Low |
| **Category** | Smoke / Functional / Negative |
| **Spec File** | Corresponding Playwright spec file |

---

## Test Cases

{{TEST_CASES}}

---

## Summary

| Priority | Count |
|----------|-------|
| High | {{HIGH_COUNT}} |
| Medium | {{MEDIUM_COUNT}} |
| Low | {{LOW_COUNT}} |
| **Total** | **{{TOTAL_TESTS}}** |

| Category | Count |
|----------|-------|
| Smoke | {{SMOKE_COUNT}} |
| Functional | {{FUNCTIONAL_COUNT}} |
| Negative | {{NEGATIVE_COUNT}} |
