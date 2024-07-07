
const { UnAuthorizedError, AccessRestrictedError } = require("../utils/apiResponse");
const { decodeToken } = require("../utils/jwt");

const jwtGuard = (request, response, next) => {
    const headers = request.headers;
    if (headers.hasOwnProperty('authorization') && headers.authorization != "" && headers.authorization.split(" ").length == 2) {
        const token = headers.authorization.split(" ")[1];
        const decode = decodeToken(token)
        request.logginUser = decode.data;
        next();
    } else {
        throw new UnAuthorizedError("Authorization not found");
    }
}

module.exports = {jwtGuard};