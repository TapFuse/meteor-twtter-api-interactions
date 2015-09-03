function twitterCredentials (meteorUser) {
  var config = Accounts.loginServiceConfiguration.findOne({service: 'twitter'});
  return new TwitterApi({
    consumer_key: config.consumerKey,
    consumer_secret: config.secret,
    access_token_key: meteorUser.services.twitter.accessToken,
    access_token_secret: meteorUser.services.twitter.accessTokenSecret
  });
}

Meteor.methods({
  //Either userName or userId is required
  followUser: function (userName, userId, followNotification) {
    var params = {
      screen_name: userName,
      user_id: userId,
      follow: followNotification
    };
    var client = twitterCredentials(Meteor.user());
    return client.post('friendships/create', params, function(error, tweets, response) {
      if(!error){
      }
    });
  },
  //Either userName or userId is required
  unfollowUser: function (userName, userId) {
    var params = {
      screen_name: userName,
      user_id: userId
    };
    var client = twitterCredentials(Meteor.user());
    return client.post('friendships/destroy', params, function(error, tweets, response) {
      if(!error){
        console.log("Success!");
      }
    });
  },
  //tweetId is required
  favoriteTweet: function (tweetId, includeEntities) {
    var params = {
      id: tweetId,
      include_entities: includeEntities
    };
    var client = twitterCredentials(Meteor.user());
    return client.post('favorites/create', params, function(error, tweets, response) {
      if(!error){
        console.log("Success!");
      }
    });
  },
  //tweetId is required
  unfavoriteTweet: function (tweetId, includeEntities) {
    var params = {
      id: tweetId,
      include_entities: includeEntities
    };
    var client = twitterCredentials(Meteor.user());
    return client.post('favorites/destroy', params, function(error, tweets, response) {
      if(!error){
        console.log("Success!");
      }
    });
  },
  //tweetId is required
  retweet: function (tweetId, trimUser) {
    var params = {
      trim_user: trimUser
    };
    var client = twitterCredentials(Meteor.user());
    return client.post('statuses/retweet/' + tweetId, params, function(error, tweets, response) {
      if(!error){
        console.log("Success!");
      }
    });
  },
  //text abd replyingToTweetId is required.
  replyToTweet: function (text, replyingToTweetId) {
    var params = {
      status: text,
      in_reply_to_status_id: replyingToTweetId
    };
    var client = twitterCredentials(Meteor.user());
    return client.post('statuses/update', params, function(error, tweets, response) {
      if(!error){
        console.log("Success!");
      }
    });
  },
  //text is required
  postTweet: function (text) {
    var params = {
      status: text
    };
    var client = twitterCredentials(Meteor.user());
    return client.post('statuses/update', params, function(error, tweets, response) {
      if(!error){
        console.log("Success!");
      }
    });
  }
});
