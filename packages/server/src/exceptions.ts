class Error {
  message: string;
  reason: string;
  name: string;
  stack: any;

  constructor(message: string, stack: any) {
    this.message = message;
    this.name = "Error";
    this.reason = "An error occurred";
    this.stack = stack;
  }
}

export class JWTVerificationError extends Error {
  constructor(message: string, stack: any) {
    super(message, stack);
    this.reason = "Could not verify JWT";
    this.name = "JWTVerificationError";
  }
}
