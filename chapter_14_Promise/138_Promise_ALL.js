let checkAuth = Promise.resolve("Auth Ok");
let checkDB = Promise.resolve("DB OK");
let checkCache = Promise.resolve("Cache OK");

Promise.all([checkAuth, checkDB, checkCache]).then(function (results) {
    console.log("All checks:", results);
})

Promise.all([
    Promise.resolve("OK"),
    Promise.reject("DB DOWN"),
    Promise.resolve("OK")
])
    .then(function (r) { console.log(r); })
    .catch(function (err) { console.log("Failed:", err); });