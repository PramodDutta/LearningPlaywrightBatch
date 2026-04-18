class BaseTest {
    setup(): void {
        console.log("[BASE] Open browser");
    }
    teardown(): void {
        console.log("[BASE] Close browser");
    }
}

class LoginTest extends BaseTest {

    override setup(): void {
        console.log("[LoginTest] Open browser");
        console.log("[LoginTest] Maximize");
    }
}

class APITest extends BaseTest {

    override setup(): void {
        console.log("[APITest] No Browser!");
    }
}

let test = new LoginTest();
let apitest = new APITest();
test.setup();
apitest.setup();