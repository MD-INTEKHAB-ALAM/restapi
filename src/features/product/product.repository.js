import { ObjectId } from "mongodb";
import { getDB } from "../../config/mongodb.js";
import mongoose from "mongoose";
import { productSchema } from "./product.schema.js";
import { reviewSchema } from "./review.schema.js";
import { categorySchema } from "./category.schema.js";

const ProductModel = mongoose.model('Product',productSchema);
const ReveiwModel = mongoose.model('Reveiw',reviewSchema);
const CategoryModel = mongoose.model('Category',categorySchema);
export default class ProductRepository {
    constructor() {
        this.collection = "products";
    }

    async add(productData) {
        try {
           // 1. Add the product
           const newProduct = new ProductModel(productData);
           const savedProduct = await newProduct.save();

           // 2. Update categoires.
           await CategoryModel.updateMany(
                {_id: {$in : productData.categories}},
                {
                    $push: {products: new ObjectId(savedProduct._id)}
                }
            )
        }
        catch(err) {
            return new Error(err);
        }
    }

    async getOne(id) {
        try {
            const db = getDB();
            const collection = db.collection(this.collection);
            const product = await collection.findOne({_id:new ObjectId(id)});
            return product;
        }
        catch(err) {
            return new Error(err);
        }
    }

    async getAll(){
        try {
            const db = getDB();
            const collection = db.collection(this.collection);
            const products = await collection.find({}).toArray();
            return products
        }
        catch(err) {
            return new Error(err);
        }
    }
    
    async filter(minPrice, maxPrice, category) {
        try {
            const db = getDB();
            const collection = db.collection(this.collection);
            if (minPrice !== undefined) minPrice = Number(minPrice);
            if (maxPrice !== undefined) maxPrice = Number(maxPrice);

            let filterExpression = {}; 

            if (minPrice !== undefined) {
                filterExpression.price = { $gte: minPrice };
            }

            if (maxPrice !== undefined) {
                filterExpression.price = {
                    ...(filterExpression.price || {}),
                    $lte: maxPrice
                };
            }

            if (category !== undefined) {
                filterExpression.category = category;  // allows null
            }
            const filteredProducts = await collection.find(filterExpression).toArray();
            return filteredProducts;

        } catch (err) {
            console.log(err);
        }
    }

    async rate(userID,productID,rating) {
        try {
            // 1. Check if product exists
            const productToUpdate = await ProductModel.findById(productID);
            if(!productToUpdate) {
                throw new Error("Product not found");
            }
            // 2. Get the Existing review
            const userReview = await ReveiwModel.findOne({product: new ObjectId(productID),user : new ObjectId(userID)});
            if(userReview) {
                userReview.rating = rating;
                await userReview.save();
            }
            else {
                const newReview = new ReveiwModel({
                    product: new ObjectId(productID),
                    user: new ObjectId(userID),
                    rating: rating
                })
                await newReview.save();
            }
        }
        catch(err) {
            throw new Error("Something went wrong in review model");
        }
    }
}