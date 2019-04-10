var http = require('http');
http.createServer(function (req, res) {
    switch(req.method) {
        case 'POST':
            update(req, res);
            break;
    }
    function update(req, res){
        if (req.headers['content-type'] === 'application/x-www-form-urencoded') {
            req.body = querystring.parse(req.rawBody);
        }
        todo(req. res)
    }
    function todo(req, res){
        console.log(req.body);
        return;
        res.writeHead(200, {})
    }
}).listen(1377, '127.0.0.1');
console.log('Server running at http://127.0.0.1:1377/')