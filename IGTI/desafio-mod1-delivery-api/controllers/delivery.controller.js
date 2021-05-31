import DeliveryServices from "../services/delivery.service.js";

function permitidos({cliente, produto, valor}) {
    return {cliente, produto, valor};
}

async function criarPedido(req, res, next) {
    try {
        let pedido = req.body;
        if (!pedido.cliente || !pedido.produto || pedido.valor == null) {
            throw new Error("Cliente, Produto e Valor são obrigatórios.");
        }
        pedido = await DeliveryServices.criarPedido(permitidos(pedido));
        res.send(pedido);
        logger.info(`POST /pedidos/criarPedido - ${JSON.stringify(pedido)}`);
    } catch(err) {
        next(err);
    }
}

export default {
    criarPedido
}