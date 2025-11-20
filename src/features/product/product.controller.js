import ProductModel from "./product.model.js"
import ProductRepository from "./product.repository.js";

export default class ProductController {

    constructor() {
        this.productRepository = new ProductRepository();
    }
    
    async getAllProducts(req,res) {
        const products = await this.productRepository.getAll();
        if(!products) {
            return res.status(400).send("No Product Found");
        }
        res.status(201).send(products);
    }

    async addProduct(req,res){
        const {name,price,sizes} = req.body;
        const newProduct = new ProductModel(name,null,parseFloat(price),req.file.filename,null,sizes.split(','));
        try {
            const product = await this.productRepository.add(newProduct);
            if(!product) {
                return res.status(400).send("Something went Wrong while adding the Product");
            }
            res.status(201).send(product);
        }
        catch(err) {
            res.status(400).send("Error Occured while adding new Product");
        }
    }

    async getOneProduct(req,res) {
        const id = req.params.id;
        try {
            const product = await this.productRepository.getOne(id);
            if(!product) {
                return res.status(404).send("Not Found");
            }
            res.status(200).send(product);
        }
        catch(err) {
            return res.status(400).send("Couldn't get the Product");
        }
    }

    filterProduct(req,res) {
        const {minPrice,maxPrice,category} = req.query;
        const filterProducts = ProductModel.filter(minPrice,maxPrice,category);
        res.status(200).send(filterProducts);
    }

    rateProduct(req,res) {
        let {userID,productID,rating} = req.query;
        userID = parseInt(userID);
        productID = parseInt(productID);
        rating = parseInt(rating);
        try {
            ProductModel.rate(userID,productID,rating);
        }
        catch(err) {
            return res.status(400).send(err.message);
        }
        if(error) {
            res.status(400).send(error);
        }
        else {
            res.status(200).send("Rating Added Successfully")
        }

    }
}