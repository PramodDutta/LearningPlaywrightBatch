class Car {
    // Attribute
    // Constructor
    constructor(assigned_name) {
        this.name = assigned_name;
    }
    drive() {
        console.log("Driving the car " + this.name);
    }
    printDetailsCar() {
        console.log("Details of  the car " + this.name);
    }

}

let hyndai_car = new Car("i10");
hyndai_car.drive();