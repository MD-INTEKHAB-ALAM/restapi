import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();
const url="";

export const connectToDbUsingMongoose = async () => {
    try {
       await mongoose.connect(url,{useNewUrlParser : true, useUnifiedTopology: true}) // for stable connection
       console.log("Connected to DB using mongoose");
    }
    catch(err) {
        console.log(err);
    }
}

