class Browser {
    constructor(name) {
        this.name = name;
        this.isOpen = true;
        console.log(name + " launched");
    }

    startBrowser() {
        console.log("starting the browser")
    }
    closeBrowser() {
        console.log("starting the browser")
    }

}

let chrome = new Browser("Chrome");
let firefox = new Browser("Firefox");

console.log(chrome.isOpen);