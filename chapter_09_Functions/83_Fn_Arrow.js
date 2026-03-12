// Arrow Function (ES6)

const greet = function (name1) {
    return `Hello, ${name1}!`;
}

// If you want to make a normal function to arrow function. 
// Remove the keyword function, remove the keyword return, remove the curly braces, and use the =>
// 

const greet1 = (name2) => `Hello, ${name2}!`;

console.log(greet("Pramod"));
console.log(greet1("Pramod"));

// arrow functions only generally works whenever you have a single line. 
const doubleIt = n => n * 2;
console.log(doubleIt(10));

// No params — parens required
const getEnv = () => "staging";
console.log(getEnv());


// Suppose we have a multi-line. Can we use arrow function everywhere? 
// Multi-line — needs curly braces + return
const getResult = (score) => {
    if (score >= 70) return "pass";
    return "fail";
};