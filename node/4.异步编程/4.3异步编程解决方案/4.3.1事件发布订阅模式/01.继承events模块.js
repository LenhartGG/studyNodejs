var events = require('events');
var util = require('util');
function Stream() {
    events.EventEmitter.call(this);
}
util.inherits(Stream, events.EventEmitter);