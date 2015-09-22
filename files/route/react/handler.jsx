
// import comp from 'components';
// var Header = comp.get('header');

export default {
	render() {
		var Yield = this.getYield();
		return <div>Route %name% <Yield/></div>;
	}
};
