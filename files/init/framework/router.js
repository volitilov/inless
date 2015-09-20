
import path from 'path';

const routes = require('./../configs/routes.json');
const config = require('./../configs/application.json');

let router = require('./node_modules/router');

let template = require('fs').readFileSync(path.join(__dirname, './../application',config.react.template)).toString();
let Layout = require(path.join(__dirname, './../application', config.react.layout));

module.exports = function(app) {
	return app = router.exec(app, template, Layout, config);
};
