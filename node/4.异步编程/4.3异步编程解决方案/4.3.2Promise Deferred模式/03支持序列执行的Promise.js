// // 理想的链式调用
// // promise()
// //   .then(obj.api1)
// //   .then(obj.api2)
// //   .then(obj.api3)
// //   .then(obj.api4)
// //   .then(function (value4) {
// //     //   Do something with value4
// //   }, function (error) {
// //     //   Handle any error from step1 through step
// //   })

// // 尝试改造一下代码以实现链式调用，具体如下所示：
// var Deferred = function () {
//     this.promise = new Promise();
// };

// // 完成态
// Deferred.prototype.resolve = function (obj) {
//     var promise = this.promise;
//     var handler;
//     while ((handler = promise.queue.shift())) {
//         if (handler && handler.fulfilled) {
//             var ret = handler.fulfilled(obj);
//             if (ret && ret.isPromise) {
//                 ret.queue = promise;
//                 this.promise = ret;
//                 return;
//             }
//         }
//     }
// };

// // 失败态
// Deferred.prototype.rereject = function (err) {
//     var promise = this.promise;
//     var handler;
//     while ((handler = promise.queue.shift())) {
//         if (handler && handler.error) {
//             var ret = handler.error(err);
//             if (ret && ret.isPromise) {
//                 ret.queue = promise;
//                 this.promise = ret;
//                 return;
//             }
//         }
//     }
// };

// // 生成回调函数
// Deferred.prototype.callback = function () {
//     var that = this;
//     return function (err, file) {
//         if (err) {
//             return that.reject(err);
//         }
//         that.resolve(file);
//     };
// };

// var Promise = function () {
//     // 队列用于存储待执行的回调函数
//     this.queue = [];
//     this.isPromise = true;
// };

// Promise.then = function (fulfilledHandler, errorHandler, progressHandler) {
//     var handler = {};
//     if (typeof fulfilledHandler == 'function') {
//         handler.fulfilled = fulfilledHandler;
//     }
//     if (typeof errorHandler == 'function') {
//         handler.error = errorHandler;
//     }
//     this.queue.push(handler);
//     return this;
// }

// // 测试用例
// // 以两次文件读取作为例子，来验证该设计的可行性

// var fs = require('fs');
// var readFile1 = function (file, encoding) {
//     var deferred = new Deferred();
//     fs.readFile(file, encoding, deferred.callback());
//     return deferred.promise;
// };
// var readFile2 = function (file, encoding) {
//     var deferred = new Deferred();
//     fs.readFile(file, encoding, deferred.callback());
//     return deferred.promise;
// };

// readFile1('file1.txt', 'utf8').then(function (file1) {
//     return readFile2(file1.trim(), 'utf8');
// }).then(function (file2) {
//     console.log(file2);
// });

var fs = require('fs');
var read1 = function(file, encoding, cb) {
    fs.readFile(file, encoding, cb)
}
read1('file1.txt', 'utf8', function (file1) {
    console.log(file1)
})