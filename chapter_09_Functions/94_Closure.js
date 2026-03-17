function outer() {
    let message = "Hello";
    console.log("Outer called!");

    function inner() {
        console.log(message);
    }
    return inner;

}


let fn_inner = outer();
fn_inner();


//  inner() not allowed!