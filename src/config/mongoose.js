import mongoose from "mongoose";

const url="";

export const connectToDbUsingMongoose = () => {
    mongoose.connect(url,{useNewUrlParser : true, useUnifiedTopology: true})
    .then(() => console.log("Connected using mongoose"))
    .catch(err => console.log(err));
}