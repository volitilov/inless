import React from 'react';
import side from 'side';
import Link from 'link';
// import components from 'components';
// var Header = components('header');

export default {
	render() {
		var name = 'Home';
		return side(
			()=> {
				return (
					<div>
						Route {name}. Server.
						<br/>
						<Link to="/">go home</Link>
					</div>
				);
			},
			()=> {
				return (
					<div>
						Route {name}. Client.
						<br/>
						<Link to="/">go home</Link>
					</div>
				);
			},
			true
		);
	}
};
