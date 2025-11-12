
export default class CartItemModel {

    constructor(userID,productID,quantity,id) {
        this.id = id;
        this.userID = userID;
        this.productID = productID;
        this.quantity = quantity;
    }

    static add(userID,productID,quantity) {
        const id = cartItems.length + 1;
        const cartItem = new CartItemModel(id,userID,productID,quantity);
        cartItems.push(cartItem);
    }

    static get(userID) {
        const filterCartItems = cartItems.filter((u) => u.userID === userID);
        return filterCartItems;
    }

    static delete(cartItemID,userID) {
        const cartItemIndex = cartItems.findIndex((cartItem) => cartItem.id == cartItemID);
        if(cartItemIndex==-1) return "Item not found";

        if(cartItems[cartItemIndex].userID==userID) {
            cartItems.splice(cartItemIndex,1);
        }

    }
}

let cartItems = [
    new CartItemModel(1,1,2,1),
]