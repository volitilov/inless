
var configs = require('configs');
var server = configs('server');

var session = require("express-session")({
	name: server.session.name,
	secret: server.session.secret,
	saveUninitialized: true,
	resave: true,
	cookie: {
		path: '/',
		httpOnly: true,
		secure: false,
		maxAge: null
	}
});

export default session;
