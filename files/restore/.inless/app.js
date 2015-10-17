import http from 'http';
import process from 'process';
import app from './express.js';

import Logger from 'logger';

var logger = Logger.getLogger('app');


import mode from 'startmode';

var configs = require('configs');
var config = configs('server');

let server = require('http').Server(app);

server.listen(config.mods[mode].port || 8080, config.mods[mode].host || 'localhost', () => {
	logger.info(`server started on ${config.mods[mode].host||'localhost'}:${config.mods[mode].port||8080} in ${mode} mode`);
});
