'use strict';

var React = require('react/addons');
var Router = require('react-router');
var Yield = Router.RouteHandler;

var Layout = React.createClass({
	render: function() {
		return (
			<main>
				<Yield />
			</main>
		);
	}
});

module.exports = Layout;
