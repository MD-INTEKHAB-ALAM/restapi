import { getDB } from "../../config/mongodb.js";
// Repository == Database layer
// Model = How data must look like, validation can be done and then store in the db
export class UserRepository {

    constructor() {
        this.collection = "user";
    }

    async signUp(newUser) {
        try {
            const db = getDB();
            const collection = db.collection(this.collection);
            await collection.insertOne(newUser);
            return newUser;
        }
        catch(err) {
            console.log(err);
        }
    }
    async  findByEmail(email) {
        try {
            const db = getDB();
            const collection = db.collection(this.collection);
            const userExist = await collection.findOne({email});
            return userExist;
        }
        catch(err) {
            console.log("DB " , err);
        }
            
    }
}