import express from 'express';
import { KafkaService } from './events/client.js';
import { connect } from './model/config.js';
import CommentModel from './model/commentSchema.js';

const app = express();

connect()
const kafkaClient = new KafkaService()

app.use(express.urlencoded({extended:true}));
app.use(express.json());

app.post('/comment/:postid',async(req,res)=>{
    const { postid } = req.params;
    const { comment } = req.body;
    const commentAdd = await CommentModel.findOneAndUpdate({postId:postid},{$push:{comments:comment}},{new:true})
    console.log(commentAdd);
    if(commentAdd){
        kafkaClient.produceMessage('comment-topic',{
                type:'CommentAdded',
                data:commentAdd
            })
    }
    res.json({message:'Comment added successfully!'})
})

kafkaClient.consumeMessage('posts-topic')

app.listen(3006,()=>{
    console.log('COMMENTS running on 3006');
})