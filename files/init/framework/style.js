import fs from 'fs';
import path from 'path';
import express from 'express';
import less from 'less';
import Logger from 'logger';

var logger = Logger.getLogger('styles');

var router = express.Router();

import mode from 'startmode';


var configs = require('configs');
var appConfig = configs('application');

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
	var levels = appConfig.levels;
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

var compileProject = function(dir) {
	var getContent = function(prnt, pth) {
		var p = path.resolve(prnt, pth);
		var source = fs.readFileSync(p).toString();
		var a = source.match(/@import\s?\(\s?less\s?\)\s?(?:\"|\')?([^\'\"\;]+)(?:\"|\')?\;?/i);
		if (a) {
			var inSource = getContent(path.parse(p).dir, a[1]);
			source = source.replace(/@import\s?\(\s?less\s?\)\s?(?:\"|\')?([^\'\"\;]+)(?:\"|\')?\;?/i, inSource);
		}
		return source;
	}
	return getContent(dir, `./${appConfig.style.componentIndex||'index.less'}`);
}


var make = function() {
	var basics = fs.readFileSync(path.join(`./application/`, appConfig.style.custom)).toString();
	basics += fs.readFileSync(path.join(`./application/`, appConfig.style.variables)).toString();
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
		var source = compileProject(`./application/components/${comp}/markup/style/`);
		componentsBody += `.c-${comp}, .com-${comp}, .comp-${comp}, .component-${comp}{${levelsLocal} ${source}}`;
	});
	modificators.forEach(function(mod, i) {
		var source = compileProject(`./application/modificators/${mod}/markup/`);
		modificatorsBody += `.m-${mod}, .mod-${mod}, .modificator-${mod} {${levelsLocal} ${source}}`;
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


router.use(appConfig.style.bundleUrl || '/bundle.css', function(req, res) {
	render(mode, (bundle) => {
		res.header("Content-type", "text/css");
		res.end(bundle);
	});
});


module.exports = router;
