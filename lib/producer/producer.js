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
class Producer {
    constructor(producerConfig, logger) {
        this.isReady = false;
        this.producerConfig = producerConfig;
        this.logger = logger || console;
        if (!producerConfig) {
            throw new Error("ProducerConfig is null");
        }
        if (!producerConfig.clientId) {
            throw new Error("clientId is null");
        }
        if (!producerConfig.brokerList) {
            throw new Error("brokerList is null");
        }
        const kafka = new kafkajs_1.Kafka({
            clientId: producerConfig.clientId,
            brokers: producerConfig.brokerList,
            connectionTimeout: 1000,
            requestTimeout: 2000,
        });
        this.producer = kafka.producer({});
        if (!this.producer) {
            throw new Error("Error in initialising Producer");
        }
        const { CONNECT, DISCONNECT, REQUEST, REQUEST_TIMEOUT } = this.producer.events;
        // const connectEventName : ValueOf<ProducerEvents> =
        this.producer.on(CONNECT, (args => {
            this.logger.info("[butterfly] Connect received " + JSON.stringify(args));
            this.isReady = true;
        }));
        this.producer.on(DISCONNECT, (args => {
            this.logger.info("[butterfly] Disconnect received " + JSON.stringify(args));
        }));
        this.producer.on(REQUEST_TIMEOUT, (args => {
            this.logger.info("[butterfly] Request Timeout received " + JSON.stringify(args));
        }));
        this.producer.on(REQUEST, (args => {
            this.logger.info("[butterfly] Request received " + JSON.stringify(args));
        }));
    }
    start() {
        return __awaiter(this, void 0, void 0, function* () {
            this.logger.info("[butterfly] Connecting to Kafka");
            yield this.producer.connect();
            this.logger.info("[butterfly] Connected to Kafka");
        });
    }
    produce(producerRecord) {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.isReady) {
                try {
                    this.logger.info(`[butterfly] Producing to kafka : ${JSON.stringify(producerRecord)}`);
                    yield this.producer.send({
                        acks: producerRecord.acks,
                        messages: producerRecord.messages,
                        timeout: producerRecord.timeout,
                        topic: producerRecord.topic
                    });
                }
                catch (err) {
                    this.logger.error(`[butterfly] Error in producing`);
                    this.logger.error(err);
                }
            }
            else {
                this.logger.info("[butterfly] Produce called when producer is not ready yet");
            }
        });
    }
}
exports.default = Producer;
