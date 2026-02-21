let amul = null;
let val = amul ?? "nandani milk";
let val2 = null ?? "default";   // "default" (?? returns right side if left is null/undefined)

// Modern JS - Typescript.

val = "which milk? -> " + val;
console.log(val)
// very useful in test data handling.