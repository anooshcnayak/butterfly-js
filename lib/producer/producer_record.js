"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ProducerRecord {
    constructor(topic, messages, acks, timeout) {
        this._topic = topic;
        this._messages = messages;
        this._acks = acks || -1;
        this._timeout = timeout || 5000;
    }
    get topic() {
        return this._topic;
    }
    get messages() {
        return this._messages;
    }
    get acks() {
        return this._acks;
    }
    get timeout() {
        return this._timeout;
    }
}
exports.default = ProducerRecord;
