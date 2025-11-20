import UserModel from "../user/user.model.js";

export default class ProductModel{
    constructor(name, desc, price, imageUrl, category, sizes,id){
        this.name=name;
        this.desc=desc;
        this.price=price;
        this.imageUrl=imageUrl;
        this.category=category;
        this.sizes=sizes;
        this.id=id;
    }
    
    static filter(minPrice,maxPrice,category) {
      const filterProduct = products.filter((product)=> (
        (!minPrice || product.price >= minPrice) &&
        (!maxPrice || product.price<=maxPrice) &&
        (!category || product.category==category)
      ))
      return filterProduct;
    }

    static rate(userID,productID,rating) {
      //1. If a user is valid 
      const user = UserModel.getAll().find((u) => u.id === userID);
      if(!user) throw new Error("User not Found");
      //2. If product exist
      const product = products.find((p) => p.id === productID);
      if(!product) throw new Error("Product Not Found");

      // If product donot have a rating
      if(!product.ratings) {
        product.ratings = [];
        product.ratings.push({userID,rating});
      }
      else {
        // If user Already Exist amd want to update the rating
        const existingRatingIndex = product.ratings.findIndex((u) => u.userID === userID);
        if(existingRatingIndex>=0) {
          product.ratings[existingRatingIndex] = {userID,rating};
        }
        else {
          // user doesn't exist
          product.ratings.push({userID,rating});
        }
      }
    }
} 

var products = [
    new ProductModel(
      1,
      'Product 1',
      'Description for Product 1',
      19.99,
      'https://m.media-amazon.com/images/I/51-nXsSRfZL._SX328_BO1,204,203,200_.jpg',
      'Cateogory1'
    ),
    new ProductModel(
      2,
      'Product 2',
      'Description for Product 2',
      29.99,
      'https://m.media-amazon.com/images/I/51xwGSNX-EL._SX356_BO1,204,203,200_.jpg',
      'Cateogory2',
      ['M', 'XL']
    ),
    new ProductModel(
      3,
      'Product 3',
      'Description for Product 3',
      39.99,
      'https://m.media-amazon.com/images/I/31PBdo581fL._SX317_BO1,204,203,200_.jpg',
      'Cateogory3',
      ['M', 'XL','S']
    )];