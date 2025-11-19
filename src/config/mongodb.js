import { MongoClient } from "mongodb";

const url = "mongodb://localhost:27017/ecomdb"; // local url database

const connectToMongoDB = async () => {
    await MongoClient.connect(url)
    .then(client => {
        console.log("Mongodb is connected");
    })
    .catch(error =>{
        console.log(error);
    })
}

export default connectToMongoDB;