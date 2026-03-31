let testRun = new Promise(function (resolve, reject) {
    reject("Assertion Failed");

});

testRun.then(function (data) { // Resolve
    console.log(data);
}).catch(function (error) { // Reject
    console.log(error);
}).finally(function () { // Always Executed!
    console.log("I will be executed anyhow!!");
});

// .finally() ALWAYS runs — whether the test passed or failed. Just like afterEach() in Cypress or Playwright.

