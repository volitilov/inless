#!/usr/bin/env node

var inLess = require('./../classes/class.inless.js');

var inless = new inLess();

var args = process.argv;

var command = args[2];

// console.log(args);

switch (command) {
	case "res":
	case "restore":
		inless.restore();
		break;
	case "init":
		inless.init();
		break;
	case "clear":
		inless.clear();
		break;
	case "run":
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
			case "lib":
			case "library":
				inless.createLibrary(args[4]);
				break;
			case "plg":
			case "plugin":
				inless.createPlugin(args[4]);
				break;
			case "api":
				inless.createApi(args[4], args[5]);
				break;
			default:
				console.log('Wrong create parameter:', args[4]);
		}
		break;
	case "rm":
	case "rem":
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
			case "plg":
			case "plugin":
				inless.removePlugin(args[4]);
				break;
			case "mod":
			case "modificator":
				inless.removeModificator(args[4]);
				break;
			default:
				console.log('Wrong remove parameter:', args[4]);
		}
		break;
	default:
		console.log('Wrong commang:', command);
}


//console.log(process.argv);
