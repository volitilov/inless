import fs from 'fs';
import path from 'path';
import ejs from 'cejs';
import express from 'express';
import Logger from 'logger';


var configs = require('configs');
var routes = configs('routes');

var appConfig = configs('application');

var logger = Logger.getLogger('markup');

var router = express.Router();

var template = fs.readFileSync(path.resolve(`./application${appConfig.markup.template}`)).toString();

var render = function(route, data, cb) {
	var layout = fs.readFileSync(path.resolve(`./application/${appConfig.markup.layout}`)).toString();
	var source = fs.readFileSync(path.resolve(`./application/routes/${route.name}/markup/${appConfig.markup.componentIndex}`)).toString();
	source = layout.replace(/\<\s*\$Yield\s*\/\>/i, source);
	var options = {
		filename: path.resolve(`./application/routes/${route.name}/markup/${appConfig.markup.componentIndex}`),
		compFilename: path.resolve(`./application`)
	};
	var render = ejs.render(source, data, options);
	return template.replace('%yield%', render)
	.replace('#title#', route.title)
	.replace('%style%', `<link rel="stylesheet" href="${appConfig.style.bundleUrl}" charset="utf-8" />`)
	.replace('%rootSelector%', appConfig.style.rootSelector ? appConfig.style.rootSelector.replace(/\.|\#/ig, '') : 'application')
	.replace('%script%', `<script type="text/javascript" charset="utf-8"></script>`);
}


routes.pages.forEach((route, i)=> {
	router.get(route.path, function(req, res) {
		try {
			res.end(render(route, req.query));
		} catch(e) {
			logger.error(e);
			res.end('500 Internal server error');
		}
	});
});

module.exports = router;
