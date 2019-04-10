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
console.log('Server running at http://127.0.0.1:1377/')
// 再具体的业务中我们可能会有如下需求：
// 1.请求方法的判断
// 2.URL路径解析
// 3.URL中查询字符串解析
// 4.Cookie的解析
// 5.Basic认证
// 6.表单数据的解析
// 7.任意格式文件的上传处理
// 8.可能还会有Session（会话）的需求
