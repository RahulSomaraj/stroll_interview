const dotenv = require("dotenv");

// Load environment variables from .env file
dotenv.config();

const config = {
	environment: process.env.NODE_ENV || "development", // Default to development
	port: process.env.PORT || 5000, // Default server port
	cron_days: process.env.UPDATE_DAYS || 1, // Default days is one day change in
	db: {
		host: process.env.POSTGRES_HOST || "localhost",
		port: process.env.POSTGRES_PORT || 5432,
		database: process.env.POSTGRES_DATABASE || "stroll",
		user: process.env.POSTGRES_USER || "postgres",
		password: process.env.POSTGRES_PASSWORD || "stroll",
	},
	redis: {
		host: process.env.REDIS_HOST || "localhost",
		port: process.env.REDIS_PORT || 6379,
	},
};

module.exports = config;
