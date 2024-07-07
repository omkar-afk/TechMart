const StatusCodes = {
    BAD_REQUEST: 422,
    INTERNAL_ERROR: 500,
    OK: 200,
    UNAUTHORIZED_ERROR: 401,
    SESSION_EXPIRED: 440,
    ACCESS_RESTRICTED: 403,
    PARTIAL_UPLOAD_ERROR: 413,
    NOT_FOUND: 404
  }
  
  class APIError extends Error{}
  
  class InternalServerError extends APIError{
    constructor(message){
      super(message);
      this.code = "InternalServerError";
      this.StatusCode = StatusCodes.INTERNAL_ERROR;
    }
  }
  
  class BadRequestError extends APIError{
    constructor(message){
      super(message);
      this.code = "BadRequestError";
      this.StatusCode = StatusCodes.BAD_REQUEST;
    }
  }
  
  class UnAuthorizedError extends APIError{
    constructor(message){
      super(message);
      this.code = "UnAuthorizedError";
      this.StatusCode = StatusCodes.UNAUTHORIZED_ERROR;
    }
  }
  
  class SessionExpiredError extends APIError{
    constructor(message){
      super(message);
      this.code = "SessionExpiredError";
      this.StatusCode = StatusCodes.SESSION_EXPIRED;
    }
  }
  
  class AccessRestrictedError extends APIError{
    constructor(message){
      super(message);
      this.code = "AccessRestrictedError";
      this.StatusCode = StatusCodes.ACCESS_RESTRICTED;
    }
  }
  
  class UploadError{
    constructor(message){
      this.message = message;
      this.code = "UploadError";
      this.StatusCode = StatusCodes.PARTIAL_UPLOAD_ERROR;
    }
  }
  
  class NotFoundError extends APIError{
    constructor(message){
      super(message);
      this.code = "NotFoundError";
      this.StatusCode = StatusCodes.NOT_FOUND;
    }
  }
  
  class Success{
    constructor(body){
      this.code = "OK";
      this.StatusCode = StatusCodes.OK;
      this.body = body;
    }
  }
  
  class ApiErrorResponse{
    static send(error, res){
      res.status(error.StatusCode).json({
        code: error.code,
        status: error.StatusCode,
        message: error.message
      })  
    }
  }
  
  module.exports = {
    Success,
    StatusCodes,
    APIError,
    InternalServerError,
    ApiErrorResponse,
    BadRequestError,
    UnAuthorizedError,
    SessionExpiredError,
    AccessRestrictedError,
    UploadError,
    NotFoundError
  }
  