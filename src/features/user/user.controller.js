import UserModel from "./user.model.js";
import jwt from "jsonwebtoken";
import { UserRepository } from "./user.repository.js";

export class UserController {

    constructor() {
        this.userRepository = new UserRepository();
    }

    async signUp(req,res) {
        const {name,email,password,type} = req.body;
        const user = new UserModel(name,email,password,type);
        try {
            await this.userRepository.signUp(user);
        }
        catch(err){

        }
        res.status(201).send(newUser);
    }

    signIn(req,res) {
        const result = UserModel.signIn(req.body.email,req.body.password);
        if(!result) {
            return res.status(401).send("Incorrect credentials");
        }
        else {
            //1. Create a token
            const token = jwt.sign({userID:result.id,email:result.email},"DdjXhZDtlunzLWjNF2EnXTvJi3w2lWfu",{expiresIn:"1h"});
            //2. send Token
            res.status(200).send(token);
        }
    }
}