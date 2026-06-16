export enum ErrorCode {
  NOT_FOUND = "NOT_FOUND",
  UNAUTHORIZED = "UNAUTHORIZED",
  FORBIDDEN = "FORBIDDEN",
  VALIDATION_ERROR = "VALIDATION_ERROR",
  INTERNAL_SERVER_ERROR = "INTERNAL_SERVER_ERROR",
  CONFLICT = "CONFLICT",
}

class AppException extends Error {
  constructor(
    message: string,
    public readonly code: ErrorCode,
    public readonly details?: unknown,
  ) {
    super(message);

    this.name = this.constructor.name;

    Object.setPrototypeOf(this, new.target.prototype);
  }
}

export class NotFoundException extends AppException {
  constructor(message = "Resource not found") {
    super(message, ErrorCode.NOT_FOUND);
  }
}

export class UnauthorizedException extends AppException {
  constructor(message = "Unauthorized") {
    super(message, ErrorCode.UNAUTHORIZED);
  }
}

export class ValidationException extends AppException {
  constructor(message: string, details?: unknown) {
    super(message, ErrorCode.VALIDATION_ERROR, details);
  }
}

export class ConflictException extends AppException {
  constructor(message = "Conflict") {
    super(message, ErrorCode.CONFLICT);
  }
}
