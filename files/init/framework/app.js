
import http from 'http';
import process from 'process';
var mode = process.argv[2]||'production';

import app from './express.js';

const config = require('./../configs/server.json');

let server = require('http').Server(app);

server.listen(config[mode].port, config[mode].host, ()=> {
	console.log(`start on ${config[mode].host}:${config[mode].port}`);
});
