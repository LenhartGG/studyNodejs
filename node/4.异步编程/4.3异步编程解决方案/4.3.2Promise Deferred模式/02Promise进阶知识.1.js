// 现在有一组纯异步的API
obj.api1(function (value1) {
    obj.api2(value2, function (value2) {
        obj.api3(value2, function (value3) {
            obj.api4(value3, function (value4) {
                calback(value4);
            });
        });
    });
});

// 1.使用普通函数将上面的代码展开：
var handler1 = function (value1) {
    obj.api2(value1, handler2);
};
var handler2 = function (value2) {
    obj.api3(value2, handler3);
};
var handler3 = function (value3) {
    obj.api4(value3, handler4);
};
var handler4 = function (value4) {
    callback(value4)
};

obj.api1(handler1);

// 2.使用事件对上面的代码进行展开：
var emitter = new event.Emitter();

emitter.on("step1", function () {
    obj.api1((value1) => {
        emitter.emit("step2", value1);
    });
});

emitter.on("step2", function(value1){
    obj.api2(value1, (value2) => {
        emitter.emit("step3", value2);
    });
});

emitter.on("step3", (value2)=>{
    obj.api3(value2, (value3)=>{
        emitter.emit("step4", value3);
    });
});

emitter.on("step4", (value3)=>{
    obj.api4(value3, (value4)=>{
        callback(value4)
    })
});

emitter.emit("step1")