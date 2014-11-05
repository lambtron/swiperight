Swipe Right
==========

Swipe right on Tinder through this bot.


## Usage

1.  You need to get your `fbId` and `fbToken`.

`fbToken`: go [here](https://www.facebook.com/dialog/oauth?client_id=464891386855067&redirect_uri=https://www.facebook.com/connect/login_success.html&scope=basic_info,email,public_profile,user_about_me,user_activities,user_birthday,user_education_history,user_friends,user_interests,user_likes,user_location,user_photos,user_relationship_details&response_type=token), copy the link before it changes, and paste it into a text editor. The `fbToken` will be the long string after `#access_token` in the URL.

`fbId`: go [here](http://findmyfacebookid.com/) and paste the Facebook URL of your profile to retrieve your numeric ID. This will be your `fbId`.


2.  Now, clone this repo and deploy it to Heroku (or your hosting provider of choice, but for the remainder of this we'll use Heroku).

```
$ git clone git@github.com:lambtron/swiperight.git
$ cd swiperight
$ heroku create
$ git push heroku master
```


3.  Go into your Heroku and edit the environment variables `FB_ID` and `FB_TOKEN`:

![Heroku app environmental variables](http://i.imgur.com/yqwdvyH.png)


4.  Get matches!


## How does it work?

At various points throughout the day, `clock.js` schedules tasks for `bot.js`retrieves recommendations, of which all of them are liked. The cronjob in `clock.js` is set to initiate `varyStartTime()` (which will randomize when `bot.start()` is called) everyday at 9:13am, 11:13am, 4:13pm, 8:13pm, 10:13pm.

The `bot.start()` function will authorize as the Tinder app, retrieve recommendations, and like them as your Facebook profile.

## Make the bot more sophisticated

Using the [tinderjs](https://github.com/lambtron/tinderjs) library, you can send messages, pass, get updates, update position, etc.