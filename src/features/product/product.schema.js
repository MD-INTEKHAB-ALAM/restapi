import mongoose , {Schema} from "mongoose";

export const productSchema = new Schema({
    name: String,
    desc : String,
    price : Number,
    imagerUrl : Buffer,
    category : String,
    inStock : Number,
    sizes : Array,
    reviews: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref : 'Review',
        }
    ],
    categories: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref : 'Category',
        }
    ]
})