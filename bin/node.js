#!/usr/bin/env node

var inLess = require('./../classes/class.inless.js');

var inless = new inLess();

var args = process.argv;

var command = args[2];

// console.log(args);

switch (command) {
	case "restore":
		inless.restore();
		break;
	case "init":
		inless.init();
		break;
	case "clear":
		inless.clear();
		break;
	case "start":
		inless.start(args[3]);
		break;
	case "new":
	case "create":
		switch (args[3]) {
			case "com":
			case "comp":
			case "component":
				inless.createComponent(args[4]);
				break;
			case "page":
			case "route":
				inless.createRoute(args[4], args[5], args[6], args[7]);
				break;
			case "mod":
			case "modificator":
				inless.createModificator(args[4]);
				break;
			case "plg":
			case "plugin":
				inless.createPlugin(args[4]);
				break;
			default:
		}
		break;
	case "remove":
		switch (args[3]) {
			case "com":
			case "comp":
			case "component":
				inless.removeComponent(args[4]);
				break;
			case "page":
			case "route":
				inless.removeRoute(args[4]);
				break;
			case "mod":
			case "modificator":
				inless.removeModificator(args[4]);
				break;
			default:
		}
		break;
	case "test":
		console.log(require('path').resolve(module.paths[1], '../files'));
		//inless.test();
		break;
	default:
}


//console.log(process.argv);
