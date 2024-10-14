const cron = require("node-cron");
const config = require("../config/stagconfig");

// Schedule a task to run every minute

const cronTime =
	config.cron_days > 1 ? `0 10 */${config.cron_days} * *` : `* 10 * * *`; // Set for every day if env is set then every set number of days
// set time is 10 for every day

cron.schedule(cronTime, () => {
	console.log("Running a task every Day");
	// You can call your function here or perform any task
});

module.exports = {
	startCronJobs: () => {
		console.log("Cron jobs started");
	},
};
