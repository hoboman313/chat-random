// Library imports
var express      = require('express'),
    logger       = require('morgan'),
    compression  = require('compression'),
    path         = require('path');

var app = express();

// Compress responses
app.use(compression());

app.use(logger('dev'));

var webContentPath = path.join(__dirname, '..', 'web', 'dist');

app.use(express.static(webContentPath));
app.get('/', function(req, res){
    res.sendFile(path.join(webContentPath, 'index.html'));
});

module.exports = app;
