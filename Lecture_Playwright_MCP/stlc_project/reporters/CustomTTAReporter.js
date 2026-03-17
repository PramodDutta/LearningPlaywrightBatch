/**
 * Custom TTA Reporter for Playwright
 * @author Pramod Dutta
 * @website https://thetestingacademy.com
 * @version 1.0.0
 * @description Custom HTML Reporter for Playwright Test Automation Framework
 * @source https://github.com/PramodDutta/Advance-Playwright-Framework/blob/main/src/utils/CustomTTAReporter.ts
 *
 * Converted from TypeScript to JavaScript for use in this project.
 */

const fs = require('fs');
const path = require('path');

class CustomTTAReporter {
  constructor() {
    this.testResults = [];
    this.fileGroups = new Map();
    this.suiteStats = { total: 0, passed: 0, failed: 0, skipped: 0, flaky: 0 };
    this.config = null;
    this.startTime = new Date();
    this.endTime = new Date();
    this.outputFile = 'tta-report/index.html';
    this.runId = '';
    this.testStepsMap = new Map();
    this.testStartTimeMap = new Map();
    this.testStepCounterMap = new Map();
    this.testCounter = 0;
    this.runningTests = new Map();
    this.completedTestIds = new Set();
  }

  onBegin(config, suite) {
    const now = new Date();
    this.runId = `${now.getFullYear()}${String(now.getMonth() + 1).padStart(2, '0')}${String(now.getDate()).padStart(2, '0')}_${String(now.getHours()).padStart(2, '0')}${String(now.getMinutes()).padStart(2, '0')}${String(now.getSeconds()).padStart(2, '0')}`;
    this.outputFile = `tta-report/report_${this.runId}.html`;
    this.config = config;
    this.startTime = new Date();
    const totalTests = suite.allTests().length;

    console.log('\n╔════════════════════════════════════════════════════════════════╗');
    console.log('║        TTA PLAYWRIGHT AUTOMATION - REAL-TIME REPORT           ║');
    console.log('╠════════════════════════════════════════════════════════════════╣');
    console.log(`║  Started: ${this.startTime.toLocaleString().padEnd(51)}║`);
    console.log(`║  Total Tests: ${String(totalTests).padEnd(48)}║`);
    console.log(`║  Environment: ${(process.env.TEST_ENV || 'UAT').padEnd(48)}║`);
    console.log('╚════════════════════════════════════════════════════════════════╝\n');

    this.initializeLiveReport();
  }

  initializeLiveReport() {
    const reportDir = path.dirname(this.outputFile);
    if (!fs.existsSync(reportDir)) {
      fs.mkdirSync(reportDir, { recursive: true });
    }
    this.updateReportRealTime();
    console.log(`Real-time report: ${this.outputFile}`);
  }

  onTestBegin(test) {
    this.testStepsMap.set(test.id, []);
    this.testStartTimeMap.set(test.id, Date.now());
    this.testStepCounterMap.set(test.id, 0);
    this.testCounter++;

    const testFile = test.location.file.split('/').pop() || '';
    console.log(`\n>>  STARTING: ${test.title}`);
    console.log(`   File: ${testFile}`);
    console.log(`   Suite: ${test.parent.title}`);
    console.log('   ─────────────────────────────────────────────────────');

    const describePath = [];
    let parent = test.parent;
    while (parent && parent.title) {
      describePath.unshift(parent.title);
      parent = parent.parent;
    }

    this.runningTests.set(test.id, {
      id: `running-${test.id}`,
      title: test.title,
      fullTitle: [...describePath, test.title].join(' > '),
      file: test.location.file,
      describePath: describePath,
      location: `${test.location.file}:${test.location.line}`,
      duration: 0,
      status: 'passed',
      retry: 0,
      screenshots: [],
      steps: [],
      tags: test.tags || [],
    });

    this.updateReportRealTime();
  }

  onStepBegin(_test, _result, step) {
    if (step.category === 'test.step') {
      console.log(`   ... ${step.title}...`);
    }
  }

  onStepEnd(test, _result, step) {
    if (step.category === 'test.step') {
      const duration = step.duration ? `(${step.duration}ms)` : '';
      const status = step.error ? 'FAIL' : 'PASS';
      console.log(`   ${status} ${step.title} ${duration}`);

      const testStartTime = this.testStartTimeMap.get(test.id) || Date.now();
      const stepCounter = this.testStepCounterMap.get(test.id) || 0;
      const testSteps = this.testStepsMap.get(test.id) || [];

      const stepStartTime = new Date(step.startTime).getTime();
      const videoStartTime = stepStartTime - testStartTime;
      const videoEndTime = videoStartTime + (step.duration || 0);

      const stepData = {
        title: step.title,
        category: step.category,
        duration: step.duration || 0,
        status: step.error ? 'failed' : 'passed',
        startTime: new Date(step.startTime).toLocaleTimeString(),
        error: step.error?.message,
        stackTrace: step.error?.stack,
        consoleLogs: [],
        stepIndex: stepCounter,
        videoStartTime: Math.max(0, videoStartTime),
        videoEndTime: Math.max(0, videoEndTime),
      };
      testSteps.push(stepData);
      this.testStepsMap.set(test.id, testSteps);
      this.testStepCounterMap.set(test.id, stepCounter + 1);

      const runningTest = this.runningTests.get(test.id);
      if (runningTest) {
        runningTest.steps = [...testSteps];
        this.runningTests.set(test.id, runningTest);
      }

      this.updateReportRealTime();
    }
  }

  onTestEnd(test, result) {
    this.suiteStats.total++;

    let status = 'passed';
    let statusIcon = 'PASS';
    if (result.status === 'passed') {
      this.suiteStats.passed++;
      status = 'passed';
      statusIcon = 'PASS';
    } else if (result.status === 'failed' || result.status === 'timedOut') {
      this.suiteStats.failed++;
      status = result.status === 'timedOut' ? 'timedOut' : 'failed';
      statusIcon = 'FAIL';
    } else {
      this.suiteStats.skipped++;
      status = 'skipped';
      statusIcon = 'SKIP';
    }

    const testTime = this.formatDuration(result.duration);

    console.log('   ─────────────────────────────────────────────────────');
    console.log(`   ${statusIcon} RESULT: ${status.toUpperCase()} | Duration: ${testTime}`);
    if (result.error) {
      console.log(`   Error: ${result.error.message?.substring(0, 80)}...`);
    }
    console.log(`\n   Running Total: P:${this.suiteStats.passed} | F:${this.suiteStats.failed} | S:${this.suiteStats.skipped}`);

    const currentTestSteps = this.testStepsMap.get(test.id) || [];
    this.associateLogsWithSteps(test, result, currentTestSteps);

    const screenshots = [];
    const stepScreenshots = new Map();
    let videoPath;
    let tracePath;

    for (const attachment of result.attachments) {
      if (attachment.contentType === 'image/png') {
        const screenshotName = `screenshot_${this.testCounter}_${screenshots.length + 1}.png`;
        const destPath = path.join('tta-report', 'screenshots', screenshotName);
        const destDir = path.dirname(destPath);
        if (!fs.existsSync(destDir)) {
          fs.mkdirSync(destDir, { recursive: true });
        }
        try {
          if (attachment.path) {
            fs.copyFileSync(attachment.path, destPath);
          } else if (attachment.body) {
            fs.writeFileSync(destPath, attachment.body);
          }
          screenshots.push({ name: attachment.name || `Screenshot ${screenshots.length + 1}`, path: `screenshots/${screenshotName}` });
          if (attachment.name) {
            stepScreenshots.set(attachment.name, `screenshots/${screenshotName}`);
          }
        } catch {
          console.warn(`Failed to save screenshot: ${attachment.name}`);
        }
      }

      if (attachment.contentType === 'video/webm' && attachment.path) {
        const videoName = `video_${this.testCounter}.webm`;
        const destPath = path.join('tta-report', 'videos', videoName);
        const destDir = path.dirname(destPath);
        if (!fs.existsSync(destDir)) {
          fs.mkdirSync(destDir, { recursive: true });
        }
        try {
          fs.copyFileSync(attachment.path, destPath);
          videoPath = `videos/${videoName}`;
        } catch {
          console.warn(`Failed to copy video: ${attachment.path}`);
        }
      }

      if (attachment.name === 'trace' && attachment.path) {
        const traceName = `trace_${this.testCounter}.zip`;
        const destPath = path.join('tta-report', 'traces', traceName);
        const destDir = path.dirname(destPath);
        if (!fs.existsSync(destDir)) {
          fs.mkdirSync(destDir, { recursive: true });
        }
        try {
          fs.copyFileSync(attachment.path, destPath);
          tracePath = `traces/${traceName}`;
        } catch {
          console.warn(`Failed to copy trace: ${attachment.path}`);
        }
      }
    }

    // Associate screenshots with steps
    for (const step of currentTestSteps) {
      for (const [name, screenshotPath] of stepScreenshots) {
        const nameLower = name.toLowerCase();

        const stepIndexPattern = `step-${step.stepIndex}-`;
        if (nameLower.startsWith(stepIndexPattern)) {
          step.screenshot = screenshotPath;
          break;
        }

        const stepNumPattern1 = `step_${(step.stepIndex || 0) + 1}_`;
        const stepNumPattern2 = `step ${(step.stepIndex || 0) + 1}`;
        if (nameLower.includes(stepNumPattern1) || nameLower.includes(stepNumPattern2)) {
          step.screenshot = screenshotPath;
          break;
        }

        const cleanedName = nameLower.replace(/step[-_]?\d+[-_:]?/i, '').trim();
        const titleLower = step.title.toLowerCase();
        if (cleanedName && (titleLower.includes(cleanedName) || cleanedName.includes(titleLower.substring(0, 20)))) {
          step.screenshot = screenshotPath;
          break;
        }
      }
    }

    const describePath = [];
    let parent = test.parent;
    while (parent) {
      if (parent.title) {
        describePath.unshift(parent.title);
      }
      parent = parent.parent;
    }

    const tagMatches = test.title.match(/@\w+/g) || [];

    const testData = {
      id: `test-${test.id}`,
      title: test.title,
      fullTitle: [...describePath, test.title].join(' > '),
      file: test.location.file,
      describePath: describePath,
      location: `${test.location.file.split('/').pop()}:${test.location.line}`,
      duration: result.duration,
      status: status,
      retry: result.retry,
      screenshots: screenshots,
      steps: [...currentTestSteps],
      video: videoPath,
      trace: tracePath,
      error: result.error?.message,
      errorStack: result.error?.stack,
      tags: tagMatches,
    };

    this.testResults.push(testData);

    const fileName = test.location.file;
    if (!this.fileGroups.has(fileName)) {
      this.fileGroups.set(fileName, {
        file: fileName,
        describes: new Map(),
        stats: { passed: 0, failed: 0, skipped: 0, total: 0 },
      });
    }
    const fileGroup = this.fileGroups.get(fileName);
    fileGroup.stats.total++;
    if (status === 'passed') fileGroup.stats.passed++;
    else if (status === 'failed' || status === 'timedOut') fileGroup.stats.failed++;
    else fileGroup.stats.skipped++;

    const describeKey = describePath.join(' > ');
    if (!fileGroup.describes.has(describeKey)) {
      fileGroup.describes.set(describeKey, []);
    }
    fileGroup.describes.get(describeKey).push(testData);

    this.runningTests.delete(test.id);
    this.completedTestIds.add(test.id);

    this.updateReportRealTime();
  }

  updateReportRealTime() {
    try {
      const reportDir = path.dirname(this.outputFile);
      if (!fs.existsSync(reportDir)) {
        fs.mkdirSync(reportDir, { recursive: true });
      }
      const html = this.generateHTMLRealTime();
      fs.writeFileSync(this.outputFile, html);
    } catch (error) {
      console.error('Real-time report update failed:', error);
    }
  }

  generateHTMLRealTime() {
    const inProgressTests = Array.from(this.runningTests.values());
    const originalResults = this.testResults;
    this.testResults = [...originalResults, ...inProgressTests];

    let html = this.generateHTML();

    this.testResults = originalResults;

    html = html.replace(
      '<meta charset="UTF-8">',
      '<meta charset="UTF-8">\n    <meta http-equiv="refresh" content="5">',
    );

    return html;
  }

  async onEnd(_result) {
    this.endTime = new Date();
    const duration = this.formatDuration(this.endTime.getTime() - this.startTime.getTime());
    const passRate = this.suiteStats.total > 0
      ? ((this.suiteStats.passed / this.suiteStats.total) * 100).toFixed(1)
      : '0';

    console.log('\n╔════════════════════════════════════════════════════════════════╗');
    console.log('║                    FINAL TEST SUMMARY                          ║');
    console.log('╠════════════════════════════════════════════════════════════════╣');
    console.log(`║  Passed:  ${String(this.suiteStats.passed).padEnd(52)}║`);
    console.log(`║  Failed:  ${String(this.suiteStats.failed).padEnd(52)}║`);
    console.log(`║  Skipped: ${String(this.suiteStats.skipped).padEnd(52)}║`);
    console.log(`║  Total:   ${String(this.suiteStats.total).padEnd(52)}║`);
    console.log('╠════════════════════════════════════════════════════════════════╣');
    console.log(`║  Duration: ${duration.padEnd(51)}║`);
    console.log(`║  Pass Rate: ${(passRate + '%').padEnd(50)}║`);
    console.log('╚════════════════════════════════════════════════════════════════╝');

    console.log('\nGenerating TTA HTML Report...');
    await this.generateReport();
    console.log(`Report generated: ${this.outputFile}`);
  }

  formatTime(date) {
    return date.toLocaleString('en-US', {
      month: 'short',
      day: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false,
    });
  }

  formatDuration(ms) {
    const seconds = Math.floor(ms / 1000);
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    if (minutes > 0) {
      return `${minutes}m ${remainingSeconds}s`;
    }
    return `${remainingSeconds}s`;
  }

  formatVideoTime(ms) {
    const totalSeconds = Math.floor(ms / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    const milliseconds = Math.floor((ms % 1000) / 10);
    return `${minutes}:${seconds.toString().padStart(2, '0')}.${milliseconds.toString().padStart(2, '0')}`;
  }

  associateLogsWithSteps(_test, result, testSteps) {
    if (testSteps.length === 0) return;

    for (const step of testSteps) {
      if (!step.consoleLogs) step.consoleLogs = [];
    }

    for (const attachment of result.attachments) {
      const logMatch = attachment.name.match(/^step-(\d+)-logs$/);
      if (logMatch && attachment.contentType === 'text/plain') {
        const stepIndex = parseInt(logMatch[1], 10);
        if (stepIndex >= 0 && stepIndex < testSteps.length) {
          let logContent = '';
          if (attachment.body) {
            logContent = Buffer.isBuffer(attachment.body) ? attachment.body.toString() : String(attachment.body);
          } else if (attachment.path) {
            try { logContent = fs.readFileSync(attachment.path, 'utf-8'); } catch { /* ignore */ }
          }
          if (logContent) {
            const logs = logContent.split('\n').filter(line => line.trim());
            if (logs.length > 0) testSteps[stepIndex].consoleLogs = logs;
          }
        }
      }
    }

    const stdout = result.stdout || [];
    const allLogs = [];
    for (const chunk of stdout) {
      if (typeof chunk === 'string') {
        allLogs.push(...chunk.split('\n').filter(line => line.trim()));
      } else if (Buffer.isBuffer(chunk)) {
        allLogs.push(...chunk.toString().split('\n').filter(line => line.trim()));
      }
    }

    const stderr = result.stderr || [];
    for (const chunk of stderr) {
      if (typeof chunk === 'string') {
        allLogs.push(...chunk.split('\n').filter(line => line.trim()).map(line => `[stderr] ${line}`));
      } else if (Buffer.isBuffer(chunk)) {
        allLogs.push(...chunk.toString().split('\n').filter(line => line.trim()).map(line => `[stderr] ${line}`));
      }
    }

    if (allLogs.length === 0) return;

    const stepTitlePatterns = testSteps.map(step => {
      const escaped = step.title.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      return new RegExp(escaped, 'i');
    });

    const assignedLogs = new Array(allLogs.length).fill(false);

    for (let logIndex = 0; logIndex < allLogs.length; logIndex++) {
      const log = allLogs[logIndex];
      for (let stepIndex = 0; stepIndex < testSteps.length; stepIndex++) {
        if (stepTitlePatterns[stepIndex].test(log)) {
          testSteps[stepIndex].consoleLogs.push(log);
          assignedLogs[logIndex] = true;
          break;
        }
      }
    }

    const unassignedLogs = allLogs.filter((_, idx) => !assignedLogs[idx]);
    if (unassignedLogs.length > 0 && testSteps.length > 0) {
      const stepsNeedingLogs = testSteps.filter(s => s.consoleLogs.length === 0);
      if (stepsNeedingLogs.length > 0) {
        const logsPerStep = Math.ceil(unassignedLogs.length / testSteps.length);
        let logIdx = 0;
        for (let stepIdx = 0; stepIdx < testSteps.length && logIdx < unassignedLogs.length; stepIdx++) {
          const step = testSteps[stepIdx];
          if (step.consoleLogs.length === 0) {
            const logsForThisStep = Math.min(logsPerStep, unassignedLogs.length - logIdx);
            for (let i = 0; i < logsForThisStep; i++) {
              step.consoleLogs.push(unassignedLogs[logIdx++]);
            }
          }
        }
      } else {
        testSteps[0].consoleLogs.push(...unassignedLogs);
      }
    }
  }

  async generateReport() {
    const reportDir = path.dirname(this.outputFile);
    if (!fs.existsSync(reportDir)) {
      fs.mkdirSync(reportDir, { recursive: true });
    }

    const html = this.generateHTML();
    fs.writeFileSync(this.outputFile, html);

    const indexPath = path.join(reportDir, 'index.html');
    const latestRedirect = `<!DOCTYPE html>
<html><head><meta http-equiv="refresh" content="0;url=${path.basename(this.outputFile)}">
<title>TTA Report - Latest</title></head>
<body><p>Redirecting to <a href="${path.basename(this.outputFile)}">latest report</a>...</p></body></html>`;
    fs.writeFileSync(indexPath, latestRedirect);

    this.generateHistoryPage(reportDir);
  }

  generateHistoryPage(reportDir) {
    const files = fs.readdirSync(reportDir)
      .filter(f => f.startsWith('report_') && f.endsWith('.html'))
      .sort()
      .reverse();

    const historyHtml = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>TTA Report History</title>
    <style>
        body { font-family: 'Segoe UI', sans-serif; background: #f5f5f5; padding: 20px; }
        .header { background: linear-gradient(135deg, #10b981 0%, #059669 100%); color: white; padding: 20px; text-align: center; margin-bottom: 20px; border-radius: 8px; }
        .report-list { background: white; padding: 20px; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1); }
        .report-item { padding: 12px; border-bottom: 1px solid #eee; display: flex; justify-content: space-between; align-items: center; }
        .report-item:hover { background: #f0fdf4; }
        .report-link { color: #059669; text-decoration: none; font-weight: 500; }
        .report-link:hover { text-decoration: underline; }
        .report-date { color: #666; font-size: 12px; }
        .latest-badge { background: #10b981; color: white; padding: 2px 8px; border-radius: 10px; font-size: 11px; margin-left: 10px; }
    </style>
</head>
<body>
    <div class="header"><h1>TTA Report History</h1><p>The Testing Academy - Playwright Framework</p></div>
    <div class="report-list">
        ${files.map((f, i) => {
          const match = f.match(/report_(\d{4})(\d{2})(\d{2})_(\d{2})(\d{2})(\d{2})\.html/);
          const dateStr = match ? `${match[1]}-${match[2]}-${match[3]} ${match[4]}:${match[5]}:${match[6]}` : f;
          const latestBadge = i === 0 ? '<span class="latest-badge">LATEST</span>' : '';
          return `<div class="report-item">
              <a href="${f}" class="report-link">${f}${latestBadge}</a>
              <span class="report-date">${dateStr}</span>
          </div>`;
        }).join('\n')}
    </div>
</body>
</html>`;
    fs.writeFileSync(path.join(reportDir, 'history.html'), historyHtml);
  }

  generateHTML() {
    const browserName = this.config?.projects?.[0]?.name || 'chromium';
    const platform = process.platform === 'darwin' ? 'Mac' : process.platform === 'win32' ? 'Windows' : 'Linux';

    return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>TTA Automation Report</title>
    <style>
        ${this.getStyles()}
    </style>
</head>
<body>
    <div class="header">
        <h1>TTA Automation Report</h1>
        <p class="header-subtitle">The Testing Academy - Playwright Framework</p>
    </div>

    <div class="container">
        ${this.generateMetaSection(browserName, platform)}
        ${this.generateFilters()}
        ${this.generateTestTable()}
    </div>

    <div id="screenshotModal" class="modal">
        <span class="modal-close">&times;</span>
        <img id="modalImage" class="modal-content" src="" alt="Screenshot">
    </div>

    <footer class="report-footer">
        <p>Built with love by <a href="https://thetestingacademy.com" target="_blank">Pramod Dutta</a> | <a href="https://thetestingacademy.com" target="_blank">The Testing Academy</a></p>
    </footer>

    <script>
        ${this.getScripts()}
    </script>
</body>
</html>`;
  }

  generateMetaSection(browserName, platform) {
    const env = process.env.TEST_ENV || 'UAT';
    const totalDuration = this.endTime.getTime() - this.startTime.getTime();
    const passRate = this.suiteStats.total > 0
      ? ((this.suiteStats.passed / this.suiteStats.total) * 100).toFixed(1)
      : '0';

    return `
        <div class="stats-dashboard">
            <div class="stat-card">
                <div class="stat-value">${this.suiteStats.total}</div>
                <div class="stat-label">Total Tests</div>
            </div>
            <div class="stat-card passed">
                <div class="stat-value">${this.suiteStats.passed}</div>
                <div class="stat-label">Passed</div>
            </div>
            <div class="stat-card failed">
                <div class="stat-value">${this.suiteStats.failed}</div>
                <div class="stat-label">Failed</div>
            </div>
            <div class="stat-card skipped">
                <div class="stat-value">${this.suiteStats.skipped}</div>
                <div class="stat-label">Skipped</div>
            </div>
            <div class="stat-card">
                <div class="stat-value">${passRate}%</div>
                <div class="stat-label">Pass Rate</div>
            </div>
            <div class="stat-card">
                <div class="stat-value">${this.formatDuration(totalDuration)}</div>
                <div class="stat-label">Duration</div>
            </div>
        </div>

        <div class="meta-section">
            <div class="meta-item">
                <span class="meta-label">Environment</span>
                <span class="env-badge">${env.toUpperCase()}</span>
            </div>
            <div class="meta-item">
                <span class="meta-label">Browser</span>
                <span class="browser-badge">${browserName}</span>
            </div>
            <div class="meta-item">
                <span class="meta-label">Platform</span>
                <span class="meta-value">${platform}</span>
            </div>
            <div class="meta-item">
                <span class="meta-label">Workers</span>
                <span class="meta-value">${this.config?.workers || 1}</span>
            </div>
            <div class="meta-item">
                <span class="meta-label">Run ID</span>
                <span class="meta-value" style="font-family: 'JetBrains Mono', monospace; font-size: 12px;">${this.runId}</span>
            </div>
            <div class="meta-item">
                <span class="meta-label">Started</span>
                <span class="meta-value">${this.formatTime(this.startTime)}</span>
            </div>
        </div>`;
  }

  generateFilters() {
    return `
        <div class="filters">
            <div class="filter-group">
                <strong>Priority:</strong>
                <label><input type="checkbox" class="group-filter" value="all" checked onchange="filterByGroup(this)"><span>All</span></label>
                <label><input type="checkbox" class="group-filter" value="p0" onchange="filterByGroup(this)"><span>P0</span></label>
                <label><input type="checkbox" class="group-filter" value="p1" onchange="filterByGroup(this)"><span>P1</span></label>
                <label><input type="checkbox" class="group-filter" value="smoke" onchange="filterByGroup(this)"><span>Smoke</span></label>
            </div>
            <div class="filter-group">
                <strong>Status:</strong>
                <label><input type="checkbox" class="status-filter" value="all" checked onchange="filterByStatus(this)"><span>All</span></label>
                <label><input type="checkbox" class="status-filter" value="passed" onchange="filterByStatus(this)"><span>Passed</span></label>
                <label><input type="checkbox" class="status-filter" value="failed" onchange="filterByStatus(this)"><span>Failed</span></label>
                <label><input type="checkbox" class="status-filter" value="skipped" onchange="filterByStatus(this)"><span>Skipped</span></label>
            </div>
        </div>`;
  }

  generateTestTable() {
    let html = '<div class="test-table-container">';
    html += `
        <table class="test-table">
            <thead>
                <tr>
                    <th>S.No</th>
                    <th>Suite</th>
                    <th>Test Name</th>
                    <th>Author</th>
                    <th>Priority</th>
                    <th>Tags</th>
                    <th>File</th>
                    <th>Start Time</th>
                    <th>End Time</th>
                    <th>Duration</th>
                    <th>Status</th>
                    <th>Screenshot</th>
                    <th>Video</th>
                    <th>Trace</th>
                </tr>
            </thead>
            <tbody>`;

    let serialNo = 1;

    for (const test of this.testResults) {
      const statusClass = test.status === 'passed' ? 'passed' : test.status === 'failed' || test.status === 'timedOut' ? 'failed' : 'skipped';
      const statusText = test.status === 'passed' ? 'Passed' : test.status === 'failed' || test.status === 'timedOut' ? 'Failed' : 'Skipped';
      const duration = this.formatDuration(test.duration);
      const tagsData = test.tags.join(',').toLowerCase();
      const testGroup = test.tags.find(t => t.includes('P0') || t.includes('P1') || t.includes('P2')) || test.describePath[0] || 'E2E';
      const author = process.env.TEST_AUTHOR || 'TTA-QA';
      const testStartTime = new Date(this.startTime.getTime());
      const testEndTime = new Date(testStartTime.getTime() + test.duration);
      const firstScreenshot = test.screenshots[0]?.path || (test.steps.find(s => s.screenshot)?.screenshot) || '';

      html += `
                <tr class="test-row ${statusClass}" data-test-id="${test.id}" data-tags="${tagsData}">
                    <td class="col-sno">${serialNo}</td>
                    <td class="col-suite">${this.escapeHtml(test.describePath[0] || 'Default')}</td>
                    <td class="col-testname">
                        <span class="test-name-link" onclick="toggleTestDetail('${test.id}')">${this.escapeHtml(test.title)}</span>
                    </td>
                    <td class="col-author">${author}</td>
                    <td class="col-group">${this.escapeHtml(testGroup)}</td>
                    <td class="col-tags">${test.tags.map(t => `<span class="tag">${t}</span>`).join(' ')}</td>
                    <td class="col-file">${this.escapeHtml(test.location)}</td>
                    <td class="col-starttime">${this.formatTime(testStartTime)}</td>
                    <td class="col-endtime">${this.formatTime(testEndTime)}</td>
                    <td class="col-duration">${duration}</td>
                    <td class="col-status"><span class="status-badge ${statusClass}">${statusText}</span></td>
                    <td class="col-screenshot">
                        ${firstScreenshot ? `<a href="${firstScreenshot}" target="_blank" class="screenshot-link">View</a>` : 'N/A'}
                    </td>
                    <td class="col-video">
                        ${test.video ? `<a href="${test.video}" target="_blank" class="video-link-cell">Play</a>` : 'N/A'}
                    </td>
                    <td class="col-trace">
                        ${test.trace ? `<a href="${test.trace}" target="_blank" class="trace-link-cell">View</a>` : 'N/A'}
                    </td>
                </tr>
                <tr class="test-detail-row" id="detail-row-${test.id}" style="display: none;">
                    <td colspan="14">
                        <div class="test-detail" id="detail-${test.id}">
                            ${this.generateTestDetailPanel(test)}
                        </div>
                    </td>
                </tr>`;

      serialNo++;
    }

    html += `
            </tbody>
        </table>
        </div>`;

    return html;
  }

  generateTestDetailPanel(test) {
    let html = '<div class="detail-panel">';

    if (test.error) {
      html += `
            <div class="detail-section error-section">
                <div class="section-header" onclick="toggleSection(this)">
                    <span class="section-arrow">&#9660;</span> Errors
                </div>
                <div class="section-content">
                    <div class="error-box">
                        <pre class="error-message">${this.escapeHtml(test.error)}</pre>
                        ${test.errorStack ? `<details class="stack-details"><summary>Call Stack</summary><pre class="stack-trace-content">${this.escapeHtml(test.errorStack)}</pre></details>` : ''}
                    </div>
                </div>
            </div>`;
    }

    if (test.steps.length > 0) {
      html += `
            <div class="detail-section steps-section">
                <div class="section-header" onclick="toggleSection(this)">
                    <span class="section-arrow">&#9660;</span> Test Steps
                </div>
                <div class="section-content">
                    <div class="steps-list">`;

      for (let stepIndex = 0; stepIndex < test.steps.length; stepIndex++) {
        const step = test.steps[stepIndex];
        const stepIcon = step.status === 'passed' ? '&#10003;' : '&#10007;';
        const stepClass = step.status;
        const stepId = `step-${test.id}-${stepIndex}`;

        html += `
                    <div class="step-item-container">
                        <div class="step-item ${stepClass} expandable" onclick="toggleStepDetails(this, '${stepId}-details')">
                            <span class="step-expand-icon">&#9654;</span>
                            <span class="step-icon ${stepClass}">${stepIcon}</span>
                            <span class="step-name">${this.escapeHtml(step.title)}</span>
                            <span class="step-time">${this.formatDuration(step.duration)}</span>
                        </div>
                        <div id="${stepId}-details" class="step-details" style="display: none;">
                            <div class="step-meta">
                                <span class="step-meta-item">Started: ${step.startTime || 'N/A'}</span>
                                <span class="step-meta-item">Duration: ${this.formatDuration(step.duration)}</span>
                                <span class="step-meta-item">Video: ${this.formatVideoTime(step.videoStartTime || 0)} - ${this.formatVideoTime(step.videoEndTime || 0)}</span>
                            </div>`;

        if (step.consoleLogs && step.consoleLogs.length > 0) {
          html += `
                            <div class="step-console">
                                <div class="step-console-header">Console Output (${step.consoleLogs.length} lines)</div>
                                <div class="step-console-content">`;
          for (const log of step.consoleLogs) {
            html += `<div class="console-line">${this.escapeHtml(log)}</div>`;
          }
          html += `
                                </div>
                            </div>`;
        }

        if (step.screenshot) {
          html += `
                            <div class="step-screenshot">
                                <div class="step-screenshot-header">Screenshot</div>
                                <a href="${step.screenshot}" target="_blank">
                                    <img src="${step.screenshot}" alt="Step Screenshot" class="step-screenshot-img"/>
                                </a>
                            </div>`;
        }

        if (step.error) {
          html += `
                            <div class="step-error">
                                <div class="step-error-header">Error</div>
                                <div class="step-error-message">${this.escapeHtml(step.error)}</div>
                            </div>`;
          if (step.stackTrace) {
            html += `
                            <div class="step-stack-trace">
                                <div class="step-stack-header">Stack Trace</div>
                                <pre class="step-stack-content">${this.escapeHtml(step.stackTrace)}</pre>
                            </div>`;
          }
        }

        html += `
                        </div>
                    </div>`;
      }

      html += `
                    </div>
                </div>
            </div>`;
    }

    if (test.screenshots.length > 0) {
      html += `
            <div class="detail-section screenshots-section">
                <div class="section-header" onclick="toggleSection(this)">
                    <span class="section-arrow">&#9660;</span> Screenshots
                </div>
                <div class="section-content">
                    <div class="screenshots-grid">`;

      for (const screenshot of test.screenshots) {
        html += `
                    <div class="screenshot-item">
                        <a href="${screenshot.path}" target="_blank" class="screenshot-link">
                            <img src="${screenshot.path}" alt="${screenshot.name}" class="screenshot-preview"/>
                        </a>
                        <div class="screenshot-name">${this.escapeHtml(screenshot.name)}</div>
                    </div>`;
      }

      html += `
                    </div>
                </div>
            </div>`;
    }

    if (test.trace) {
      html += `
            <div class="detail-section traces-section">
                <div class="section-header" onclick="toggleSection(this)">
                    <span class="section-arrow">&#9660;</span> Traces
                </div>
                <div class="section-content">
                    <a href="${test.trace}" download class="trace-download">trace</a>
                </div>
            </div>`;
    }

    if (test.video) {
      html += `
            <div class="detail-section videos-section">
                <div class="section-header" onclick="toggleSection(this)">
                    <span class="section-arrow">&#9660;</span> Videos
                </div>
                <div class="section-content">
                    <video controls class="test-video" src="${test.video}"></video>
                    <div class="video-link"><a href="${test.video}" target="_blank">video</a></div>
                </div>
            </div>`;
    }

    html += '</div>';
    return html;
  }

  escapeHtml(text) {
    if (!text) return '';
    return text
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }

  getStyles() {
    return `
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap');

        :root {
            --primary: #059669;
            --primary-light: #10b981;
            --primary-dark: #047857;
            --primary-bg: #ecfdf5;
            --accent: #0d9488;
            --success: #22c55e;
            --danger: #ef4444;
            --warning: #f59e0b;
            --info: #3b82f6;
            --dark: #1e293b;
            --gray-50: #f8fafc;
            --gray-100: #f1f5f9;
            --gray-200: #e2e8f0;
            --gray-300: #cbd5e1;
            --gray-400: #94a3b8;
            --gray-500: #64748b;
            --gray-600: #475569;
            --gray-700: #334155;
            --shadow-sm: 0 1px 2px 0 rgb(0 0 0 / 0.05);
            --shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
            --shadow-lg: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1);
            --shadow-xl: 0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1);
            --radius: 12px;
            --radius-sm: 8px;
            --radius-lg: 16px;
        }

        * { margin: 0; padding: 0; box-sizing: border-box; }

        body {
            font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
            font-size: 14px;
            line-height: 1.6;
            background: linear-gradient(135deg, var(--gray-100) 0%, var(--primary-bg) 100%);
            min-height: 100vh;
            color: var(--gray-700);
        }

        .header {
            background: linear-gradient(135deg, var(--primary) 0%, var(--accent) 50%, var(--primary-dark) 100%);
            color: white;
            padding: 40px 20px;
            text-align: center;
            position: relative;
            overflow: hidden;
        }
        .header::before {
            content: '';
            position: absolute;
            top: -50%; left: -50%;
            width: 200%; height: 200%;
            background: radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 60%);
            animation: pulse 15s ease-in-out infinite;
        }
        @keyframes pulse {
            0%, 100% { transform: scale(1); opacity: 0.5; }
            50% { transform: scale(1.1); opacity: 0.3; }
        }
        .header h1 { font-size: 32px; font-weight: 700; letter-spacing: -0.5px; position: relative; text-shadow: 0 2px 4px rgba(0,0,0,0.2); }
        .header-subtitle { margin-top: 8px; font-size: 16px; font-weight: 400; opacity: 0.9; position: relative; }

        .container { max-width: 1600px; margin: 0 auto; padding: 30px; }

        .stats-dashboard { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 20px; margin-bottom: 30px; }
        .stat-card { background: white; border-radius: var(--radius); padding: 24px; box-shadow: var(--shadow); transition: transform 0.2s, box-shadow 0.2s; border-left: 4px solid var(--primary); }
        .stat-card:hover { transform: translateY(-2px); box-shadow: var(--shadow-lg); }
        .stat-card.passed { border-left-color: var(--success); }
        .stat-card.failed { border-left-color: var(--danger); }
        .stat-card.skipped { border-left-color: var(--gray-400); }
        .stat-value { font-size: 36px; font-weight: 700; color: var(--dark); line-height: 1; }
        .stat-label { font-size: 13px; color: var(--gray-500); text-transform: uppercase; letter-spacing: 0.5px; margin-top: 8px; font-weight: 500; }

        .meta-section { background: white; padding: 20px 24px; margin-bottom: 24px; border-radius: var(--radius); box-shadow: var(--shadow); display: flex; flex-wrap: wrap; gap: 24px; align-items: center; }
        .meta-item { display: flex; align-items: center; gap: 10px; }
        .meta-label { font-size: 12px; color: var(--gray-500); text-transform: uppercase; letter-spacing: 0.5px; font-weight: 600; }
        .meta-value { font-weight: 600; color: var(--dark); }
        .env-badge, .browser-badge { display: inline-flex; align-items: center; gap: 6px; padding: 6px 14px; border-radius: 20px; font-size: 12px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px; }
        .env-badge { background: linear-gradient(135deg, var(--primary-light) 0%, var(--primary) 100%); color: white; box-shadow: 0 2px 8px rgba(16, 185, 129, 0.3); }
        .browser-badge { background: var(--gray-100); color: var(--gray-700); border: 1px solid var(--gray-200); }

        .filters { background: white; padding: 20px 24px; margin-bottom: 24px; border-radius: var(--radius); box-shadow: var(--shadow); display: flex; flex-wrap: wrap; gap: 30px; align-items: center; }
        .filter-group { display: flex; align-items: center; gap: 12px; flex-wrap: wrap; }
        .filter-group strong { font-size: 13px; color: var(--gray-600); text-transform: uppercase; letter-spacing: 0.5px; }
        .filter-group label { display: inline-flex; align-items: center; gap: 6px; padding: 8px 16px; background: var(--gray-50); border: 1px solid var(--gray-200); border-radius: 20px; cursor: pointer; font-size: 13px; font-weight: 500; transition: all 0.2s; }
        .filter-group label:hover { background: var(--primary-bg); border-color: var(--primary-light); }
        .filter-group input[type="checkbox"] { accent-color: var(--primary); width: 16px; height: 16px; }
        .filter-group input[type="checkbox"]:checked + span { color: var(--primary); }

        .test-table-container { background: white; border-radius: var(--radius); box-shadow: var(--shadow-lg); overflow: hidden; }
        .test-table { width: 100%; border-collapse: separate; border-spacing: 0; font-size: 13px; }
        .test-table thead { background: linear-gradient(135deg, var(--dark) 0%, var(--gray-700) 100%); color: white; position: sticky; top: 0; z-index: 10; }
        .test-table th { padding: 16px 12px; text-align: left; font-weight: 600; font-size: 11px; text-transform: uppercase; letter-spacing: 0.5px; border: none; white-space: nowrap; }
        .test-table td { padding: 14px 12px; border-bottom: 1px solid var(--gray-100); vertical-align: middle; }
        .test-table tbody tr { background: white; transition: all 0.2s; }
        .test-table tbody tr:nth-child(even) { background: var(--gray-50); }
        .test-row:hover { background: var(--primary-bg) !important; transform: scale(1.001); }
        .test-row.failed { background: #fef2f2 !important; border-left: 3px solid var(--danger); }
        .test-row.failed:hover { background: #fee2e2 !important; }
        .test-row.passed { border-left: 3px solid transparent; }

        .col-sno { width: 50px; text-align: center; font-weight: 600; color: var(--gray-400); }
        .col-suite { min-width: 120px; }
        .col-testname { min-width: 280px; }
        .col-author { width: 80px; }
        .col-group { width: 80px; }
        .col-tags { min-width: 120px; }
        .col-file { min-width: 140px; font-family: 'JetBrains Mono', monospace; font-size: 11px; color: var(--gray-500); }
        .col-starttime, .col-endtime { width: 160px; font-size: 12px; color: var(--gray-500); }
        .col-duration { width: 80px; text-align: center; font-weight: 600; }
        .col-status { width: 100px; text-align: center; }
        .col-screenshot, .col-video, .col-trace { width: 80px; text-align: center; }

        .test-name-link { color: var(--dark); cursor: pointer; text-decoration: none; font-weight: 500; transition: color 0.2s; }
        .test-name-link:hover { color: var(--primary); }

        .status-badge { display: inline-flex; align-items: center; justify-content: center; padding: 6px 14px; border-radius: 20px; font-weight: 600; font-size: 11px; text-transform: uppercase; letter-spacing: 0.5px; gap: 4px; }
        .status-badge.passed { background: linear-gradient(135deg, #22c55e 0%, #16a34a 100%); color: white; box-shadow: 0 2px 8px rgba(34, 197, 94, 0.3); }
        .status-badge.failed { background: linear-gradient(135deg, #ef4444 0%, #dc2626 100%); color: white; box-shadow: 0 2px 8px rgba(239, 68, 68, 0.3); }
        .status-badge.skipped { background: var(--gray-200); color: var(--gray-600); }

        .screenshot-link, .video-link-cell, .trace-link-cell { display: inline-flex; align-items: center; gap: 4px; padding: 6px 12px; border-radius: var(--radius-sm); text-decoration: none; font-size: 12px; font-weight: 500; transition: all 0.2s; }
        .screenshot-link { background: var(--primary-bg); color: var(--primary); }
        .screenshot-link:hover { background: var(--primary); color: white; }
        .video-link-cell { background: #fef3c7; color: #d97706; }
        .video-link-cell:hover { background: #f59e0b; color: white; }
        .trace-link-cell { background: #ede9fe; color: #7c3aed; }
        .trace-link-cell:hover { background: #8b5cf6; color: white; }

        .tag { display: inline-block; padding: 4px 10px; border-radius: 12px; font-size: 10px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.3px; margin: 2px; background: var(--primary-bg); color: var(--primary-dark); border: 1px solid var(--primary-light); }

        .test-detail-row { background: var(--gray-50) !important; }
        .test-detail-row td { padding: 0 !important; }
        .test-detail { margin: 16px 24px; border-radius: var(--radius); background: white; box-shadow: var(--shadow); overflow: hidden; }
        .detail-panel { padding: 0; }
        .detail-section { border-bottom: 1px solid var(--gray-100); }
        .detail-section:last-child { border-bottom: none; }
        .section-header { padding: 16px 20px; background: var(--gray-50); cursor: pointer; font-weight: 600; font-size: 14px; display: flex; align-items: center; gap: 10px; transition: background 0.2s; }
        .section-header:hover { background: var(--gray-100); }
        .section-arrow { font-size: 12px; color: var(--gray-400); transition: transform 0.3s; }
        .section-collapsed .section-arrow { transform: rotate(-90deg); }
        .section-collapsed .section-content { display: none; }
        .section-content { padding: 20px; }

        .error-section .section-header { background: #fef2f2; color: var(--danger); }
        .error-box { background: white; border: 1px solid #fecaca; border-radius: var(--radius-sm); padding: 16px; border-left: 4px solid var(--danger); }
        .error-message { margin: 0; color: var(--danger); font-family: 'JetBrains Mono', monospace; font-size: 13px; white-space: pre-wrap; word-break: break-word; line-height: 1.6; }
        .stack-details { margin-top: 16px; }
        .stack-details summary { cursor: pointer; color: var(--gray-500); font-size: 13px; font-weight: 500; padding: 8px 0; }
        .stack-trace-content { margin: 12px 0 0 0; padding: 16px; background: var(--dark); color: #a7f3d0; font-family: 'JetBrains Mono', monospace; font-size: 12px; border-radius: var(--radius-sm); overflow-x: auto; max-height: 300px; overflow-y: auto; line-height: 1.6; }

        .steps-list { background: white; border-radius: var(--radius-sm); border: 1px solid var(--gray-100); overflow: hidden; }
        .step-item-container { border-bottom: 1px solid var(--gray-100); }
        .step-item-container:last-child { border-bottom: none; }
        .step-item { display: flex; align-items: center; padding: 14px 16px; transition: background 0.2s; }
        .step-item.expandable { cursor: pointer; }
        .step-item.expandable:hover { background: var(--gray-50); }
        .step-item.failed { background: #fef2f2; }
        .step-expand-icon { width: 20px; font-size: 10px; color: var(--gray-400); transition: transform 0.3s; }
        .step-item.expanded .step-expand-icon { transform: rotate(90deg); }
        .step-icon { width: 28px; height: 28px; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin-right: 12px; font-size: 14px; }
        .step-icon.passed { background: #dcfce7; color: var(--success); }
        .step-icon.failed { background: #fee2e2; color: var(--danger); }
        .step-name { flex: 1; font-size: 13px; font-weight: 500; color: var(--dark); }
        .step-time { color: var(--gray-500); font-size: 12px; font-family: 'JetBrains Mono', monospace; background: var(--gray-100); padding: 4px 10px; border-radius: 12px; }
        .step-details { background: var(--gray-50); border-top: 1px solid var(--gray-100); padding: 16px 20px 16px 56px; }
        .step-meta { display: flex; flex-wrap: wrap; gap: 20px; color: var(--gray-500); font-size: 12px; margin-bottom: 16px; padding-bottom: 12px; border-bottom: 1px dashed var(--gray-200); }
        .step-meta-item { display: flex; align-items: center; gap: 6px; }
        .step-console { margin-bottom: 16px; }
        .step-console-header { font-weight: 600; color: var(--dark); margin-bottom: 10px; font-size: 13px; }
        .step-console-content { background: var(--dark); color: #a7f3d0; padding: 16px; border-radius: var(--radius-sm); font-family: 'JetBrains Mono', monospace; font-size: 12px; line-height: 1.6; max-height: 300px; overflow-y: auto; }
        .console-line { padding: 4px 0; border-bottom: 1px solid rgba(255,255,255,0.05); }
        .console-line:last-child { border-bottom: none; }

        .step-screenshot { margin-bottom: 16px; }
        .step-screenshot-header { font-weight: 600; color: var(--dark); margin-bottom: 10px; }
        .step-screenshot-img { max-width: 100%; max-height: 250px; border: 1px solid var(--gray-200); border-radius: var(--radius-sm); box-shadow: var(--shadow); }
        .step-error { margin-bottom: 16px; }
        .step-error-header { font-weight: 600; color: var(--danger); margin-bottom: 10px; }
        .step-error-message { background: #fef2f2; color: #b91c1c; padding: 16px; border-radius: var(--radius-sm); font-family: 'JetBrains Mono', monospace; font-size: 12px; border-left: 4px solid var(--danger); }
        .step-stack-trace { margin-top: 12px; }
        .step-stack-header { font-weight: 600; color: var(--warning); margin-bottom: 10px; }
        .step-stack-content { background: #fffbeb; color: #92400e; padding: 16px; border-radius: var(--radius-sm); font-family: 'JetBrains Mono', monospace; font-size: 11px; max-height: 200px; overflow-y: auto; margin: 0; border-left: 4px solid var(--warning); }

        .screenshots-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(220px, 1fr)); gap: 20px; }
        .screenshot-item { background: white; border: 1px solid var(--gray-200); border-radius: var(--radius); overflow: hidden; transition: transform 0.2s, box-shadow 0.2s; }
        .screenshot-item:hover { transform: translateY(-4px); box-shadow: var(--shadow-lg); }
        .screenshot-preview { width: 100%; height: 160px; object-fit: cover; display: block; }
        .screenshot-name { padding: 12px; font-size: 12px; color: var(--gray-600); border-top: 1px solid var(--gray-100); font-weight: 500; }

        .trace-download { display: inline-flex; align-items: center; gap: 8px; padding: 12px 20px; background: linear-gradient(135deg, var(--primary-bg) 0%, #d1fae5 100%); color: var(--primary-dark); text-decoration: none; border-radius: var(--radius-sm); font-size: 13px; font-weight: 600; transition: all 0.2s; border: 1px solid var(--primary-light); }
        .trace-download:hover { background: var(--primary); color: white; border-color: var(--primary); }
        .test-video { max-width: 100%; max-height: 450px; border-radius: var(--radius); box-shadow: var(--shadow-lg); }
        .video-link { margin-top: 12px; font-size: 13px; }
        .video-link a { color: var(--primary); font-weight: 500; }

        .modal { display: none; position: fixed; z-index: 1000; left: 0; top: 0; width: 100%; height: 100%; background-color: rgba(0,0,0,0.95); justify-content: center; align-items: center; backdrop-filter: blur(4px); }
        .modal.active { display: flex; }
        .modal-content { max-width: 95%; max-height: 95%; object-fit: contain; border-radius: var(--radius); box-shadow: var(--shadow-xl); }
        .modal-close { position: absolute; top: 20px; right: 30px; color: white; font-size: 40px; cursor: pointer; transition: color 0.2s, transform 0.2s; }
        .modal-close:hover { color: var(--primary-light); transform: scale(1.1); }

        .report-footer { text-align: center; padding: 30px 20px; background: linear-gradient(135deg, var(--dark) 0%, var(--gray-700) 100%); color: white; margin-top: 40px; }
        .report-footer p { font-size: 14px; opacity: 0.9; }
        .report-footer a { color: var(--primary-light); text-decoration: none; font-weight: 600; transition: color 0.2s; }
        .report-footer a:hover { color: white; text-decoration: underline; }

        @media (max-width: 1200px) { .container { padding: 20px; } .test-table { font-size: 12px; } }
        @media (max-width: 768px) { .header { padding: 30px 15px; } .header h1 { font-size: 24px; } .meta-section, .filters { flex-direction: column; align-items: flex-start; } .stats-dashboard { grid-template-columns: repeat(2, 1fr); } }
        `;
  }

  getScripts() {
    return `
        function toggleTestDetail(testId) {
            var detailRow = document.getElementById('detail-row-' + testId);
            if (detailRow) {
                detailRow.style.display = detailRow.style.display === 'none' ? 'table-row' : 'none';
            }
        }

        function toggleSection(header) {
            var section = header.parentElement;
            section.classList.toggle('section-collapsed');
        }

        function toggleStepDetails(stepElement, detailsId) {
            var details = document.getElementById(detailsId);
            if (details) {
                if (details.style.display === 'none') {
                    details.style.display = 'block';
                    stepElement.classList.add('expanded');
                } else {
                    details.style.display = 'none';
                    stepElement.classList.remove('expanded');
                }
            }
        }

        function filterByStatus(checkbox) {
            var allCheckbox = document.querySelector('.status-filter[value="all"]');
            if (checkbox.value === 'all') {
                if (checkbox.checked) {
                    document.querySelectorAll('.status-filter:not([value="all"])').forEach(function(cb) { cb.checked = false; });
                }
            } else {
                if (checkbox.checked && allCheckbox) allCheckbox.checked = false;
                var anyChecked = document.querySelectorAll('.status-filter:not([value="all"]):checked').length > 0;
                if (!anyChecked && allCheckbox) allCheckbox.checked = true;
            }
            applyFilters();
        }

        function filterByGroup(checkbox) {
            var allCheckbox = document.querySelector('.group-filter[value="all"]');
            if (checkbox.value === 'all') {
                if (checkbox.checked) {
                    document.querySelectorAll('.group-filter:not([value="all"])').forEach(function(cb) { cb.checked = false; });
                }
            } else {
                if (checkbox.checked && allCheckbox) allCheckbox.checked = false;
                var anyChecked = document.querySelectorAll('.group-filter:not([value="all"]):checked').length > 0;
                if (!anyChecked && allCheckbox) allCheckbox.checked = true;
            }
            applyFilters();
        }

        function applyFilters() {
            var statusAll = document.querySelector('.status-filter[value="all"]');
            var groupAll = document.querySelector('.group-filter[value="all"]');
            var statusFilters = Array.from(document.querySelectorAll('.status-filter:not([value="all"]):checked')).map(function(f) { return f.value; });
            var groupFilters = Array.from(document.querySelectorAll('.group-filter:not([value="all"]):checked')).map(function(f) { return f.value; });

            document.querySelectorAll('.test-row').forEach(function(row) {
                var statusMatch = statusAll && statusAll.checked;
                if (!statusMatch) {
                    var rowStatus = row.classList.contains('passed') ? 'passed' : row.classList.contains('failed') ? 'failed' : 'skipped';
                    statusMatch = statusFilters.indexOf(rowStatus) !== -1;
                }

                var groupMatch = groupAll && groupAll.checked;
                if (!groupMatch) {
                    var tags = row.getAttribute('data-tags') || '';
                    groupMatch = groupFilters.some(function(g) { return tags.toLowerCase().indexOf(g.toLowerCase()) !== -1; });
                }

                var testId = row.getAttribute('data-test-id');
                var detailRow = document.getElementById('detail-row-' + testId);

                row.style.display = (statusMatch && groupMatch) ? '' : 'none';
                if (detailRow && detailRow.style.display !== 'none') {
                    detailRow.style.display = (statusMatch && groupMatch) ? 'table-row' : 'none';
                }
            });
        }

        document.addEventListener('DOMContentLoaded', function() {
            var modal = document.getElementById('screenshotModal');
            var modalImg = document.getElementById('modalImage');
            var closeBtn = document.querySelector('.modal-close');

            document.querySelectorAll('.screenshot-link').forEach(function(link) {
                link.addEventListener('click', function(e) {
                    e.preventDefault();
                    e.stopPropagation();
                    if (modal && modalImg) {
                        modal.classList.add('active');
                        modalImg.src = this.href;
                    }
                });
            });

            if (closeBtn) {
                closeBtn.addEventListener('click', function() { modal.classList.remove('active'); });
            }
            if (modal) {
                modal.addEventListener('click', function(e) { if (e.target === modal) modal.classList.remove('active'); });
            }
            document.addEventListener('keydown', function(e) { if (e.key === 'Escape' && modal) modal.classList.remove('active'); });

            // Auto-expand failed tests
            document.querySelectorAll('.test-row.failed').forEach(function(row) {
                var testId = row.getAttribute('data-test-id');
                if (testId) toggleTestDetail(testId);
            });
        });
        `;
  }
}

module.exports = CustomTTAReporter;
