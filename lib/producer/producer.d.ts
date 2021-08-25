import ProducerConfig from "./producer_config";
import ProducerRecord from "./producer_record";
export default class Producer {
    private producerConfig;
    private readonly producer;
    private readonly logger;
    private isReady;
    constructor(producerConfig: ProducerConfig, logger: any);
    start(): Promise<void>;
    produce(producerRecord: ProducerRecord): Promise<void>;
}
