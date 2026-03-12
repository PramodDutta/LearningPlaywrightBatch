// Without functions — repeated logic

let score1 = 85;
let result1 = score1 >= 70 ? "pass" : "fail";
console.log(result1);

let score2 = 45;
let result2 = score2 >= 70 ? "pass" : "fail";
console.log(result2);

function getResult(scroe) {
    return score2 >= 70 ? "pass" : "fail";
}

getResult(85);  // "pass"
getResult(45);  // "fail"