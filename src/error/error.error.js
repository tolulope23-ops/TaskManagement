const { StatusCodes } = require('http-status-codes');

class BaseError extends Error {
  constructor({ message, statusCode, from, cause }) {
    super(message);
    this.name = this.constructor.name;
    this.statusCode = statusCode || StatusCodes.INTERNAL_SERVER_ERROR;
    this.from = from || 'Server';
    this.cause = cause;

    Error.captureStackTrace(this, this.constructor);
  }

  toJSON() {
    return {
      message: this.message,
      statusCode: this.statusCode,
      from: this.from,
      cause: this.cause,
    };
  }
}

class BadRequestError extends BaseError {
  constructor(props) {
    super({ ...props, statusCode: StatusCodes.BAD_REQUEST });
  }
}

class NotFoundError extends BaseError {
  constructor(props) {
    super({ ...props, statusCode: StatusCodes.NOT_FOUND });
  }
}

class UnauthorizedError extends BaseError {
  constructor(props) {
    super({ ...props, statusCode: StatusCodes.UNAUTHORIZED });
  }
}

class ForbiddenError extends BaseError {
  constructor(props) {
    super({ ...props, statusCode: StatusCodes.FORBIDDEN });
  }
}

class ConflictError extends BaseError {
  constructor(props) {
    super({ ...props, statusCode: StatusCodes.CONFLICT });
  }
}

class RequestTimeoutError extends BaseError {
  constructor(props) {
    super({ ...props, statusCode: StatusCodes.REQUEST_TIMEOUT });
  }
}

class MethodNotAllowedError extends BaseError {
  constructor(props) {
    super({ ...props, statusCode: StatusCodes.METHOD_NOT_ALLOWED });
  }
}


module.exports = {
  BaseError,
  BadRequestError,
  NotFoundError,
  UnauthorizedError,
  ForbiddenError,
  ConflictError,
  RequestTimeoutError,
  MethodNotAllowedError,
};
