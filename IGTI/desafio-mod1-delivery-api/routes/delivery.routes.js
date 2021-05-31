import express from "express";
import DeliveryController from "../controllers/delivery.controller.js";

const router = express.Router()

router.post("/", DeliveryController.criarPedido);


router.use((err, req, res, next) => {
    logger.error(`${req.method} ${req.baseUrl} - ${err.message}`);
    res.status(400).send({ error: err.message });
});

export default router;