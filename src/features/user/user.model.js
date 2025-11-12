
export default class UserModel {
    
    constructor(id,email,name,password,type) {
        this.id = id;
        this.email = email; 
        this.name = name;
        this.password = password;
        this.type = type;
    }

    static signUp(name,email,password,type) {
        const id = users.length + 1;
        const newUser = new UserModel(
            id,
            name,
            email,
            password,
            type,
        )
        users.push(newUser);
        return newUser;
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