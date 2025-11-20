import { getDB } from "../../config/mongodb.js";
// Repository == Database layer
// Model = How data must look like, validation can be done and then store in the db
export class UserRepository {

    async signUp(newUser) {
        try {
            const db = getDB();
            const collection = db.collection("user");
            await collection.insertOne(newUser);
            return newUser;
        }
        catch(err) {
            console.log(err);
        }
    }
    async  signIn(name,password) {
        try {
            const db = getDB();
            const collection = db.collection("user");
            const userExist = await collection.findOne({name});
            return userExist;
        }
        catch(err) {
            console.log("DB " , err);
        }
            
    }
}