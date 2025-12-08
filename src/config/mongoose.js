import mongoose from "mongoose";
import dotenv from "dotenv";
import { categorySchema } from "../features/product/category.schema.js";

dotenv.config();
const url="";

export const connectToDbUsingMongoose = async () => {
    try {
       await mongoose.connect(url,{useNewUrlParser : true, useUnifiedTopology: true}) // for stable connection
       console.log("Connected to DB using mongoose");
       addCategories();
    }
    catch(err) {
        console.log(err);
    }
}

async function addCategories() {
    const CategoryModel = mongoose.model('Category', categorySchema);
    const categories = await CategoryModel.find();
    if(!categories || categories.length == 0) {
        await CategoryModel.insertMany([{name:"Books"},{name:"Clothing"},{name:"Electronics"}]);
    }
    console.log("Categories are added");
}

