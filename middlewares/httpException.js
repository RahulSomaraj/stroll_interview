class HttpException extends Error {
	constructor(status, message, response = null) {
		super(message);
		this.status = status; // HTTP status code
		this.response = response; // Optional custom response (can contain additional details)
		this.name = this.constructor.name;
		Error.captureStackTrace(this, this.constructor);
	}

	// Getters to mimic the behavior of NestJS's HttpException
	getStatus() {
		return this.status;
	}

	getResponse() {
		return this.response || { error: this.message };
	}
}

module.exports = { HttpException };
