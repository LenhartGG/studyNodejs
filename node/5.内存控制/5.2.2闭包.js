var foo = function(){
    var bar = function(){
        var local = "局部变量";
        return function (){
            return local;
        }
    };
    var baz = bar();
    console.log(baz());
};
foo();
// 闭包是JavaScript的高级特性，利用它可以产生很多巧妙的效果。它的问题在于一旦有变量引用这个中间函数，这个中间函数将不会释放。
// 同时也不会使原始的作用域得到释放，作用域中产生的内存占用也不会得到释放。除非不再有引用，才会逐步释放。