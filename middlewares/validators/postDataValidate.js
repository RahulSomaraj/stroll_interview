const { body, param, query, validationResult } = require("express-validator");
const { HttpException } = require("../httpException");

// Validation for getting a resource by ID
const getReqValidation = [
	query("region").optional().isString().withMessage("region must be a string"),
];

// Middleware to handle validation results
const validate = (req, res, next) => {
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		throw new HttpException(400, errors.array());
	}
	next();
};

module.exports = {
	getReqValidation,
	validate,
};
