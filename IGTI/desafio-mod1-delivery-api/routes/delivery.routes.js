import express from "express";
import DeliveryController from "../controllers/delivery.controller.js";

const router = express.Router();

router.get("/cliente", DeliveryController.consultaCliente);
router.post("/", DeliveryController.criarPedido);
router.put("/:id", DeliveryController.atualizarPedido);
router.patch("/:id", DeliveryController.atualizarEntrega);
router.delete("/:id", DeliveryController.excluirPedido);
router.get("/:id", DeliveryController.consultaPedido);



router.use((err, req, res, next) => {
    logger.error(`${req.method} ${req.baseUrl} - ${err.message}`);
    res.status(400).send({ error: err.message });
});

export default router;