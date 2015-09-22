
var configs = require('configs');
var crednt = configs('credentials');

var session = require("express-session")({
	name: crednt.session.name,
	secret: crednt.session.secret,
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
