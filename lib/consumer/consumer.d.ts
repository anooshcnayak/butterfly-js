import ConsumerConfig from "./consumer-config";
import { ConsumerRunConfig } from "./consumer-run-config";
export default class Consumer {
    private config;
    private logger;
    private consumer;
    private kafka;
    constructor(config: ConsumerConfig, logger?: any);
    connect(): Promise<void>;
    consume(consumerRunConfig: ConsumerRunConfig): Promise<void>;
    disconnect(): Promise<void>;
    stop(): Promise<void>;
}
