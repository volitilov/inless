import path from 'path';
import configs from 'configs';
import express from 'express';
import Logger from 'logger';
import Session from 'plugins/session.js';

var logger = Logger.getLogger('express.api');

var appConfigs = configs('app');
var apiConfigs = configs('api');

var xRouter = express.Router();
var router = express.Router();

for(var name in apiConfigs) {
	var api = apiConfigs[name];
	var method = 'get';
	switch(api.method.toLowerCase()) {
		case "post":
			method = 'post';
		break;
		case "put":
			method = 'put';
		case "delete":
			method = 'delete';
		break;
		case "get":
		default:
			method = 'get';
	}
	var action = require(path.resolve(`./application/api/${name}/index.js`))||function(){};
	router[method](api.path, (req, res, next)=> {
		logger.info(`${req.path}`, req.body||req.query||{});
		action(req, res, next);
	});
}

xRouter.use(appConfigs.react.APIPath||'/api', router);

module.exports = xRouter;
