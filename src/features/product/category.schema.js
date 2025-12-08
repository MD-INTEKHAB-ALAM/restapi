import mongoose, {Schema} from "mongoose";

export const categorySchema = new Schema({
    name: String,
    products: [
        {
            type:mongoose.Schema.Types.ObjectId,
            ref: 'Product'
        }
    ]
})