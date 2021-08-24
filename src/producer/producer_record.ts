import {Message} from "kafkajs";

export default class ProducerRecord {
  private _topic: string;
  private _messages: Message[];
  private _acks: number;
  private _timeout: number;

  constructor(topic: string, messages: Message[], acks?: number, timeout?: number) {
    this._topic = topic;
    this._messages = messages;
    this._acks = acks || -1;
    this._timeout = timeout || 5000;
  }

  get topic(): string {
    return this._topic;
  }

  get messages(): Message[] {
    return this._messages;
  }

  get acks(): number {
    return this._acks;
  }

  get timeout(): number {
    return this._timeout;
  }
}