class ApiResponse {
    constructor(statusCode, message = "Success", data) {
        this.status = statusCode < 400;
        this.message = message;
        this.data = data;
        this.success = true;
    }
}

export default ApiResponse;