import CartItemModel from "./cartItems.model.js";

export default class CartItemController {
    add(req,res) {
        const {productID, quantity} = req.query;
        const userID = req.userID;
        CartItemModel.add(productID,userID,quantity);
        res.status(201).send("CartItems Added");
    }

    get(req,res) {
        const result = CartItemModel.get(req,userID);
        res.status(201).send(result);

    }

    delete(req,res) {
        const error = CartItemModel.delete(req.params.cartItemID,req.userID);
        if(!error) {
            return res.status().send("Successfully deleted");
        }
        else {
            return res.status(404).send(error);
        }
    }
}