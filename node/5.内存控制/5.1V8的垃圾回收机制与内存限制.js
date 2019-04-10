// 1.内存使用量查看方法：
// console.log(process.memoryUsage())

// 2.调整内存限制的大小（放宽V8默认的内存限制，避免在执行过程中稍微多了一些内存就轻易崩溃）
// node --max-old-space-size=1700 test.js //单位为MB
// node --max-old-space-size=1024 test.js //单位为KB

// 查看垃圾回收日志
// node -trace_gc -e "var a = []; for (var i = 0; i < 1000000; i++) a.push(new Array(100));" > gc.log
