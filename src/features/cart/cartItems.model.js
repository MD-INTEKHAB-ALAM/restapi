
export default class CartItemModel {

    constructor(userID,productID,quantity,id) {
        this.id = id;
        this.userID = userID;
        this.productID = productID;
        this.quantity = quantity;
    }

}

let cartItems = [
    new CartItemModel(1,1,2,1),
]