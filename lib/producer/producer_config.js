"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ProducerConfig {
    constructor(brokerList, clientId, acks, logger) {
        this._brokerList = brokerList;
        this._clientId = clientId;
        this._acks = acks;
        this._logger = logger;
    }
    get brokerList() {
        return this._brokerList;
    }
    get clientId() {
        return this._clientId;
    }
    get acks() {
        return this._acks;
    }
    get logger() {
        return this._logger;
    }
}
exports.default = ProducerConfig;
