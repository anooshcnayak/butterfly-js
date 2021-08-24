export default class ConsumerConfig {

  private readonly _brokerList: string[];
  private readonly _groupId: string;
  private readonly _logger: any;
  private readonly _topics: string[];

  constructor(brokerList: string[], groupId: string, topics: string[], logger: any) {
    this._brokerList = brokerList;
    this._groupId = groupId;
    this._topics = topics;
    this._logger = logger;
  }

  get brokerList(): string[] {
    return this._brokerList;
  }

  get groupId(): string {
    return this._groupId;
  }

  get logger(): any {
    return this._logger;
  }

  get topics(): string[] {
    return this._topics;
  }
}