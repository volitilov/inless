import fs from 'fs';
import path from 'path';
import ejs from 'cejs';
import express from 'express';
import Logger from 'logger';

var routes = require('./../configs/routes.json');
var app = require('./../configs/application.json');

var logger = Logger.getLogger('markup');

var router = express.Router();

var template = fs.readFileSync(path.resolve(`./application${app.markup.template}`)).toString();

var render = function(route, data, cb) {
	var source = fs.readFileSync(path.resolve(`./application/routes/${route.name}/markup/index.ejs`)).toString();
	var options = {
		filename: path.resolve(`./application/routes/${route.name}/markup/index.ejs`),
		compFilename: path.resolve(`./application`)
	};
	var render = ejs.render(source, data, options);
	return template.replace('%yield%', render)
	.replace('#title#', route.title)
	.replace('%style%', `<link rel="stylesheet" href="${app.style.bundle}" charset="utf-8" />`)
	.replace('%script%', `<script type="text/javascript"></script>`);
}


routes.pages.forEach((route, i)=> {
	router.get(route.path, function(req, res) {
		res.end(render(route, req.query));
	});
});

module.exports = router;
