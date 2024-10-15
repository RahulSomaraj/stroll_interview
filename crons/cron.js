const cron = require("node-cron");
const config = require("../config/stagconfig");
const Question = require("../models/questions");
const { getDataSourceInstance } = require("../utils/db");

// Schedule a task to run every minute

// We can do anything here set all values directly to redis
// On cron execution we can sernd all values update to devices using sockets
// Add notifications to update the user that new question arrived etc

const cronTime =
	config.cronDays > 1 ? `0 10 */${config.cronDays} * *` : `* * * * *`; // Set for every day if env is set then every set number of days
// set time is 10 for every day
console.log(cronTime);
let dataSource = null;
(async () => {
	dataSource = await getDataSourceInstance();
})();

cron.schedule(cronTime, async () => {
	try {
		if (!dataSource) {
			console.error("Database connection not available.");
			return;
		}

		const questionRepository = dataSource.getRepository(Question);

		// Increment `question_index` for all records
		const result = await questionRepository
			.createQueryBuilder()
			.update(Question)
			.set({ question_index: () => "question_index + 1" }) // Increment by 1
			.execute();

		console.log("Updated question_index for all records:", result);
	} catch (error) {
		console.error("Error in cron task:", error);
	}
});

module.exports = {
	startCronJobs: () => {
		console.log("Cron jobs started");
	},
};
