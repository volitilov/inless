import React from 'react';
import side from 'side';

// import comps from 'components';
// var Header = comps('header');

export default {
	render() {
		var name = 'Home';
		return side(
			()=> {
				return <div>Route {name}. Server.</div>;
			},
			()=> {
				return <div>Route {name}. Client.</div>;
			},
			true
		);
	}
};

