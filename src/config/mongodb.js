import { MongoClient } from "mongodb";

const url = "mongodb://localhost:27017/ecomdb"; // local url database

let client;
const connectToMongoDB = async () => {
    await MongoClient.connect(url) // returns the clientInstance
    .then(clientInstance => {
        client = clientInstance;
        console.log("Mongodb is connected");
    })
    .catch(error =>{
        console.log(error);
    })
}

export const getDB = () => {
    return client.db();
}

export default connectToMongoDB;