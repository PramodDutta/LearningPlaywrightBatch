function pramod_doing_work(worker, callback) {
    console.log("Started the class PW")
    let work = worker;

    // dasdasdasdsadasdsadas
    console.log("Finished the class PW")
    callback();
}

function callWife() {
    console.log("Call wife when done");
}

pramod_doing_work('PW class', callWife);