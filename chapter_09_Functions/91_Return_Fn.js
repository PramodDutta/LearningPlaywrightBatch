// Return Values

function getStatus(code) {
    if (code >= 200 && code < 300) return "success";
    if (code >= 400 && code < 500) return "client error";
    if (code >= 500) return "server error";
}

getStatus(200);  // "success"
getStatus(404);  // "client error"
getStatus(500);  // "server error"


// Returns nothing → undefined
function logTest(name) {
    console.log(`Running: ${name}`);
    // no return statement
}


logTest("Hi this is a a log");

// Return multiple values via array or object

function aaa() {
    return [2, 2, 3, 5, 4];
    /// return {"name : pramod"}; - object
}