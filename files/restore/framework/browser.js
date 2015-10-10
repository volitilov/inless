'use strict';

require('babel/polyfill');
require('isomorphic-fetch');

var createBrowserHistory = require('history/lib/createBrowserHistory');

var ___ = function() {
	require('./../application/**/*.jsx', { glob: true });
};


var React = require('react');
var ReactDOM = require('react-dom');
var Router = require('react-router');

var xRouter = require('router');



var configs = require('configs');
var appConf = configs('application');

var plugins = require('plugins');

var layout = require('./../application'+appConf.react.layout);

var routes = xRouter.rxReact(layout);

ReactDOM.render(React.createElement.apply(React, [Router.Router, {history: createBrowserHistory() }].concat(routes)), window.document.querySelector(appConf.style.rootSelector||'body'));

