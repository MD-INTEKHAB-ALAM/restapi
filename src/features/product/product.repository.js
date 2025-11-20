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
}