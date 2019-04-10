// 1.异步方法中的异常处理，在过去，是通过额外添加error事件来进行异常统一处理：
exports.getContent = function (callback) {
    var ep = new EventProxy();
    ep.all('tpl', 'data', function (tpl, data) {
        // 成功回调
        callback(null, {
            template: tpl,
            data: data
        });
    });
    // 侦听error事件
    ep.bind('error', function (err){
        // 卸载掉所有处理函数
        ep.unbind();
        // 异常回调
        callback(err);
    });
    fs.readFile('template.tpl', 'utf8', function(err, content){
        if(err){
            // 一旦发生异常，一律交给error事件的处理函数处理
            return ep.emit('error', err);
        }
        ep.emit('tpl', content);
    });
    db.get('some sql', function(err, result){
        if(err){
            // 一旦发生异常，一律交给error事件的处理函数处理
            return ep.emit('error', err);
        }
        ep.emit('data', result);
    });
};

// 2.上述异常处理代码量过多，EventProxy提供了fail()和done()这两个实例方法来优化异常处理
exports.getContent = function(callback){
    var ep = new EventProxy();
    ep.all('tpl', 'data', function(tpl, data){
        // 成功回调
        callback(null,{
            template:tpl,
            data: data
        });
    });
    // 绑定错误处理函数
    ep.fail(callback);

    fs.readFile('template.tpl', 'utf8', ep.done('tpl'));
    db.get('some sql', ep.done('data'));
}