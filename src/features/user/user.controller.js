import UserModel from "./user.model.js";
import jwt from "jsonwebtoken";
import { UserRepository } from "./user.repository.js";
import bcrypt from "bcrypt";
export class UserController {

    constructor() {
        this.userRepository = new UserRepository();
    }

    async signUp(req,res) {
        const {name,email,password,type} = req.body;
        const hashPassword = await bcrypt.hash(password,12);// salt for uniqueness of each password if passwords of two user is duplicate, Range must be 10 - 20 and higher range higher computation time
        const user = new UserModel(email,name,hashPassword,type);
        try {
            await this.userRepository.signUp(user);
        }
        catch(err){
            res.status(400).send(err);
        }
        res.status(201).send(user);
    }

    async signIn(req,res) {
        try {
            const user = await this.userRepository.findByEmail(req.body.email);
            if(!user) {
                res.status(400).send("Incorrect credentials");
            }np
            const result = await bcrypt.compare(req.body.password,user.password);
            //returns true or false
            if(result) {
                 //1. Create a token
                const token = jwt.sign({userID:result.id,email:result.email},process.env.JWT_SECRET,{expiresIn:"1h"});
                //2. send Token
                res.status(200).send(token);
            }
            else{
                return res.status(401).send("Incorrect credentials");
            }

        }
        catch(err) {
            console.log("Controller Error");
        }
        
        
    }
}