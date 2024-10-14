// Define common error messages for the application
const ERROR_MESSAGES = {
	INTERNAL_SERVER_ERROR:
		"An unexpected error occurred. Please try again later.",
	INVALID_INPUT: "The provided input is invalid.",
	NOT_FOUND: "The requested resource could not be found.",
	UNAUTHORIZED: "You are not authorized to perform this action.",
	FORBIDDEN: "You do not have permission to access this resource.",
	DUPLICATE_ENTRY: "A record with this data already exists.",
	DATABASE_ERROR: "An error occurred while interacting with the database.",
	VALIDATION_FAILED: "Validation failed. Please check your input.",
	USER_NOT_FOUND: "User not found.",
	TOKEN_EXPIRED: "Authentication token has expired. Please log in again.",
	BAD_REQUEST:
		"The request could not be understood or was missing required parameters.",
};

module.exports = { ERROR_MESSAGES };
