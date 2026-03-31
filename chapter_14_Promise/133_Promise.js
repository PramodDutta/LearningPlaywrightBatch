let order = new Promise(function (resolve, reject) {
    let foodready = true;
    if (foodready) {
        resolve("Pizza is delivered!");
    } else {
        reject("Order Cancelled!")
    }
})

console.log(order);
// A Promise is an OBJECT. It wraps a value that will be available later.

