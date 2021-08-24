import ProducerConfig from "./producer_config";
import {Kafka, Producer as KafkaProducer, ProducerEvents, ValueOf} from "kafkajs";
import ProducerRecord from "./producer_record";

export default class Producer {

  private producerConfig: ProducerConfig;
  private readonly producer: KafkaProducer;
  private readonly logger: any;
  private isReady: boolean = false;

  constructor(producerConfig: ProducerConfig, logger: any) {
    this.producerConfig = producerConfig;
    this.logger = logger || console;
    if(!producerConfig) {
      throw new Error("ProducerConfig is null");
    }
    if(!producerConfig.clientId) {
      throw new Error("clientId is null");
    }

    if(!producerConfig.brokerList) {
      throw new Error("brokerList is null");
    }

    const kafka = new Kafka({
      clientId: producerConfig.clientId,
      brokers: producerConfig.brokerList,
      connectionTimeout: 1000,
      requestTimeout: 2000,
    })

    this.producer = kafka.producer({

    })

    if(!this.producer) {
      throw new Error("Error in initialising Producer")
    }

    const {CONNECT, DISCONNECT, REQUEST, REQUEST_TIMEOUT} = this.producer.events
    // const connectEventName : ValueOf<ProducerEvents> =
    this.producer.on(CONNECT, (args => {
      this.logger.info("[butterfly] Connect received " + JSON.stringify(args));
      this.isReady = true;
    }))

    this.producer.on(DISCONNECT, (args => {
      this.logger.info("[butterfly] Disconnect received " + JSON.stringify(args));
    }))

    this.producer.on(REQUEST_TIMEOUT, (args => {
      this.logger.info("[butterfly] Request Timeout received " + JSON.stringify(args));
    }))

    this.producer.on(REQUEST, (args => {
      this.logger.info("[butterfly] Request received " + JSON.stringify(args));
    }))
  }

  async start () {
    this.logger.info("[butterfly] Connecting to Kafka");
    await this.producer.connect()
    this.logger.info("[butterfly] Connected to Kafka");
  }

  async produce(producerRecord: ProducerRecord) {
    if (this.isReady) {
      try {
        this.logger.info(`[butterfly] Producing to kafka : ${JSON.stringify(producerRecord)}`)
        await this.producer.send({
          acks: producerRecord.acks,
          messages: producerRecord.messages,
          timeout: producerRecord.timeout,
          topic: producerRecord.topic
        })
      }
      catch(err) {
        this.logger.error(`[butterfly] Error in producing`);
        this.logger.error(err);
      }
    }
    else {
      this.logger.info("[butterfly] Produce called when producer is not ready yet")
    }
  }
}