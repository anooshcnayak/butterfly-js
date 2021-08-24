export default class ProducerConfig {

  private readonly _brokerList: string[];
  private readonly _clientId: string;
  private readonly _acks: string;
  private readonly _logger: any;

  constructor(brokerList: string[], clientId: string, acks: string, logger: any) {
    this._brokerList = brokerList;
    this._clientId = clientId;
    this._acks = acks;
    this._logger = logger;
  }

  get brokerList(): string[] {
    return this._brokerList;
  }

  get clientId(): string {
    return this._clientId;
  }

  get acks(): string {
    return this._acks;
  }

  get logger(): any {
    return this._logger;
  }
}