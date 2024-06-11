import express from 'express';
import { KafkaService } from './events/client.js'
import { connect } from './model/config.js';
import PostModel from './model/postSchema.js'
import CommentModel from './model/commentSchema.js';

const app = express();

connect()
const kafkaClient = new KafkaService();

app.use(express.urlencoded({extended:true}));
app.use(express.json());

app.post('/post',async(req,res)=>{
    const { title,desc } = req.body;
    const addPost = await PostModel.create({title,desc});

    kafkaClient.produceMessage('posts-topic',{
        type: 'PostCreated',
        data: addPost
    })
    res.json(addPost)
})

app.get('/posts',async (req,res)=>{
    const posts = await PostModel.find().lean()
    const dataResult = []
        for(let post of posts){
            const commentDataOfPost = await CommentModel.findOne({postId:post._id})
            dataResult.push({
                ...post,
                comments:commentDataOfPost.comments
            })
        }
    res.json(dataResult)
})

kafkaClient.consumeMessage('comment-topic')

app.listen(3005,()=>{
    console.log('POSTS running on 3005');
})