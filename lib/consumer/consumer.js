"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const kafkajs_1 = require("kafkajs");
class Consumer {
    constructor(config, logger) {
        this.config = config;
        this.logger = logger;
        const kafka = new kafkajs_1.Kafka({
            clientId: this.config.groupId,
            brokers: [...this.config.brokerList]
        });
        this.kafka = kafka;
        const consumer = this.kafka.consumer({ groupId: this.config.groupId });
        this.consumer = consumer;
    }
    connect() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.consumer.connect();
            // Subscribe to all topics
            const promises = [];
            this.config.topics.forEach(topic => {
                promises.push(this.consumer.subscribe({
                    topic: topic,
                    fromBeginning: false
                }));
            });
            yield Promise.all(promises);
        });
    }
    consume(consumerRunConfig) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.consumer.run(consumerRunConfig);
        });
    }
}
exports.default = Consumer;
