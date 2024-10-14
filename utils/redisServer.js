const redis = require("redis");
const config = require("../config/stagconfig");

class RedisService {
	constructor() {
		this.client = redis.createClient({
			url:
				`redis://${config.redis.host}:${config.redis.port}` ||
				"redis://localhost:6379",
		});

		this.client.on("error", (err) => {
			console.error("Redis connection error:", err);
		});

		this.client.on("connect", () => {
			console.log("Connected to Redis server successfully.");
		});

		this.client.connect(); // Initiate Redis connection
	}

	// Set a key-value pair with optional expiration time (in seconds)
	async set(key, value, expiration = null) {
		try {
			if (expiration) {
				await this.client.setEx(key, expiration, JSON.stringify(value));
			} else {
				await this.client.set(key, JSON.stringify(value));
			}
		} catch (error) {
			console.error("Redis Set Error:", error);
		}
	}

	// Get a value by key
	async get(key) {
		try {
			const data = await this.client.get(key);
			return data ? JSON.parse(data) : null;
		} catch (error) {
			console.error("Redis Get Error:", error);
			return null;
		}
	}

	// Delete a key from Redis
	async del(key) {
		try {
			await this.client.del(key);
		} catch (error) {
			console.error("Redis Delete Error:", error);
		}
	}

	// Check if a key exists
	async exists(key) {
		try {
			const result = await this.client.exists(key);
			return result === 1; // Returns true if key exists, false otherwise
		} catch (error) {
			console.error("Redis Exists Error:", error);
			return false;
		}
	}
}

// Export an instance of RedisService so it can be reused across the app
const redisService = new RedisService();
module.exports = redisService;
