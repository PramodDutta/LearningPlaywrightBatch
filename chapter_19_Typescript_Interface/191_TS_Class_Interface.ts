interface Executable {
    name: string;
    run(): void;
    getStatus(): string;
}

class TestCase implements Executable {
    name: string;
    constructor(name: string) {
        this.name = name;
    }
    run(): void {
        console.log("[RUN] " + this.name);
    }
    getStatus(): string {
        return "PASS";
    }
}

let tc: Executable = new TestCase("Verify login redirect");
tc.run();
console.log("Call:", tc.getStatus());