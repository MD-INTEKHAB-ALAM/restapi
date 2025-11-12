import UserModel from "./user.model.js";
import jwt from "jsonwebtoken";

export class UserController {

    signUp(req,res) {
        const {name,email,password,type} = req.body;
        const newUser = UserModel.signUp(name,email,password,type);
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