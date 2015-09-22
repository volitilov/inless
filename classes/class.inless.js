"use strict";
var cFS = require("./class.cfs.js");
var cfs = new cFS();
var child_process = require('child_process');

var inLess = (function() {
	var Class = function() {};
	Class.prototype = {
		init: function() {
			console.log('init project');
			var extractFiles = function() {
				cfs.untar('$FILES/init/init.tar.gz', './', function(err) {
					setTimeout(function() {
						var child = child_process.exec('npm i');
						child.stdout.on('data', function(data) {
							console.log(data.toString());
						});
						child.on('close', function(code) {
							complete(config);
						});
					}, 1000);
				});
			}
			var fields = [{
				name: "name",
				default: "project",
				query: "Application name"
			}, {
				name: "version",
				default: "0.0.1",
				query: "Application version"
			}, {
				name: "description",
				default: "",
				query: "Application description"
			}, {
				name: "author",
				default: "root@localhost",
				query: "Application author"
			}];
			var config = {};
			var i = 0;
			var a = function(e) {
				cfs.readLine(e.query+' (default: "'+e.default+'")', function(answer) {
					config[e.name] = answer && answer.length > 0 ? answer : e.default;
					if (++i < fields.length) {
						a(fields[i]);
					} else {
						extractFiles();
					}
				});
			}
			a(fields[0]);
			var complete = function(data) {
				var pkg = JSON.parse(cfs.readFile('./package.json'));
				for (var i in data) {
					if (data.hasOwnProperty(i)) {
						pkg[i] = data[i];
					}
				}
				cfs.writeFile('./package.json', JSON.stringify(pkg, true, '\t'));
				console.log('complete');
			}
		},
		clear: function() {
			console.log('clear project');
			var folders = function() {
				cfs.rm('./configs');
				cfs.rm('./application');
				cfs.rm('./framework');
				cfs.rm('./node_modules');
				cfs.rm('./tmp');
				cfs.rm('./index.js');
				cfs.rm('./package.json');
				console.log('complete');
			}
			cfs.queryLine('Realy?', function(answer) {
				if (answer) {
					folders();
				} else {
					console.log('breaked');
				}
			});
		},
		createModificator: function(name) {
			var defName = 'mod'+((Math.random()*1000)|0);
			var x = function() {
				console.log('create Modificator ' + name);
				cfs.mkdir('./application/modificators/'+name);
				var extractFiles = function() {
					cfs.untar('$FILES/modificator/modificator.tar.gz', './application/modificators/'+name+'/', function(err) {
						console.log('complete');
					});
				}
				extractFiles();
			}
			if(name) {
				x();
			} else {
				cfs.readLine('modificator name (default "'+defName+'"):', function(answer) {
					name = answer||defName;
					x();
				});
			}
		},
		createComponent: function(name) {
			var defName = 'comp'+((Math.random()*1000)|0);
			var x = function() {
				console.log('create Component ' + name);
				cfs.mkdir('./application/components/'+name);
				var extractFiles = function() {
					cfs.untar('$FILES/component/component.tar.gz', './application/components/'+name+'/', function(err) {
						setTimeout(function() {
							var ejs = cfs.readFile('./application/components/'+name+'/markup/view/index.ejs');
							cfs.writeFile('./application/components/'+name+'/markup/view/index.ejs', ejs.split('%name%').join(name));
							var react = cfs.readFile('./application/components/'+name+'/react/index.jsx');
							cfs.writeFile('./application/components/'+name+'/react/index.jsx', react.split('%name%').join(name));
							var child = child_process.exec('cd ./application/components/'+name+'/react && npm i');
							child.stdout.on('data', function(data) {
								console.log(data.toString());
							});
							child.on('close', function(code) {
								complete(config);
							});
							console.log('complete');
						}, 1000);
					});
				}
				extractFiles();
			}
			if(name) {
				x();
			} else {
				cfs.readLine('component name (default "'+defName+'"):', function(answer) {
					name = answer||defName;
					x();
				});
			}
		},
		createRoute: function(name, pth, status, title) {
			var defName = 'route'+((Math.random()*1000)|0);
			var x = function() {
				console.log('create Route ' + name);
				cfs.mkdir('./application/routes/'+name);
				var extractFiles = function() {
					cfs.untar('$FILES/route/route.tar.gz', './application/routes/'+name+'/', function(err) {
						console.log('complete');
					});
				}
				var config = JSON.parse(cfs.readFile('./configs/routes.json').toString());
				config.pages.push({
					name: name,
					path: pth,
					title: title
				});

				var ejs = cfs.readFile('./application/routes/'+name+'/markup/index.ejs');
				cfs.writeFile('./application/routes/'+name+'/markup/index.ejs', ejs.split('%name%').join(name));
				var ejs = cfs.readFile('./application/routes/'+name+'/react/handler.ejs');
				cfs.writeFile('./application/routes/'+name+'/react/handler.ejs', ejs.split('%name%').join(name));

				cfs.writeFile('./configs/routes.json', JSON.stringify(config, true, '	'));
				extractFiles();
			}
			var a = function() {
				if(name) {
					return b();
				}
				cfs.readLine('route name (default "'+defName+'"):', function(answer) {
					name = answer||defName;
					b();
				});
			}
			var b = function() {
				if(pth) {
					return c();
				}
				cfs.readLine('route path (default "/"): ', function(answer) {
					pth = answer||'/';
					c();
				});
			}
			var c = function() {
				if(title) {
					return x();
				}
				cfs.readLine('route status (default 8): ', function(answer) {
					status = answer||8;
					d();
				});
			}
			var d = function() {
				if(title) {
					return x();
				}
				cfs.readLine('route title (default "'+defName+'"): ', function(answer) {
					title = answer||defName;
					x();
				});
			}
			a();
		},
		start: function(mode) {
			switch (mode) {
				case "dv":
				case "dev":
				case "development":
					mode = 'development';
					break;
				case "mk":
				case "markup":
					mode = 'markup';
					break;
				case "ds":
				case "des":
				case "design":
					mode = 'design';
					break;
				default:
					mode = 'production';
			}
			console.log('starting project in '+mode+' mode...');
			var child = child_process.exec('node index.js ' + mode);
			child.stdout.on('data', function(data) {
				console.log(data.toString());
			});
			child.stderr.on('data', function(data) {
				console.error(data.toString());
			});
			child.on('close', function(code) {
				console.log('complete');
			});
		},
		test: function() {
			console.log('test zip');
			var child = child_process.exec('node index.js');
			child.stdout.on('data', function(data) {
				console.log(data.toString());
			});
			child.on('close', function(code) {
				console.log('complete');
			});
		},
		removeComponent: function(name) {
			var x = function() {
				console.log('remove Component ' + name);
				cfs.rm('./application/components/'+name);
				console.log('complete');
			}
			if(name) {
				x();
			} else {
				cfs.readLine('component name:', function(answer) {
					if(answer) {
						name = answer;
						x();
					} else {
						console.log('wrong name');
					}
				});
			}
		},
		removeModificator: function(name) {
			var x = function() {
				console.log('remove Modificator ' + name);
				cfs.rm('./application/modificators/'+name);
				console.log('complete');
			}
			if(name) {
				x();
			} else {
				cfs.readLine('modificator name:', function(answer) {
					if(answer) {
						name = answer;
						x();
					} else {
						console.log('wrong name');
					}
				});
			}
		},
		removeRoute: function(name) {
			var x = function() {
				console.log('remove Route ' + name);
				cfs.rm('./application/routes/'+name);
				var config = JSON.parse(cfs.readFile('./configs/routes.json').toString());
				var ind = 0;
				var e = false;
				config.pages.forEach((route, i)=> {
					if(route.name == name) {
						e = true;
						ind = i;
					}
				});
				if(e) {
					config.pages.splice(ind, 1);
					cfs.writeFile('./configs/routes.json', JSON.stringify(config, true, '	'));
					console.log('complete');
				}
			}
			var a = function() {
				if(name) {
					return x();
				}
				cfs.readLine('route name:', function(answer) {
					if(answer) {
						name = answer;
						x();
					} else {
						console.log('wrong name');
					}
				});
			}
			a();
		}
	};
	return Class;
})();


module.exports = inLess;
