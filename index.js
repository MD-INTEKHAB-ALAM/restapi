import './env.js';
import express from "express";
import ProductRouter from "./src/features/product/product.routes.js";
import UserRouter from "./src/features/user/user.routes.js";
import CartRouter from "./src/features/cart/cartItems.routes.js";
import cors from "cors";
import jwtAuth from "./src/middlewares/jwt.middleware.js";
import connectToMongoDB from "./src/config/mongodb.js";
const server = express();

server.use(cors());
server.use(express.json());
server.use("/api/users",UserRouter);
server.use("/api/cartItems",CartRouter);
server.use("/api/products",jwtAuth,ProductRouter);

//Error handler middleware
server.use((err,req,res,next)=> {
    res.status(500).send("Something went wrong");
})

server.get('/',(req,res)=> res.send("Welcome to Express!"));

server.listen(3200,()=>  {
    console.log("Server is Running")
    // as soon as our server is started we need to connect to db
    connectToMongoDB();
});


