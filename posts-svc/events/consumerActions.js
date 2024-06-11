//mockup of usecases and repositories
import CommentModel from '../model/commentSchema.js'

export async function addComments(data){
    try {
        const isCommentData = await CommentModel.findOne({postId:data.postId});
        if(isCommentData){
            return await CommentModel.findOneAndUpdate({postId:data.postId},{$addToSet:{comments:{$each:data.comments}}})
        }else{
            return await CommentModel.create({postId:data.postId,comments:data.comments})
        }
    } catch (error) {
        console.log(error);
    }
}