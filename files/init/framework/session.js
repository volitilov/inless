

const crednt = require('./../configs/credentials.json');

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
