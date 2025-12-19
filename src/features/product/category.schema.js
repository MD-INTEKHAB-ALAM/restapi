import mongoose, {Schema} from "mongoose";

export const categorySchema = new Schema({
    products: [
        {
            type:mongoose.Schema.Types.ObjectId,
            ref: 'Product'
        }
    ]
})