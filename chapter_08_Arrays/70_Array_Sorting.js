//Sorting

let fruits = ["banana", "apple", "cherry"];
fruits.sort();
console.log(fruits);
//  alphabetical by default 

let nums = [10, 1, 21, 2];
nums.sort(); // [1, 10, 2, 21] ← WRONG (compares as strings!)
console.log(nums);
nums.sort((a, b) => a - b); // Ascending
console.log(nums);
nums.sort((a, b) => b - a);
console.log(nums); // [21, 10, 2, 1] ← descending

