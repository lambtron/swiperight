
/**
 * Module dependencies.
 */

var CronJob = require('cron').CronJob;
var Tinder = require('./lib/index');
var bot = new Tinder(process.env.FB_ID, process.env.FB_TOKEN);

/**
 * Initiate Cronjob.
 */

new CronJob({
  cronTime: "13 9,11,16,20,22 * * *", // everyday, 9:13, 11:13, 4:13, 8:13, 10:13
  onTick: varyStartTime(),
  start: true,
  timeZone: "America/Los_Angeles"
});

/**
 * Kick off a liking spree.
 */

function varyStartTime() {
  var variation = (Math.random() * 60);
  setTimeout(function() {
    bot.like(100);
  }, variation * 100);
}
