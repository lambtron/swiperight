
var CronJob = require('cron').CronJob;
var test = require('./bot.js').test;

new CronJob({
  cronTime: "15 * * * * *",//15 seconds after every minute
  onTick: test(),
  start: true,
  timeZone: "America/Los_Angeles"
});