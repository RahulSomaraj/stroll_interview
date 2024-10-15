const { body, param, query, validationResult } = require("express-validator");
const { HttpException } = require("../httpException");

// Validation for getting a resource by ID
const getReqValidation = [
	query("region")
		.optional()
		.isString()
		.withMessage("Region must be a string")
		.matches(/^[A-Za-z\s]+$/)
		.withMessage("Region can only contain letters and spaces"),
];

// Middleware to handle validation results
const validate = (req, res, next) => {
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		throw new HttpException(400, errors.array()[0].msg);
	}
	next();
};

module.exports = {
	getReqValidation,
	validate,
};
