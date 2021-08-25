export default class ProducerConfig {
    private readonly _brokerList;
    private readonly _clientId;
    private readonly _acks;
    private readonly _logger;
    constructor(brokerList: string[], clientId: string, acks: string, logger: any);
    get brokerList(): string[];
    get clientId(): string;
    get acks(): string;
    get logger(): any;
}
