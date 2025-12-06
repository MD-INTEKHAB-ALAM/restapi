import mongoose, {Schema} from "mongoose";

export const userSchema = new Schema({
    name: String,
    email: {type: String,unique: true},
    password: String,
    type : {type: String, enum : ["Customer,Seller"]}
});

