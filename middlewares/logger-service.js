const winston = require("winston");

// Create a logger instance
const logger = winston.createLogger({
	level: "info", // Default log level
	format: winston.format.combine(
		winston.format.timestamp(), // Add timestamp to logs
		winston.format.json() // Log in JSON format
	),
	transports: [
		new winston.transports.Console(), // Log to console
		new winston.transports.File({
			filename: "logs/error.log",
			level: "error", // Log only errors to this file
		}),
		new winston.transports.File({ filename: "logs/all.log" }), // Log all levels to this file
	],
});

// If you want to log in development mode to the console with color
if (process.env.NODE_ENV !== "production") {
	logger.add(
		new winston.transports.Console({
			format: winston.format.simple(),
		})
	);
}

// LogService class
class LogService {
	constructor(context) {
		this.context = context; // Context for better logging (e.g., service or controller name)
	}

	log(message) {
		logger.info(`[${this.context}] ${message}`);
	}

	error(message) {
		logger.error(`[${this.context}] ${message}`);
	}

	warn(message) {
		logger.warn(`[${this.context}] ${message}`);
	}

	debug(message) {
		logger.debug(`[${this.context}] ${message}`);
	}
}

module.exports = { LogService };
