// 1.变量的主动释放
global.foo = "I am a gobal object";
console.log(global.foo);
delete global.foo;
// 或者重新赋值
global.foo = undefined; // or null
console.log(global.foo); // => undefined

// 如果在非全局作用域中，想主动释放变量引用的对象，也可以通过这样的方式。
// 虽然delete操作和重新赋值具有相同的效果，
// 但是在V8中通过delete删除对象的属性有可能干扰V8的优化，所有通过赋方式解除引用更好。

