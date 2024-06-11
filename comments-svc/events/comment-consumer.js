import { createCommentForPost } from "./consumerActions.js";

export class CommentConsumer{
    constructor(){
        //write usecases for consumers actions
    }
    async consume(type,data){
        try {
            switch(type){
                case 'PostCreated' :
                    return await createCommentForPost(data)
            }
        } catch (error) {
            console.log(error);
        }
    }
}