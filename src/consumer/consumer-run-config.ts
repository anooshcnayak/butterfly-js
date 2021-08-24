import {Batch, KafkaMessage, Offsets, OffsetsByTopicPartition} from "kafkajs";

export type ConsumerRunConfig = {
  autoCommit?: boolean
  autoCommitInterval?: number | null
  autoCommitThreshold?: number | null
  eachBatchAutoResolve?: boolean
  partitionsConsumedConcurrently?: number
  eachBatch?: (payload: EachBatchPayload) => Promise<void>
  eachMessage?: (payload: EachMessagePayload) => Promise<void>
}

export interface EachMessagePayload {
  topic: string
  partition: number
  message: KafkaMessage
}

export interface EachBatchPayload {
  batch: Batch
  resolveOffset(offset: string): void
  heartbeat(): Promise<void>
  commitOffsetsIfNecessary(offsets?: Offsets): Promise<void>
  uncommittedOffsets(): OffsetsByTopicPartition
  isRunning(): boolean
  isStale(): boolean
}