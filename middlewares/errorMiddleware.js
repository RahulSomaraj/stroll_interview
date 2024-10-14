const { HttpException } = require("./httpException"); // Custom exception class similar to Nest's HttpException
const { LogService } = require("./logger-service");
const ERROR_MESSAGES = require("../constants/constants").ERROR_MESSAGES;

class HttpExceptionFilter {
	constructor(context) {
		this.context = context;
		this.logger = new LogService();
	}

	catch(err, req, res, next) {
		const status = err instanceof HttpException ? err.getStatus() : 500; // Check if the error is an instance of a custom HttpException
		const responseMessage =
			err instanceof HttpException
				? err.getResponse()
				: { error: ERROR_MESSAGES.INTERNAL_SERVER_ERROR };

		this.logger.log(`Error occurred in ${this.context}`);
		this.logger.error(`[${status}] ${err.message}`, {
			stack: err.stack,
			path: req.url,
			method: req.method,
			timestamp: new Date().toISOString(),
			status: status,
			additionalValidations: [],
			additionalValidationErrors: [],
		});

		const errorResponse = {
			statusCode: responseMessage?.error?.status || status,
			message:
				responseMessage?.error?.message || responseMessage.error || err.message,
			timestamp: new Date().toISOString(),
			path: req.url,
			additionalValidations: [],
			additionalValidationErrors: [],
		};

		// Handle validation errors or other specific cases
		if (err.response && err.response.message) {
			errorResponse.message = Array.isArray(err.response.message)
				? err.response.message
				: [err.response.message];
			errorResponse.statusCode = err.response.message.length
				? status
				: errorResponse.statusCode;
			errorResponse.additionalValidations = err.message || err.response.message;
			errorResponse.additionalValidationErrors = err.response.errors || [];
		}

		// Handle database-related errors (for example, SQL Query failures)
		if (err.code === "EREQUEST" && err.name === "QueryFailedError") {
			errorResponse.message = ["Internal Server Error"];
			errorResponse.statusCode = 500;
			errorResponse.additionalValidations = err.message;
		}

		// Send the error response
		res.status(status).json(errorResponse);
	}
}

module.exports = { HttpExceptionFilter };
