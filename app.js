
/**
 * Module dependencies.
 */

var express = require('express')
  , routes  = require('./routes')
  , twitter = require('./routes/twitter')
  , http    = require('http')
  , path    = require('path');

var app = express();

// all environments
app.set('port', process.env.PORT || 30000);
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(express.cookieParser('your secret here'));
app.use(express.session());
app.use(app.router);
app.use(require('stylus').middleware(__dirname + '/public'));
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', routes.index);
app.get('/auth/twitter/', twitter.oauth);
app.get('/auth/twitter/:redirect', twitter.oauth);
app.get('/:handle-tweets', twitter.tweets);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
