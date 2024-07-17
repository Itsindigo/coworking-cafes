class ErrorBase extends Error {
  reason: string;

  constructor(message: string, stack: any) {
    super(message);
    this.message = message;
    this.name = "ErrorBase";
    this.reason = "An error occurred";

    if (stack) {
      this.stack = stack;
    } else {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}

export class JWTVerificationError extends ErrorBase {
  constructor(message: string, stack?: any) {
    super(message, stack);
    this.reason = "Could not verify JWT";
    this.name = "JWTVerificationError";
  }
}
