$.get('/api', {
    success: onSuccess,
    error: onError,
    complete: onComplete
});

// 延迟处理的方式有 Promise/Deferred 模式
$.get('/api')
  .success(onSuccess)
  .error(onError)
  .complete(onComplete);

// 这使得即使不调用success()、error()等方法，Ajax也会执行，在原始API中，一个时间只能处理一个回调，而通过Deferred对象，
// 可以对事件加入任意的业务处理逻辑，示例代码如下：
$.get('/api')
  .success(onsuccess1)
  .success(onsuccess2)