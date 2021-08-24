export default interface ConsumerConfig {
  brokerList: string[];
  groupId: string;
  topics: string[];
  clientId: string;
}