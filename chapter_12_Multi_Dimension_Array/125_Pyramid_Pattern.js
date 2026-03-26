//   *
//  ***
// ***** 

let n = 3;
for (let i = 1; i <= n; i++) {

    let row = "";
    for (let j = 1; j <= n - i; j++) {
        row += " ";
    }
    for (let j = 1; j <= 2 * i - 1; j++) {
        row += "*";
    }
    console.log(row);

}