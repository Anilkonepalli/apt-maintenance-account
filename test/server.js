var jsonServer = require('json-server');
var server = jsonServer.create();
var router = jsonServer.router('./db.json');
var data = require('./db.json');
var	jwt	= require('jsonwebtoken');
var _ = require('lodash');
var middlewares = jsonServer.defaults();
var port = 3000;
var jwtSecretKey = "hHu4zxai9Opt54bq";

// Set default middlewares (logger, static, cors and no-cache)
server.use(middlewares);

// Add custom routes before JSON Serve router
server.get('/echo', function(req, res){
	res.jsonp(req.query);
});

// To handle POST, PUT and PATCH, a body-parser is needed
server.use(jsonServer.bodyParser);
server.post('/api/login', function(req, res){
	let user = getUser(req.body.email, req.body.password);
	let id_token = null;
	if(user) {
		id_token = getToken(user);
	}
	res.jsonp({
		id_token: id_token
	});
});
server.use(function(req, res, next) {
	if(req.method === 'POST') {
		req.body.createdAt = Date.now();
	}
	// Continue to JSON Server router
	next();
});

// Use default router ...
// Mount the router on another endpoint; here, it is '/api'
server.use('/api', router); 
server.listen(port, () => {
	console.log('JSON Server is running on port# '+port);
});


// private methods
function getUser(email, password){
	let user = data.users.find(each => 
		each.email === email 
		&& each.password === password);

	return user;
}

function getToken(user) {
	return jwt.sign(
				_.omit(user, ['password']), 
				secret, 
				{expiresIn: 60*60*1}
			); // expires in 1 hour OR (60 x 60 x 1) seconds
}