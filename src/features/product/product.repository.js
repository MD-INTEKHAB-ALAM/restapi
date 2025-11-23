import { ObjectId } from "mongodb";
import { getDB } from "../../config/mongodb.js";

export default class ProductRepository {
    constructor() {
        this.collection = "products";
    }
    async add(product) {
        try {
            const db = getDB();
            const collection = db.collection(this.collection);
            await collection.insertOne(product);
            return product;
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
        const db = getDB();
        const collection = db.collection(this.collection);
        //1. Find the Product
        const product = await collection.findOne({_id:new ObjectId(productID)});

        if(!product) {
            return false;
        }
        //2. Find the user in Product
        const user = product.ratings.find(u => u.userID === userID);


    }
}