var toString = Object.prototype.toString;

var isType = function (type) {
    return function (obj) {
        return toString.call(obj) == '[object ' + type + ']';
    };
};

var isString = isType('String');
var isFunction = isType('Function');

console.log(isString('123'))
console.log(isString(123))
console.log(isFunction({}))

// 1.继承 events 模块
var events = require('events');
var util = require('util');
function Stream() {
    events.EventEmitter.call(this)
}
util.inherits(Stream, events.EventEmitter)