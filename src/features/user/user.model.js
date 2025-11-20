import { getDB } from "../../config/mongodb.js";

export default class UserModel {
    
    constructor(email,name,password,type) {
        this.email = email; 
        this.name = name;
        this.password = password;
        this.type = type;
    }

    static async signUp(name,email,password,type) {
        try{
            //1. Get the db
            const db = getDB();
            //2. Get the collection
            const collection = db.collection("user");
            const newUser = new UserModel(
                name,
                email,
                password,
                type,
            )
            //3. insert the detail in mongodb
            await collection.insertOne(newUser);
            return newUser;
        }
        catch(error) {
            return error;
        }
    }

    static signIn(email,password) {
        const userExist = users.find((user) => user.email == email && user.password == password);
        return userExist;
    }

    static getAll() {
        return users;
    }
}

let users  = [
    {   
        id:1,
        name: "Seller user",
        email: "seller@gmail.com",
        password: "Seller1",
        type: "seller"
    },
    {
        id:2,
        name:"Customer",
        email:"customer@gmail.com",
        password:"cutomer1",
        type:"customer"
    }
]