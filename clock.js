
var CronJob = require('cron').CronJob;
var bot = require('./bot.js');


// variables are all in seconds
var sessionLength = 60;
var startVariation = 3000;


new CronJob({
  cronTime: "13 9,11,16,20,22 * * *", // everyday, 9:13, 11:13, 4:13, 8:13,
  onTick: varyStartTime(),
  start: true,
  timeZone: "America/Los_Angeles"
});


function varyStartTime() {
  var variation = (Math.random() * startVariation);
  setTimeout(function() {
    bot.start(sessionLength, function(err, data) {
      if (err) console.log(err);
      console.log(data);
    });
  }, variation * 100);
}