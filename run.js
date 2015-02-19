
/**
 * Module dependencies.
 */

var Tinder = require('./lib/index');
var bot = new Tinder(process.env.FB_ID, process.env.FB_TOKEN);

/**
 * Like 100.
 */

bot.like(100);
