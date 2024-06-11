import mongoose from "mongoose";

export const connect = ()=>{
    mongoose.connect('mongodb://localhost:27017/kafka-comments-db');

    mongoose.connection.on('connected',()=>{
        console.log('Connected');
    })

    mongoose.connection.on('error',()=>{
        console.log('Connection error');
    })

    mongoose.connection.on('disconnected',()=>{
        console.log('Disconnected');
    })
}