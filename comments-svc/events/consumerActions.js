import CommentModel from "../model/commentSchema.js";

export async function createCommentForPost(data){
    try {
        console.log(data);
        return await CommentModel.create({postId:data._id})
    } catch (error) {
        console.log(error);
    }
}