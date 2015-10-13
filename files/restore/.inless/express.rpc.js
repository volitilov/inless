import configs from 'configs';
import plugins from 'plugins';
import express from 'express';
import Logger from 'logger';
import Session from 'session';

var logger = Logger.getLogger('express.rpc');

var appConfigs = configs('app');


var xRouter = express.Router();
var router = express.Router();

router.post('/:plugin/:method', (req, res, next)=> {
	try {
		var session = new Session(req.session.session);
		if(plugins.list[req.params.plugin] && plugins.list[req.params.plugin][req.params.method]) {
			logger.info(`${req.params.plugin}.${req.params.method}`, req.body||req.query||{});
			plugins.list[req.params.plugin][req.params.method](req.body||req.query||{}, session).then((data)=> {
				session = session.export();
				req.session.session = session;
				res.json({
					error: null,
					response: data
				});
			}).catch((error)=> {
				session = session.export();
				req.session.session = session;
				logger.error(error);
				res.json({
					error: error,
					response: null
				});
			});
		} else {
			logger.warn('Error: not fond method:', req.params);
			res.json({
				error: 'not fond method',
				response: null
			});
		}
	} catch(e) {
		logger.error(e);
		res.end('500 Internal server error');
	}
});

xRouter.use(plugins.router);
xRouter.use(appConfigs.react.RPCPath||'/rpc', router);

module.exports = xRouter;
