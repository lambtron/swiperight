
/**
 * Module dependencies.
 */

var Tinderjs = require('tinderjs').TinderClient;
var tinderjs = new Tinderjs();

/**
 * Expose `Tinder`.
 */

module.exports = Tinder;

/**
 * Tinder.
 */

function Tinder(id, token) {
  if (!(this instanceof Tinder)) return new Tinder(id, token);
  this.id = id;
  this.token = token;
}

/**
 * Like recommendations.
 *
 * @param {Number} num
 */

Tinder.prototype.like = function(num) {
  tinderjs.authorize(this.token, this.id, function(err, data) {
    if (err) throw err;
    for (var i = 0; i < num; i += 10) {
      setTimeout(getRecommendations, Math.random());
    }
  });
};

/**
 * Get recommendations.
 */

function getRecommendations() {
  tinderjs.getRecommendations(10, function(err, recs) {
    if (err) throw err;
    if (recs && recs.results) handle(recs.results);
  });
}

/**
 * Private helper function to iterate over recommendations
 * at controlled intervals.
 *
 * @param {Array} results
 */

function handle(results) {
  for (var i = 0; i < results.length; i++) {
    setTimeout(like, Math.random(), [results[i]]);
  }
}

/**
 * Private helper function to like recommendation.
 *
 * @param {Object} result
 */

function like(result) {
  var id = result[0]._id;
  console.log('Swiping right on ' + result[0].name);
  console.log(JSON.stringify(result[0], null, 2));
  console.log('');
  console.log('');
  console.log('');
  tinderjs.like(id, function(err, data) {
    if (err) throw err;
    console.log(data);
  });
}
