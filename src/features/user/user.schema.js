import mongoose, {Schema} from "mongoose";

const User = new Schema(
    {name:String,
    email:String,
    password:String,
    type : {type:String,enum : ["Customer,Seller"]}
});

