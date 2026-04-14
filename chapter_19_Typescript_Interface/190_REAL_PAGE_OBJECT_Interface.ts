interface BasePage {
    url: string;
    title: string;
}

interface LoginPage extends BasePage {
    usernameSelector: string;
    passwordSelector: string;
    loginButtonSelector: string;
}
interface FreeTrailPage extends BasePage {
    usernameSelector: string;
    submitButtonSelector: string;
}


let loginPage: LoginPage = {
    url: "/login",
    title: "Login Page",
    usernameSelector: "#username",
    passwordSelector: "#password",
    loginButtonSelector: "#login-btn"
}

let freeTrialPage: FreeTrailPage = {
    url: "/free-trial",
    title: "Free Page",
    usernameSelector: "#username",
    submitButtonSelector: "#submit",
}

console.log("URL:", loginPage.url);
console.log("Title:", loginPage.title);
console.log("Username field:", loginPage.usernameSelector);

console.log(" ------- ");


console.log("URL:", freeTrialPage.url);
console.log("Title:", freeTrialPage.title);
console.log("Username field:", freeTrialPage.usernameSelector);