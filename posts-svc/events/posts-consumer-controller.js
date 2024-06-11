import { addComments } from "./consumerActions.js";

export class PostsConsumer{
    constructor(){
        //write usecases for managing posts actions
    }

    async consume(type,data){
        try {
            switch (type) {
                case 'CommentAdded':
                    return await addComments(data)  
                default:
                    console.log("Invalid Type");
                    break;
            }
        } catch (error) {
            console.log(error);
        }
    }
}