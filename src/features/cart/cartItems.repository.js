import { ObjectId } from "mongodb";
import { getDB } from "../../config/mongodb.js";

export class CartItemRepository {

    constructor() {
        this.collection = "cartItems";
    }

    async add(productID,userID,quantity) {
        const db = getDB();
        const collection = db.collection(this.collection);

        try {
            await collection.updateOne(
            {productID:new ObjectId(productID),userID: new ObjectId(userID)},
            { $inc :{quantity:quantity}},
            {upsert:true}
            );
            return {productID,userID,quantity};
        }
        catch(err) {
            console.log(err);
        }
    }

    async get(userID) {
        try {
            const db = getDB();
            const collection = db.collection(this.collection);
            const filterCartItems = await collection.find({userID}).toArray();
            return filterCartItems;
        }
        catch(err) {
            throw new Error("Cannot fetch data from db");
        }
    }

    
    async delete(cartItemID,userID) {
        try {
            const db = getDB();
            const collection = db.collection(this.collection);

            await collection.deleteOne({userID : new ObjectId(userID),cartItemID : new ObjectId(cartItemID)});
        }
        catch(err) {
            throw new Error("Cannot delete from db");
        }

    }
}