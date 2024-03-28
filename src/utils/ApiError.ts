class ApiError extends Error {
    isOperational: boolean;
    statusCode: string | Number;
    constructor(statusCode, message:string, isOperational = true, stack = "") {
      super(message);
      this.statusCode = statusCode;
      this.isOperational = isOperational;
      if (stack) {
        this.stack = stack;
      } else {
        Error.captureStackTrace(this, this.constructor);
      }
    }
  }
  
  export default ApiError;
  