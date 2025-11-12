
import express from "express";
import CartItemController from "./cartItems.controller.js";

const router = express.Router();
const cartItemController = new CartItemController();

router.post("/",cartItemController.add);
router.get("/",cartItemController.get);
router.delete("/:id",cartItemController.delete);

export default router;