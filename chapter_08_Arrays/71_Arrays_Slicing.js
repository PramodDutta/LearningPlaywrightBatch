// Slicing & Combining


let arr = [1, 2, 3, 4, 5];

// slice(start, end) — returns new array, does NOT mutate actual -> ( start, end-1) . index = 0
//Don't give the end, it will automatically take from start to end. 
// console.log(arr.slice(1, 3));
// console.log(arr.slice(2, 4));

// console.log(arr.slice(2, 5));

// console.log(arr.slice(2));

// // console.log(arr.slice(-2)); //start from the -1 and till 2. 
// // console.log(arr.slice(-3));


// console.log(arr.slice(0));
// console.log(arr.slice(-5));


let arr1 = [1, 2, 3, 4, 5];

let a = [1, 2];
let b = [3, 4];
// let c = a.concat(b, [5, 6]);
let c = a.concat(b);
console.log(c);

// spread (modern way) - concatenation. (...)
let d = [...a, ...b];
console.log(d);

// ... , ===
// Join 
let s = ["pass", "fail", "skip"].join(" | ");
console.log(s);