const express = require("express");

const {
	getReqValidation,
	validate,
} = require("../middlewares/validators/postDataValidate");
const { postExampleData } = require("../services/apiServices");

const router = express.Router();

// Example routes
router.get("/question", getReqValidation, validate, postExampleData);

module.exports = router;
