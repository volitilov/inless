'use strict';

require('babel/polyfill');
require('isomorphic-fetch');

// import createBrowserHistory from 'history/lib/createBrowserHistory'
// let history = createBrowserHistory();

var ___ = function() {
	require('./**/*.jsx', { glob: true });
};

var React = require('react/addons');
var Router = require('react-router');

var xRouter = require('reactRouter');

var appConf = require('./../../configs/application.json');

var layout = require('./layout.jsx');

var routes = xRouter.rxReact(layout);

Router.run(routes, Router.HistoryLocation, function(Root) {
	React.render(React.createElement(Root, null), window.document.querySelector(appConf.style.rootSelector));
});


// React.render(<Router history={history}>{routes}</Router>, window.document.querySelector(appConf.style.rootSelector));
