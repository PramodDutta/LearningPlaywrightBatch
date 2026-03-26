// Objects
// Key and value

let student1 = { name: "Amit", age: 65 };
let student2 = { name: "Pramod" };
let student3 = { name: "Pramod", age: 87, phone: 987654320 };

// Key will not be in the doubt quotes
// below key in doubt is actually JSON
let JSON_student4 = { "name": "Pramod", "age": 87, "phone": 987654320 };

// -------


let a = { status: "pass" };
console.log(a.status);
console.log(a["status"]);

let a1 = { status: 'pass' };
console.log(a1.status);

// keys are case sensitive.
let a22 = { status: "pass", Status: "fail" };
console.log(a22["status"]);
console.log(a22["Status"]);


let b = a;  // b copies the REFERENCE, not the object
b.status = "fail";
console.log(a.status);


// Two separate objects — different memory
let c = { status: "pass" };
let d = { status: "pass" };
console.log(c === d);


const t_json = {
    "name": "pramod",
    "age": 10
};
console.log(t_json);


const t_js = {
    name: "pramod",
    age: 10
};
console.log(t_js);