const {APIError, InternalServerError, ApiErrorResponse} = require("../utils/apiResponse");

const errorHandler = (error, request, response, next) => {
  if(error instanceof APIError){
    ApiErrorResponse.send(error, response)
  } else {
    const error = new InternalServerError("Internal Server Error");
    ApiErrorResponse.send(error, response)
  }
}

module.exports = errorHandler;