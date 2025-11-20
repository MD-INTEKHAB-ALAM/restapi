
import express from "express";
import ProductController from "./product.controller.js";
import { upload } from "../../middlewares/fileupload.middleware.js";
const router = express.Router();
const productController = new ProductController();

router.get("/",(req,res) => {
    productController.getAllProducts(req,res)
});

router.post('/rate',(req,res) => {
    productController.rateProduct(req,res)
});

router.get("/filter",(req,res) => {
    productController.filterProduct(req,res)
});

router.get("/:id",(req,res) => {
    productController.getOneProduct(req,res)
});
// process the image and upload it to the respective folder and attach the image to req.file 
router.post("/",
    upload.single('imageUrl'),
    (req,res) => {
        productController.addProduct(req,res);
    }
);
// to upload multiple images use : upload.array('imageUrl', maxCount) , we can access it in req.files not req.file

export default router;