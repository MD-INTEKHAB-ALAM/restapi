import mongoose , {Schema} from "mongoose";

export const productSchema = new Schema({
    name: String,
    desc : String,
    price : Number,
    imagerUrl : Buffer,
    category : String,
    inStock : Number,
    sizes : Array,
})