"use strict";
var fs = require("fs");
var path = require("path");
var process = require('process');
var readline = require('readline');
var tgz = require('tar.gz');


var fileSystem = (function() {
	var Class = function() {};
	Class.prototype = {
		_pNrlm: function(name) {
			return name.split('/').join(path.sep);
		},
		_lNrlm: function(name) {
			return this._pNrlm(name
				.replace('$FILES', path.resolve(module.paths[1], '../files')));
		},
		getDirList: function(pth) {
			pth = pth || pth;
			var data = [];
			var files = fs.readdirSync(path.resolve(pth));
			files.forEach(function(file, index) {
				var curPath = pth +'/' + file;
				if (fs.lstatSync(curPath).isDirectory()) {
					data.push(file);
				}
			});
			return data;
		},
		rm: function(name) {
			var deleteFolderRecursive = function(path) {
				var files = [];
				if( fs.existsSync(path) ) {
				files = fs.readdirSync(path);
					files.forEach(function(file,index) {
						var curPath = path + "/" + file;
						if(fs.lstatSync(curPath).isDirectory()) {
							deleteFolderRecursive(curPath);
						} else {
							fs.unlinkSync(curPath);
						}
					});
					fs.rmdirSync(path);
				}
			};
			name = this._pNrlm(name);
			console.log('	remove', name);
			if(fs.existsSync(name)) {
				(fs.lstatSync(name).isDirectory() ? deleteFolderRecursive(name) : fs.unlinkSync(name))||true;
			}
		},
		mkdir: function (name) {
			name = this._pNrlm(name);
			console.log('	make folder:', name);
			fs.mkdirSync(name);
			return true;
		},
		rename: function (_old, _new) {
			_old = this._pNrlm(_old);
			_new = this._pNrlm(_new);
			console.log('	rename:', _old, 'to', _new);
			fs.renameSync(_old, _new);
			return true;
		},
		readLine: function (query, cb) {
			var rl = readline.createInterface({
				input: process.stdin,
				output: process.stdout
			});
			rl.question(query+" ", function(answer) {
				rl.close();
				cb(answer);
			});
		},
		queryLine: function (query, cb) {
			var rl = readline.createInterface({
				input: process.stdin,
				output: process.stdout
			});
			rl.question(query+"[Y/n] ", function(answer) {
				rl.close();
				answer = answer.toLowerCase();
				cb(answer.length == 0 || answer == "y" ? true : false);
			});
		},
		readFile: function(name) {
			return fs.readFileSync(this._pNrlm(name)).toString();
		},
		writeFile: function(name, data) {
			return fs.writeFileSync(this._pNrlm(name), data.toString());
		},
		tarball: function(_in, _out, cb) {
			cb = cb||function(){};
			console.log(this._lNrlm(_in), this._pNrlm(_out));
			tgz().compress(this._lNrlm(_in), this._pNrlm(_out), function(err) {
				cb(err);
			});
		},
		untar: function(_in, _out, cb) {
			cb = cb||function(){};
			console.log('	extract', path.parse(this._lNrlm(_in)).name, 'to', this._pNrlm(_out));
			tgz().extract(this._lNrlm(_in), this._pNrlm(_out), function(err) {
				cb(err);
			});
		}
	};
	return Class;
})();


module.exports = fileSystem;
