// Higher-Order Functions

// A function that takes a function as argument or returns a function.

function runWithLogging(testfn, testName) {
    console.log(`Starting: ${testName}`);
    let result = testfn();
    console.log(`Finished: ${testName} → ${result}`);
    return result;
}

function loginTest() {
    return "pass";
}
function loginTestFAILED() {
    return "fail";
}

runWithLogging(loginTest, "Login Test");
runWithLogging(loginTestFAILED, "Dashboard Failed Test");

