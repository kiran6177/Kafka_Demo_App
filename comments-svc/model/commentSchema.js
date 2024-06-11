import mongoose from "mongoose";

const commentSchema = new mongoose.Schema({
    comments:{
        type:Array
    },
    postId:{
        type:String
    }
})

export default mongoose.model('comments',commentSchema)