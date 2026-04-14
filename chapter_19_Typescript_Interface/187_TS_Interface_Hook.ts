// Interface for test hook functions
interface TestHook {
    (testName: string): void;
}

let beforeEachHook: TestHook = function (testName: string): void {
    console.log("[BEFORE] Setting up: " + testName);
}

let afterEachHook: TestHook = function (testName: string): void {
    console.log("[AFTER] Tearing down: " + testName);
};


beforeEachHook("Login Test");

// This is where My Test case will be !!

interface TestCase {
    id: number;
    name: string;
    status: string;
    duration: number;
}

let test1: TestCase = {
    id: 1,
    name: "Login with valid credentials",
    status: "PASS",
    duration: 1500
};

console.log("TC-" + test1.id + ": " + test1.name + " → " + test1.status);


afterEachHook("Login Test");