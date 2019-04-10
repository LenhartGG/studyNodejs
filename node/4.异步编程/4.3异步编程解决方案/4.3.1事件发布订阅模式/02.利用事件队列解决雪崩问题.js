// 解决重复性的事件响应
// 大量数据访问
// 添加一个状态锁
var EventEmitter = new require('events').EventEmitter;
var proxy = new EventEmitter();
var status = 'ready';
var select = function (callback) {
    proxy.once("selected", callback);
    if (status == 'ready') {
        status = 'pending';
        db.select("SQL", function (results){
            proxy.emit("selected", results);
            status = 'ready';
        })
    }
}