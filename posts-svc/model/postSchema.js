import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
    title:{
        type:String
    },
    desc:{
        type:String
    }
})

export default mongoose.model('posts',postSchema)