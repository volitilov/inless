'use strict';

require('es6-promise').polyfill();
require('isomorphic-fetch');


var React = require('react/addons');
var Router = require('react-router');

import router from 'reactRouter';

//var routes = require('reactRoutes');



var Layout = require('./layout.jsx');

var routes = router.rxReact(Layout);

Router.run(routes, Router.HistoryLocation, function(Root) {
	React.render(<Root />, window.document.querySelector('.application'));
});


