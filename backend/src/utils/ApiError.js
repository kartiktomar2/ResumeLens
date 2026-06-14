class ApiError extends Error {

    constructor(statusCode, message = "Something went wrong", error = [], stack) {
        super(message) // this will call the constructor of parent class. So super(message) both initializes the parent Error object and allows your custom class to behave like a normal JavaScript error while adding extra fields such as statusCode, success, and errors.
        this.statusCode = statusCode
        this.error = error
        this.message = message
        this.success = false
        this.name="ApiError"
        if (stack) {
            this.stack = stack

        }
        else {
            Error.captureStackTrace(this, this.constructor)
        }
    }
}

export { ApiError }