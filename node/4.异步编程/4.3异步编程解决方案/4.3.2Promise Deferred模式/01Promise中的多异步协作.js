// 类似于EventProxy，这里给出了一个简单的原型实现，相关代码如下：
Deferred.prototype.all = function (promises){
    var count = promises.length;
    var results = [];
    promises.forEach(function (promise, i) {
        promise.then(function (data) {
            count--;
            results[i] = data;
            if(count === 0) {
                that.resolve(results);
            }
        }, function (err) {
            that.reject(err);
        });
    });
    return this.promise;
};

// 对于多次文件的读取场景 all() 方法将两个单独的Promise重新抽象组合成一个新的Promise：
var promise1 = readFile("foo.txt", "utf8");
var promise2 = readFile("bar.txt", "utf8");
var deferred = new Deferred();
deferred.all([promise1, promise2]).then(function (results) {
    // TODO
}, function (err) {
    // TODO
});
// 这里通过all()方法抽象多个异步操作，只有所有的异步操作成功，这个异步操作才算成功，一旦其中一个异步操作失败，整个异步操作就失败。
