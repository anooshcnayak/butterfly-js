import ConsumerConfig from "./consumer-config";

import {Kafka, Consumer as KafkaConsumer} from 'kafkajs'
import {ConsumerRunConfig} from "./consumer-run-config";

export default class Consumer {

  private config: ConsumerConfig;
  private logger: any;
  private consumer: KafkaConsumer;
  private kafka: any
  constructor(config: ConsumerConfig, logger?: any) {
    this.config = config;
    this.logger = logger;

    const kafka = new Kafka({
      clientId: this.config.groupId,
      brokers: [...this.config.brokerList]
    })
    this.kafka = kafka;
    const consumer = this.kafka.consumer({ groupId: this.config.groupId })
    this.consumer = consumer;
  }

  public async connect(): Promise<void> {
    await this.consumer.connect();

    // Subscribe to all topics
    const promises: Array<Promise<any>> = [];
    this.config.topics.forEach(topic => {
      promises.push(this.consumer.subscribe({
        topic: topic,
        fromBeginning: false
      }));
    });

    await Promise.all(promises);
  }

  public async consume(consumerRunConfig: ConsumerRunConfig): Promise<void> {
    await this.consumer.run(consumerRunConfig);
  }

  public async disconnect(): Promise<void> {
    await this.consumer.disconnect();
  }

  public async stop(): Promise<void> {
    await this.consumer.stop();
  }
}
