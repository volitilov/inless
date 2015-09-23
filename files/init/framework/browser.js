'use strict';

require('babel/polyfill');
require('isomorphic-fetch');

// import createBrowserHistory from 'history/lib/createBrowserHistory'
// let history = createBrowserHistory();

var ___ = function() {
	require('./../application/**/*.jsx', { glob: true });
};


var React = require('react/addons');
var Router = require('react-router');

var xRouter = require('reactRouter');



var configs = require('configs');
var appConf = configs('application');

var plugins = require('plugins');

var layout = require('./../application'+appConf.react.layout);

var routes = xRouter.rxReact(layout);

Router.run(routes, Router.HistoryLocation, function(Root) {
	React.render(React.createElement(Root, null), window.document.querySelector(appConf.style.rootSelector));
});


// React.render(<Router history={history}>{routes}</Router>, window.document.querySelector(appConf.style.rootSelector));
