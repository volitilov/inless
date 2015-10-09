
import React from 'react';
import side from 'side';
export default {
	render() {
		var name = '%name%';
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

