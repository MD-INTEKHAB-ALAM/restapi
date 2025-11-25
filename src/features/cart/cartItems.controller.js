import CartItemModel from "./cartItems.model.js";
import { CartItemRepository } from "./cartItems.repository.js";
export default class CartItemController {

    constructor() {
        this.cartItemRepository = new CartItemRepository();
    }

    async add(req,res) {
        const {productID, quantity} = req.body;
        const userID = req.userID;
        const cart = await this.cartItemRepository.add(productID,userID,quantity);
        if(cart) return res.status(201).send("CartItems Added");
        return res.status(400).send("Something went wrong in cartItems");
    }

    async get(req,res) {
        try {
            const result = await this.cartItemRepository.get(req.userID);
            res.status(201).send(result);
        }
        catch(err) {
            res.status(404).send("Error Occured");
        }

    }

    async delete(req,res) {
        try {
            const error = await this.cartItemRepository.delete(req.params.cartItemID,req.body.userID);
            return res.status().send(error);
        }
        catch(err) {
            res.status(400).send(err);
        }
    }
}