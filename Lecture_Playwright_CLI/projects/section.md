# VWO Invalid Login Task Notes

## User Prompt
Please open app.vwo.com and try an invalid username and invalid password, then click on the submit button. Whatever error is coming, you need to verify that error message and make sure you prepare an HTML report as well with index.html, a single file HTML report about the password fill test case. If you see the error message, it means it's a pass. If you don't see an error message or you see something different, it's a known error. Please create all the codes and everything into this folder only, which is project. Make sure that you use playwright-cli.

## Commands Used
1. playwright-cli -s=vwo-invalid open https://app.vwo.com/#/login
2. playwright-cli -s=vwo-invalid run-code "(async page => { ...invalid login automation... })"
3. playwright-cli -s=vwo-invalid screenshot --filename=vwo-invalid-login.png
4. playwright-cli -s=vwo-invalid close

## Artifacts Created In projects
- index.html
- vwo-invalid-login-run.js
- vwo-invalid-login-result.json
- vwo-invalid-login.png
- section.md

## Verification Outcome
- Observed error message: Your email, password, IP address or location did not match
- Result: PASS
- Rule applied: Error shown after invalid credentials means PASS; otherwise KNOWN_ERROR.
