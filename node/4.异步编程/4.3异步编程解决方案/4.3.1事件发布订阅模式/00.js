var events = require('events');
var emitter = new events.EventEmitter();
// 去除侦听器添加限制
emitter.setMaxListeners(0);
// 订阅
emitter.on("event1", function (message) {
    console.log(message);
})
// 发布
emitter.emit("event1", "I am a massage.")