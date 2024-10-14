const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
const cors = require("cors");
const helmet = require("helmet"); // Import helmet
const redis = require("redis"); // Import redis

const apiRoutes = require("./routes/api");
const redisService = require("./utils/redisServer"); // Import Redis service
const { startCronJobs } = require("./crons/cron"); // Import Redis service
const config = require("./config/stagconfig");
const { HttpExceptionFilter } = require("./middlewares/errorMiddleware");
const { HttpException } = require("./middlewares/httpException");
const swaggerUi = require("swagger-ui-express");
const YAML = require("yamljs");
const path = require("path");

// Load environment variables
dotenv.config();

// Initialize Express
const app = express();

// Middleware
app.use(morgan("dev")); // Logger
app.use(cors()); // Enable CORS
app.use(express.json()); // Parse incoming JSON (body-parser is no longer required)
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded data
app.use(helmet()); // Add helmet to secure HTTP headers

// Load Swagger YAML file
const swaggerDocument = YAML.load(path.join(__dirname, "swagger.yaml"));

// Serve Swagger documentation
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

const globalHandler = new HttpExceptionFilter("API Context");

// Routes
app.use("/api", apiRoutes);

// 404 Handler
app.use((req, res, next) => {
	const error = new HttpException(404, "Route not found"); // Create a new instance of HttpException
	next(error); // Pass the error to the next middleware
});

// Error Handling Middleware
app.use((err, req, res, next) => globalHandler.catch(err, req, res, next));

startCronJobs();

// Start the server
app.listen(config.port, () => {
	console.log(`Server running on port ${config.port}`);
});
