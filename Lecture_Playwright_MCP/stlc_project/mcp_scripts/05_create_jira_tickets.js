/**
 * STLC Pipeline - Step 5: Create Jira Tickets
 *
 * Creates Jira tickets for each failed test case.
 * Uses the JiraClient which works with both mock and real Jira.
 */

const path = require('path');
const JiraClient = require(path.join(__dirname, '..', 'jira_mock', 'jira_client'));
const config = require(path.join(__dirname, '..', 'config', 'project_config.js'));

/**
 * Create Jira tickets for test failures
 * @param {Array} failures - Array of failure objects from parseResults
 * @returns {Promise<Array>} Array of created ticket keys
 */
async function createJiraTickets(failures) {
  console.log('\n--- Step 5: Creating Jira Tickets ---\n');

  if (!failures || failures.length === 0) {
    console.log('  No failures found. No tickets to create.');
    return [];
  }

  const client = new JiraClient({
    baseURL: config.jira.baseURL,
    projectKey: config.jira.projectKey,
    email: config.jira.email,
    apiToken: config.jira.apiToken,
  });

  // Check if Jira server is reachable
  const healthy = await client.isHealthy();
  if (!healthy) {
    console.log('  WARNING: Jira server is not reachable at', config.jira.baseURL);
    console.log('  Start the mock server: node stlc_project/jira_mock/jira_mock_server.js');
    console.log('  Skipping ticket creation.\n');
    return [];
  }

  const createdTickets = [];

  for (const failure of failures) {
    const summary = `Test Failure: ${failure.title}`;
    const description = [
      `*Automated Test Failure Report*`,
      ``,
      `*Test:* ${failure.title}`,
      `*File:* ${failure.file}`,
      `*Duration:* ${failure.duration}ms`,
      ``,
      `*Error Message:*`,
      `{code}`,
      failure.error,
      `{code}`,
      ``,
      failure.snippet ? `*Code Snippet:*\n{code}\n${failure.snippet}\n{code}` : '',
      ``,
      `*Reported by:* STLC Automation Pipeline`,
      `*Date:* ${new Date().toISOString()}`,
    ].join('\n');

    try {
      const ticket = await client.createIssue(
        summary,
        description,
        'Bug',
        'High',
        ['automation', 'regression', 'stlc-pipeline']
      );
      createdTickets.push(ticket.key);
      console.log(`  Created: ${ticket.key} - ${summary}`);
    } catch (error) {
      console.log(`  ERROR creating ticket for "${failure.title}": ${error.message}`);
    }
  }

  console.log(`\n  Total tickets created: ${createdTickets.length}`);
  return createdTickets;
}

if (require.main === module) {
  // Demo with sample failures
  const sampleFailures = [
    { title: 'should verify broken image returns 200 status', file: '07_broken_link.spec.js', error: 'Expected 200, received 404', duration: 1200 },
    { title: 'should have correct page title', file: '08_wrong_title.spec.js', error: 'Expected "Wrong Title", received "The Internet"', duration: 800 },
  ];
  createJiraTickets(sampleFailures);
}

module.exports = { createJiraTickets };
