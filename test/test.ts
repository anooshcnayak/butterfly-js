import {Consumer} from '../src/index'

const consumer = new Consumer.Consumer({
  topics: ["test-butterfly"],
  clientId: "test_butterfly",
  brokerList: ["10.109.26.200:9092"],
  groupId:"test_butterfly"
})

const run = async () => {
  // Producing

  // Consuming
  await consumer.connect()
  await consumer.consume({
    eachMessage: async payload => {
      console.log(payload.partition, payload.topic)
      console.log(payload.message && payload.message.value && payload.message.value.toString())
    },
  })
}

async function consumeMessage(): Promise<void> {

  return;
}

run().catch(console.error)