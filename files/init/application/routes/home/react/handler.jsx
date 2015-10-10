import React from 'react';
// import ReactDOM from 'react-dom';
import side from 'side';

// import comps from 'components';
// var Header = comps('header');

export default {
	render() {
		var name = 'Home';
		var Link = this.getLink();
		return side(
			()=> {
				return (
					<div>
						<Link to="/test">go to test</Link>
						Route {name}. Server.
					</div>
				);
			},
			()=> {
				return (
					<div>
						<Link to="/test">go to test</Link>
						Route {name}. Client.
					</div>
				);
			},
			true
		);
	}
};

