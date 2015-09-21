
import React from 'react/addons';

// import comp from 'components';
// var Header = comp.get('header');

export default {
	render() {
		return typeof window == 'undefined' ? <div>Server</div> : <div>Client</div>;
	}
};
