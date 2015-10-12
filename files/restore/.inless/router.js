
import path from 'path';

var configs = require('configs');
var routes = configs('routes');
var config = configs('application');

let router = require('router');

let template = require('fs').readFileSync(path.join(__dirname, './../application',config.react.template)).toString();
let Layout = require(path.join(__dirname, './../application', config.react.layout));

module.exports = router.exec(template, Layout, config);
