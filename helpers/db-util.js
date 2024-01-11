import { MongoClient } from "mongodb";

export async function connectDatabase(){
    const connectionUrl = `mongodb+srv://${process.env.mongodb_username}:${process.env.mongodb_password}@${process.env.mongodb_cluster}.0giypy6.mongodb.net/${process.env.mongodb_database}?retryWrites=true&w=majority`
    const client = await MongoClient.connect(connectionUrl);
    return client;
}