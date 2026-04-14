enum HTTPMethod {
    GET = "GET",
    POST = "POST",
    PUT = "PUT",
    DELETE = "DELETE"
}

function sendRequest(method: HTTPMethod, endpoint: string): void {
    console.log(method + " " + endpoint + " → 200 OK");
}

sendRequest(HTTPMethod.GET, "/api/users");
sendRequest(HTTPMethod.POST, "/api/users");
sendRequest(HTTPMethod.DELETE, "/api/users/1");