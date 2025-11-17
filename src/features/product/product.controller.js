import ProductModel from "./product.model.js"

export default class ProductController {
    
    getAllProducts(req,res) {
        const products = ProductModel.GetAll();
        res.status(202).send(products);
    }

    addProduct(req,res){
        const {name,price,sizes} = req.body;
        const newProduct = {
            name,
            price:parseFloat(price),
            sizes : sizes.split(','),
            imagerUrl : req.file.filename,
        }
        const createdRecord = ProductModel.add(newProduct);
        res.status(201).send(createdRecord);
    }

    getOneProduct(req,res) {
        const id = req.params.id;
        const product = ProductModel.getOne(id);
        if(!product) {
            return res.status(404).send("Not Found");
        }
        else res.status(201).send(product);
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