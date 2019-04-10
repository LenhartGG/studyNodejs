var fs = require('fs');
var EventEmitter = require('events').EventEmitter;

// 方案1.利用偏函数处理哨兵变量和第三方函数的关系：
var after = function (times, callback) {
    var count = 0, results = {};
    return function (key, value) {
        results[key] = value;
        count++;
        if (count === times) {
            callback(results);
        }
    };
};
// var done = after(times, render);

// 方案2.以上方案实现了多对一的目的，如果业务继续增长，可以利用发布/订阅模式实现多对多的方案：
var emitter = new EventEmitter();
var times = 3;
var done = after(times, render);

emitter.on("done", done);
emitter.on("done", other);

fs.readFile(template_path, "utf8", function (err, template) {
    emitter.emit("done", "template", template);
});
db.query(sql, function (err, data) {
    emitter.emit("done", "data", data);
});
l10n.get(function (err, resources) {
    emitter.emit("done", "resources", resources)
});

// 方案3.笔者自己写的EventProxy模块，它是对时间发布订阅模式的补充，可以自由订阅组合事件：
var proxy = new EventProxy();
proxy.all("template", "data", "resources", function (template, data, resources) {
    // TODO
});

fs.readFile(template_path, "utf8", function (err, template) {
    proxy.emit("template", template);
});
db.query(sql, function (err, data) {
    proxy.emit("data", data);
});
l10n.get(function (err, resources) {
    proxy.emit("resources", resources);
});

// EventProxy 还提供了 after() 方法来实现事件在执行多少次后执行侦听器的的单一事件组合订阅方式，示例代码如下：
var proxy = new EventProxy();
proxy.after("data", 10, function (datas){
    // TODO
});
// 这段代码表示执行10次datas事件后执行侦听器 datas为该10事件排序的数组

