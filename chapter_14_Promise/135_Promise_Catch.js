let apiCall = new Promise(function (resolve, reject) {
    // I will make call...
    reject("500 Error");
});

apiCall.then(function (data) {
    console.log("Data is success!!")
}).catch(function (error) {
    console.log(error)
});

// .catch() runs ONLY when the promise is rejected.
//  .then() is completely skipped.

