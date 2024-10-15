const { HttpException } = require("../middlewares/httpException");
const { getDataSourceInstance } = require("../utils/db");
const Question = require("../models/questions");
const Region = require("../models/regions");
const redis = require("../utils/redisServer"); // Import the Redis module

exports.postExampleData = async (req, res, next) => {
	try {
		const { region } = req.query;

		// Check Redis cache for the question
		const cacheKey = `question:${region}`;
		const cachedQuestion = await redis.get(cacheKey);

		if (cachedQuestion) {
			// If found in cache, return the cached question
			return res.status(200).json(JSON.parse(cachedQuestion));
		}

		// Await for the database instance to be fully initialized
		const dataSource = await getDataSourceInstance(); // Await the initialization

		// Fetch repositories
		const questionRepository = dataSource.getRepository(Question);
		const regionRepository = dataSource.getRepository(Region);

		const regionFound = await regionRepository.findOne({
			where: {
				name: region,
			},
		});

		// Example query
		const question = await questionRepository.findOne({
			where: {
				region_id: regionFound.id,
			},
		});
		await redis.set(cacheKey, JSON.stringify(question), 3600);
		res.status(200).json(question);
	} catch (error) {
		console.log(error);
		next(error);
	}
};
