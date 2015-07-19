"use strict";

var fs = require("fs");
var path = require("path");


var args = process.argv;

var command = args[2];


var mkdir = function(p) {
	console.log('	make folder:', p);
	fs.mkdirSync(p);
}




var rmdir = function(p) {
	console.log('	remove folder:', p);
	deleteFolderRecursive(p);
}



var mkfile = function(p, data) {
	console.log('	make file:', p);
	fs.writeFileSync(p, data||'');
}


var deleteFolderRecursive = function(path) {
	var files = [];
	if( fs.existsSync(path) ) {
	files = fs.readdirSync(path);
		files.forEach(function(file,index){
			var curPath = path + "/" + file;
			if(fs.lstatSync(curPath).isDirectory()) { // recurse
				deleteFolderRecursive(curPath);
			} else { // delete file
				fs.unlinkSync(curPath);
			}
		});
		fs.rmdirSync(path);
	}
};





var pBase = '.'+path.sep+'styles'+path.sep;
var pComponents = pBase+'components'+path.sep;
var pRoutes = pBase+'routes'+path.sep;

var init = function() {
	var fMain = "// main file \n\n@import (less) \"variables.less\";\n";
	mkdir(pBase);
	mkdir(pComponents);
	mkdir(pRoutes);
	mkfile(pComponents+'variables.less', "");
	mkfile(pComponents+'main.less', fMain);
	mkfile(pRoutes+'variables.less', "");
	mkfile(pRoutes+'main.less', fMain);
	mkfile(pBase+'variables.less', "");
	mkfile(pBase+'main.less', fMain+"\n\n@import (less) \"components/main.less\";\n\n@import (less) \"routes/main.less\";\n");
	console.log('Success: project created!');
}



var createComponent = function(name) {
	var file = "\n\n\n//    "+name+"    \n\n"+
		".component-"+name+" {\n"+
		"\t@import (less) \"variables.less\";\n"+
		"\t@import (less) \"default.less\";\n"+
		"\t@import (less) \"xs.less\";\n"+
		"\t@import (less) \"sm.less\";\n"+
		"\t@import (less) \"md.less\";\n"+
		"\t@import (less) \"lg.less\";\n"+
		"}\n\n";
	var dir = pComponents+name+path.sep;
	mkdir(dir);
	mkfile(dir+'default.less');
	mkfile(dir+'xs.less');
	mkfile(dir+'sm.less');
	mkfile(dir+'md.less');
	mkfile(dir+'lg.less');
	mkfile(dir+'variables.less');
	mkfile(dir+'index.less', file);
	var main = fs.readFileSync(pComponents+'main.less');
	main += "\n\n@import (less) \""+name+"/index.less\";";
	fs.writeFileSync(pComponents+'main.less', main);
	console.log('Success: component '+name+' created!');
}

var createRoute = function(name) {
	var file = "\n\n\n//    "+name+"    \n\n"+
		".route-"+name+" {\n"+
		"\t@import (less) \"variables.less\";\n"+
		"\t@import (less) \"default.less\";\n"+
		"\t@import (less) \"xs.less\";\n"+
		"\t@import (less) \"sm.less\";\n"+
		"\t@import (less) \"md.less\";\n"+
		"\t@import (less) \"lg.less\";\n"+
		"}\n\n";
	var dir = pRoutes+name+path.sep;
	mkdir(dir);
	mkfile(dir+'default.less');
	mkfile(dir+'xs.less');
	mkfile(dir+'sm.less');
	mkfile(dir+'md.less');
	mkfile(dir+'lg.less');
	mkfile(dir+'variables.less');
	mkfile(dir+'index.less', file);
	var main = fs.readFileSync(pRoutes+'main.less');
	main += "\n\n@import (less) \""+name+"/index.less\";";
	fs.writeFileSync(pRoutes+'main.less', main);
	console.log('Success: route '+name+' created!');
}

var removeComponent = function(name) {
	var dir = pComponents+name+path.sep;
	rmdir(dir);
	var main = fs.readFileSync(pComponents+'main.less').toString();
	main = main.replace(new RegExp('\\n\\n\@import\\s\\(less\\)\\s\"'+name+'\\/index\\.less\"\;', 'ig'),"")
	fs.writeFileSync(pComponents+'main.less', main);
	console.log('Success: component '+name+' removed!');
}

var removeRoute = function(name) {
	var dir = pRoutes+name+path.sep;
	rmdir(dir);
	var main = fs.readFileSync(pRoutes+'main.less');
	main = main.replace(new RegExp('\\n\\n\@import\\s\\(less\\)\\s\"'+name+'\\/index\\.less\"\;', 'ig'),"")
	fs.writeFileSync(pComponents+'main.less', main);
	console.log('Success: route '+name+' removed!');
}

var create = function(type, name) {
	switch(type) {
		case "component":
			createComponent(name);
		break;
		case "route":
			createRoute(name);
		break;
		default:
			console.log("Error: wrong type:", type);
	}
}

var remove = function(type, name) {
	switch(type) {
		case "component":
			removeComponent(name);
		break;
		case "route":
			removeRoute(name);
		break;
		default:
			console.log("Error: wrong type:", type);
	}
}

var clear = function() {
	rmdir(pBase.substr(0, pBase.length-1));
}




switch(command) {
	case "init":
		init();
	break;
	case "create":
		create(args[3], args[4]);
	break;
	case "remove":
		remove(args[3], args[4]);
	break;
	case "clear":
		clear();
	break;
	default:
		console.log("ERROR: command not found!");
}


//console.log(process.argv);







