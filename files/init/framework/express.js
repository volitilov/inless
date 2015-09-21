import path from 'path';
import express from 'express';
import eLogger from 'morgan';
import bodyParser from 'body-parser';
import multer from 'multer';
import compression from 'compression';

import process from 'process';
var mode = process.argv[2] || 'production';

import Logger from 'logger';

var logger = Logger.getLogger('express');


var cookieParser = require('cookie-parser')();

var session = require('./session.js');

var app = express();
app.disable('x-powered-by');
app.use(compression({
	level: 9
}));
app.use(eLogger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
	extended: true
}));
app.use(multer({
	dest: './../tmp/'
}));
app.use(express.static(path.join(__dirname, './../application/static')));
app.use(cookieParser);
app.use(session);
app.use((req, res, next) => {
	if (!req.session) {
		req.session = {};
	}
	if (!req.session.account) {
		req.session.account = {
			status: 8,
			id: null
		};
	}
	if (!req.session.status) {
		req.session.status = 8;
	}
	if (!req.session.id) {
		req.session.id = null;
	}
	next();
});
require('plugins/singleton.js').app = app;


app.use(require('./style.js'));

switch (mode) {
	case "production":
	case "development":
		app.use(require('./express.rpc.js'));
		app.use(require('./router.js'));
		break;
	case "markup":
		app.use(require('./markup.js'));
		break;
}

app.use((req, res, next) => {
	res.end(':)');
});

export default app;
