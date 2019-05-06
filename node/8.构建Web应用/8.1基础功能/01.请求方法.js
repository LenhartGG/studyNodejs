var http = require('http');
http.createServer(function (req, res) {
    switch(req.method) {
        case 'POST':
            update(req, res);
            break;
        case 'DELETE':
            remove(req, res);
            break;
        case 'PUT':
            create();
            break;
        case 'GET':
        default:
            get(req, res);
    }
    
}).listen(1377, '127.0.0.1');
console.log( 'Server running at http://127.0.0.1:1377/' )