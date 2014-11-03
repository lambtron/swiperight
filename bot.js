// top level libraries
var authToken = '89142d91-269d-44aa-8b52-7e259a3a713a';
var Tinder = require('./lib/tinderjs/tinder.js').TinderClient;
var tinder = new Tinder();


// getrecs every X seconds with Y seconds variation
// like sequentially every Z seconds with A seconds variation
var GETRECSINTERVAL_MEAN = 30;
var GETRECSINTERVAL_STD = 5;
var LIKEINTERVAL = 4;
var LIKEINTERVAL_STD = 0.7;


// configuration.
tinder.setAuthToken(authToken);


/**
 * starts the liking bonanza
 *
 * @param {integer} sessionLength, in seconds
 * @param {Function} cb
 */
function startSession(sessionLength, cb) {
  var likeRecs = function likeRecs(err, recs) {
    if (err)
      cb(err, null);

    if (recs && recs.results) {
      (function like(i) {
        var newInterval = ((Math.random() * LIKEINTERVAL_STD * 2 - (LIKEINTERVAL_STD / 2)) + LIKEINTERVAL) * 100;
        setTimeout(function() {
          var id = recs.results[i - 1]._id;
          console.log('swiping right on ' + recs.results[i - 1].name);
          tinder.like(id, function(err, data) {
            console.log(data);
          });
          if (--i) like(i);      //  decrement i and call myLoop again if i > 0
        }, newInterval);
      })(recs.results.length);
    } else {
      cb(err, null);
    }
  };

  tinder.getRecommendations(10, likeRecs);

  // session variables.
  var startTime = Date.now();
  var timer = setInterval(function() {
    var now = Date.now();
    if (now > startTime + (sessionLength * 100))
      clearInterval(timer);
    tinder.getRecommendations(10, likeRecs);
  }, GETRECSINTERVAL_MEAN * 100);
};


// Expose public methods
module.exports = {
  start: startSession
};