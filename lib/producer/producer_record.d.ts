import { Message } from "kafkajs";
export default class ProducerRecord {
    private _topic;
    private _messages;
    private _acks;
    private _timeout;
    constructor(topic: string, messages: Message[], acks?: number, timeout?: number);
    get topic(): string;
    get messages(): Message[];
    get acks(): number;
    get timeout(): number;
}
