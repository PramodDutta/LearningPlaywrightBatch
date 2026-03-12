let original = [1, 2, 3];

let copy1 = [...original]; // spread
// console.log(copy1);
let copy2 = original.slice();
// console.log(copy2);
let copy3 = Array.from(original);
// console.log(copy3);
let copy4 = original.concat();
// console.log(copy4);

copy1.push(99);
console.log(original);
console.log(copy1);

// Deep copy (JSON)
let c = original; // Deep copy
original.push(99);
console.log(original);
console.log(copy1);