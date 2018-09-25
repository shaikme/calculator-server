const { Server } = require('http');
const url = require('url');
const querystring = require('querystring');
const calculator = require('./stringCalculator');

const server = new Server((req, res) => {
	const {pathname, query} = url.parse(req.url);
	const queryData = querystring.parse(query);

	if (pathname === '/calculus' && queryData.query) {
		res.setHeader('Content-Type', 'application/json; charset=utf-8');
		res.setHeader('Access-Control-Allow-Origin', '*');

		try {
			const result = calculator(decodeURI(queryData.query));
			res.statusCode = 200;
			res.end(JSON.stringify({
				error: false,
				result
			}));
		} catch(error) {
			res.statusCode = 400;
			res.end(JSON.stringify({
				error: true,
				message: error.message
			}));
		}

	} else {
		res.statusCode = 404;
		res.end();
	}
});

server.listen(8000);

