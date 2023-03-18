import UnauthenticatedError from './unauthenticated.js';

import { StatusCodes } from 'http-status-codes';
import BadRequestError from './bad-request.js';
import CustomAPIError from './custom-error.js';
class BadRequest extends CustomAPIError {
    constructor(message) {
        super(message)
        this.statusCode = StatusCodes.BAD_REQUEST
    }


}


export default {
    CustomAPIError,
    UnauthenticatedError,
    BadRequestError,
    BadRequest
}