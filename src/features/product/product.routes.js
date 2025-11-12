
import express from "express";
import ProductController from "./product.controller.js";
import { upload } from "../../middlewares/fileupload.middleware.js";
const router = express.Router();
const productController = new ProductController();

router.get("/",productController.getAllProducts);
router.post('/rate',productController.rateProduct);
router.get("/filter",productController.filterProduct);
router.get("/:id",productController.getOneProduct);
// process the image and upload it to the respective folder and attach the image to req.file 
router.post("/",
    upload.single('imageUrl'),
    productController.addProduct
);
// to upload multiple images use : upload.array('imageUrl', maxCount) , we can access it in req.files not req.file

export default router;