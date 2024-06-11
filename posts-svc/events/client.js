import { Kafka } from 'kafkajs';
import { PostsConsumer } from './posts-consumer-controller.js';

export class KafkaService{
    constructor(){
        this.kafka = new Kafka({
            clientId:'test-kafka',
            brokers : ['127.0.0.1:9092']
        })
        this.producer = this.kafka.producer()
        this.consumer = this.kafka.consumer({groupId:'post-svc'})
        this.postsConsumer = new PostsConsumer()
    }

    async produceMessage(topic,message){
        try {
            await this.producer.connect()
            await this.producer.send({
                topic:topic,
                messages:[{
                    value: JSON.stringify(message)
                }]
            })
            console.log("Message Send!!");
        } catch (error) {
            console.log(error);
        }finally{
            await this.producer.disconnect()
        }
    }

    async consumeMessage(topic){
        try {
            await this.consumer.subscribe({topic:topic,fromBeginning:true});
            await this.consumer.run({
                eachMessage:async ({topic,partition,message})=>{
                    console.log("TOPIC : ",topic);
                    console.log("PARTITION : ",partition);
                    console.log("MESSAGE : ",message?.value?.toString());
                    const messageObj = JSON.parse(message?.value?.toString())
                    const { type , data } = messageObj;
                    await this.postsConsumer.consume(type,data);
                }
            })
        } catch (error) {
            console.log(error);
        }
    }
}