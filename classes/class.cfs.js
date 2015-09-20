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
			return path.join(process.argv[1], this._pNrlm(name
				.replace('$FILES', './../../files')));
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
			console.log('	extract', this._lNrlm(_in), 'in to', this._pNrlm(_out));
			tgz().extract(this._lNrlm(_in), this._pNrlm(_out), function(err) {
				cb(err);
			});
		}
	};
	return Class;
})();


module.exports = fileSystem;
