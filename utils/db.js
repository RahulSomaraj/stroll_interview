const { DataSource } = require("typeorm");
const config = require("../config/stagconfig");
const Question = require("../models/questions");
const Region = require("../models/regions");

let instance = null;

const createDataSource = () => {
	const dataSourceOptions = {
		type: "postgres",
		host: config.db.host,
		port: parseInt(config.db.port, 10),
		username: config.db.user,
		password: config.db.password,
		database: config.db.database,
		entities: [Question, Region], // Register all entities here
		synchronize: true, // Set to false in production, use migrations instead
	};

	return new DataSource(dataSourceOptions);
};

const getDataSourceInstance = async () => {
	if (!instance) {
		instance = createDataSource();
		await instance.initialize();
		console.log("Database connected and tables synchronized successfully.");
	}

	return instance;
};

module.exports = {
	getDataSourceInstance,
};
