import less from 'less';
import path from 'path';
import fs from 'fs';

import Logger from 'logger';
var logger = Logger.getLogger('styles');

//var mode = process.argv[2];


var getComponents = function() {
	var data = [];
	var files = fs.readdirSync(path.resolve('./application/components'));
	files.forEach(function(file, index) {
		var curPath = './application/components/' + file;
		if (fs.lstatSync(curPath).isDirectory()) {
			data.push(file);
		}
	});
	return data;
}

var getModificators = function() {
	var data = [];
	var files = fs.readdirSync(path.resolve('./application/modificators'));
	files.forEach(function(file, index) {
		var curPath = './application/modificators/' + file;
		if (fs.lstatSync(curPath).isDirectory()) {
			data.push(file);
		}
	});
	return data;
}

var getLevels = function() {
	var data = [];
	var levels = require('./../configs/style.json').levels;
	for (var i in levels) {
		if (levels.hasOwnProperty(i)) {
			data.push({
				name: i,
				query: levels[i],
				width: levels[i].match(/\d+/ig) ? +levels[i].match(/\d+/ig)[0] : 0
			});
		}
	}
	return data;
}


var make = function() {
	var basics = fs.readFileSync(path.resolve(`./application/basics/markup/style/index.less`)).toString();
	basics += fs.readFileSync(path.resolve(`./application/basics/markup/style/variables.less`)).toString();
	var head = '';
	var modificatorsBody = "";
	var modificatorsLevels = "";
	var componentsBody = "";
	var componentsLevels = "";
	var levelsLocal = "";
	levels.forEach(function(level, i) {
		levelsLocal += `.${level.name}(){};`;
		var cmps = "";
		var mods = "";
		head += `@media-${level.name}: ~"${level.query}";`;
		// col-lg(3,12);
		head += `.col-${level.name}(@cols:1, @row: 12) { width: ${level.width}px / @row * @cols; }`;
		// offset-lg(3,12);
		head += `.offset-${level.name}(@cols:1, @row: 12) { margin-right: ${level.width}px / @row * @cols; }`;
		// --
		components.forEach(function(comp, i) {
			cmps += `.c-${comp}, .com-${comp}, .comp-${comp}, .component-${comp} {.application > .com-${comp} > .${level.name}(); }`;
		});
		modificators.forEach(function(mod, i) {
			mods += `.m-${mod}, .mod-${mod}, .modificator-${mod} {.application > .mod-${mod} > .${level.name}(); }`;
		});
		modificatorsLevels += `@media @media-${level.name} {${mods}}`;
		componentsLevels += `@media @media-${level.name} {${cmps}}`;
	});
	components.forEach(function(comp, i) {
		var str = fs.readFileSync(path.resolve(`./application/components/${comp}/markup/style/index.less`)).toString();
		componentsBody += `.c-${comp}, .com-${comp}, .comp-${comp}, .component-${comp}{${levelsLocal} ${str}}`;
	});
	modificators.forEach(function(mod, i) {
		var str = fs.readFileSync(path.resolve(`./application/modificators/${mod}/markup/index.less`)).toString();
		modificatorsBody += `.m-${mod}, .mod-${mod}, .modificator-${mod} {${levelsLocal} ${str}}`;
	});
	return `${basics} .application { ${head} ${modificatorsBody} ${modificatorsLevels} ${componentsBody} ${componentsLevels} }`;
}

var media = '';
var bundle = '';
var levels = getLevels();
var components = getComponents();
var modificators = getModificators();

var render = function(mode, cb) {
	if (true || bundle.length == 0) {
		media = false && media.length ? media : make();
		less.render(media, {
				compress: mode == 'production'
			},
			function(e, output) {
				if (e) logger.error(e);
				bundle = output ? output.css : '.error {}';
				cb(bundle);
			});
	} else {
		cb(bundle);
	}
}

var appConfig = require('./../configs/application.json');

export default function(app, mode) {
	app.use(appConfig.style.bundle || '/bundle.css', function(req, res) {
		render(mode, (bundle) => {
			res.header("Content-type", "text/css");
			res.end(bundle);
		});
	});
	return app;
}
