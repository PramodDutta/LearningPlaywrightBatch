class TestCase {
    constructor(name, status, priority) {
        this.name = name;
        this.status = status;
        this.priority = priority;
    }
    display() {
        console.log(this.name + " → " + this.status + " → " + this.priority);
    }
}

let loginTest_ref = new TestCase("Login Test", "PASS", "P0");
let signupTest_ref = new TestCase("Signup Test", "FAIL", "P1");

loginTest_ref.display();


// p0 - learn
// p1 - pratice
// p2 - test / implement
// p3 - IPL

// Function vs Method
// method is functions but inside the class :)