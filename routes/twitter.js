/*
 * tweeter stuffs
 */

var OAuth2= require('oauth').OAuth2;
var $ = require('jquery');

var oauth2 = new OAuth2(
  'fVPjxzmmWfPgzIWeN5S2w',
  'OmjGlv9ItlHGcuD1yVyH8NG5kgaGgriWZvigG1yK80', 
  'https://api.twitter.com/', 
  null,
  'oauth2/token', 
  null
);

exports.oauth = function(req, res) {
  oauth2.getOAuthAccessToken(
    '',
    {'grant_type':'client_credentials'},
    function (e, access_token, refresh_token, results){
      // console.log('bearer: ',access_token);
      // done();
      req.session.access_token = access_token;
      res.redirect("/cnnbrk-tweets");
    }
  );
};

exports.tweets = function(req, res) {
  if (req.session.access_token) {
    // res.send(req.session.oauth);
    $.ajax({
      url: 'https://api.twitter.com/1.1/statuses/user_timeline.json', 
      data: { 
        screen_name: 'cnnbrk',
        count: 10
      },
      headers: {
        Authorization: 'Bearer ' + req.session.access_token
      },
      success: function(data, textStatus, jqXHR) {
        res.render('tweets', { title: 'cnnbrk', tweets: data });
      },
      error: function(data) {
        res.send(data);
      }
    });
  } else {
    res.redirect('/auth/twitter');
  }
}

