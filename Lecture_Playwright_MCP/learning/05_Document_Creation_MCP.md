# Document Creation with MCP

## Overview

In STLC automation, we need to generate structured documents like **test plans** and **test cases**. MCP enables AI agents to create, read, and modify these documents programmatically.

## How Document Creation Works with MCP

### The Approach: Template-Based Generation

Instead of writing documents from scratch, we use a template-based approach:

1. **Define templates** with placeholders (e.g., `{{PROJECT_NAME}}`, `{{TEST_CASES}}`)
2. **AI agent reads** the template via file system tools
3. **AI populates** the template with project-specific data
4. **AI writes** the final document to the output location

```
Template (test_plan_template.md)
        │
        ▼
   AI Agent reads template
   AI Agent populates data
        │
        ▼
Final Document (test_plan.md)
```

## MCP Tools for Document Operations

### File System MCP Tools

| Tool | Description | Usage |
|------|-------------|-------|
| `read_file` | Read file contents | Read templates |
| `write_file` | Write/create files | Create documents |
| `list_directory` | List files in folder | Find templates |
| `search_files` | Search file contents | Find specific data |

### Using Claude Code for Document Generation

In Claude Code, document operations are built-in:

```
User: "Create a test plan for the login feature based on the template"

Claude Code:
1. Reads templates/test_plan_template.md (Read tool)
2. Populates with login feature specifics
3. Writes documents/test_plan.md (Write tool)
```

## Template Design Principles

### Good Template Structure

```markdown
# Test Plan: {{PROJECT_NAME}}

## 1. Introduction
**Project:** {{PROJECT_NAME}}
**Version:** {{VERSION}}
**Author:** {{AUTHOR}}
**Date:** {{DATE}}

## 2. Scope
{{SCOPE_DESCRIPTION}}

## 3. Test Cases
{{TEST_CASES_TABLE}}

## 4. Schedule
{{SCHEDULE}}
```

### Template Placeholders

| Placeholder | Description | Example Value |
|-------------|-------------|---------------|
| `{{PROJECT_NAME}}` | Name of the project | "The Internet App" |
| `{{VERSION}}` | Document version | "1.0" |
| `{{AUTHOR}}` | Author name | "QA Automation Team" |
| `{{DATE}}` | Creation date | "2026-03-17" |
| `{{TEST_CASES_TABLE}}` | Generated test case table | Markdown table |
| `{{SCOPE_DESCRIPTION}}` | What's being tested | Feature descriptions |

## Document Types in STLC

### 1. Test Plan Document

Contains:
- Project overview and objectives
- Scope (in-scope and out-of-scope)
- Test strategy and approach
- Test environment details
- Entry and exit criteria
- Risk assessment
- Schedule and milestones

### 2. Test Case Document

Contains:
- Test case ID and title
- Preconditions
- Test steps
- Expected results
- Actual results (after execution)
- Pass/Fail status
- Priority and category

### 3. Test Report Document

Contains:
- Execution summary
- Pass/fail statistics
- Failed test details
- Defects raised
- Screenshots and evidence
- Recommendations

## How Our STLC Project Uses Document MCP

### Script: `01_generate_test_plan.js`
```javascript
// 1. Read the template
const template = fs.readFileSync('templates/test_plan_template.md', 'utf-8');

// 2. Replace placeholders with project data
const testPlan = template
  .replace('{{PROJECT_NAME}}', config.app.name)
  .replace('{{DATE}}', new Date().toISOString().split('T')[0])
  // ... more replacements

// 3. Write the final document
fs.writeFileSync('documents/test_plan.md', testPlan);
```

### Script: `02_generate_test_cases.js`
```javascript
// Generates a markdown table of test cases
const testCases = [
  { id: 'TC-001', title: 'Homepage loads correctly', priority: 'High' },
  // ... more test cases
];

// Creates formatted markdown document
const document = generateTestCaseDocument(testCases);
fs.writeFileSync('documents/test_cases.md', document);
```

## Other Document MCPs

### Google Docs MCP
- Create and edit Google Docs
- Useful for shared team documents
- Real-time collaboration

### Confluence MCP
- Create pages in Confluence
- Common in enterprise environments
- Links with Jira issues

### Markdown File System
- Simplest approach (what we use)
- Version-controlled with git
- No external dependencies

## Summary

- Documents in STLC can be generated from templates
- MCP file tools enable AI to read templates and write documents
- Our project uses simple markdown templates with placeholder replacement
- This approach works locally and can be extended to cloud document services
