const user = {
    name: "Pramod",
    age: 43
}

const calculator = {
    value: 0,
    // name : "Pramod",
    add(n) {
        this.value += n;
        // this.name += "Dutta"
        return this;
    },
    substract(n) {
        this.value -= n;
        return this;
    }

}

console.log(calculator.add(5).substract(6));
// { value: 0, add: [Function: add], substract: [Function: substract] }
