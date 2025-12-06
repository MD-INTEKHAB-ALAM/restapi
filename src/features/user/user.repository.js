import mongoose from "mongoose";
import { userSchema } from "./user.schema.js";

// creating model from schema.

const UserModel = mongoose.model('User',userSchema);

export default class UserRepository {

    async signUp(user) {
        try {
            const newUser = new UserModel(user);
            await newUser.save();
        }
        catch(err) {
            throw new Error("Error Occured while signup")
        }
    }

    async signIn(email,password) {
        try {
            return await UserModel.findOne({email,password});
        }
        catch(err) {
            throw new Error("Error Occured while singin")
        }
    }

    async findByEmail(email) {
        try {
            return await UserModel.findOne({email});
        }
        catch(err) {
            throw new Error("Error Occured while finding email");
        }
    }

    async resetPassword(userID,newPassword) {
        try {
            let user = await UserModel.findById(userID);
            if(user) {
                user.password = newPassword;
                user.save();
            }
            else {
                throw new Error("User Not Found");
            }
        }
        catch(err) {
            
        }
    }
}