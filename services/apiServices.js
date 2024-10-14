// POST Example
exports.postExampleData = (req, res, next) => {
	try {
		const { data } = req.body;
		throw new HttpException(400, "Some Bullshit error");
	} catch (error) {
		console.log(error);
		next(error);
	}
};
