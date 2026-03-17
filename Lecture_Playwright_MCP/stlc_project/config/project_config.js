/**
 * Project Configuration for STLC Automation
 *
 * This config controls the target application, Jira integration,
 * and report settings for the full STLC pipeline.
 */

module.exports = {
  // Target application under test
  app: {
    name: 'The Internet - Herokuapp',
    baseURL: 'https://the-internet.herokuapp.com',
    description: 'A collection of common test automation scenarios',
  },

  // Jira integration settings
  jira: {
    baseURL: process.env.JIRA_URL || 'http://localhost:3001',
    email: process.env.JIRA_EMAIL || '',
    apiToken: process.env.JIRA_API_TOKEN || '',
    projectKey: 'STLC',
    useMock: true, // Set to false to use real Jira
  },

  // Report settings
  reporting: {
    outputDir: './stlc_project/reports',
    jsonFile: './stlc_project/reports/results.json',
    htmlReport: './stlc_project/reports/html-report',
  },

  // Test metadata
  testPlan: {
    author: 'QA Automation Team',
    version: '1.0',
    environment: 'Production',
    browser: 'Chromium',
  },
};
