import DeliveryServices from "../services/delivery.service.js";

function permitidosCriar({cliente, produto, valor}) {
    return {cliente, produto, valor};
}
function permitidosAtualizar({cliente, produto, valor, entregue}) {
    return {cliente, produto, valor, entregue};
}

async function criarPedido(req, res, next) {
    try {
        let pedido = req.body;
        if (!pedido.cliente || !pedido.produto || pedido.valor == null) {
            throw new Error("Cliente, Produto e Valor são obrigatórios.");
        }
        res.send(await DeliveryServices.criarPedido(permitidosCriar(pedido)));
        logger.info(`POST /pedidos - ${JSON.stringify(pedido)}`);
    } catch(err) {
        next(err);
    }
}

async function atualizarPedido(req, res, next) {
    try {
        let pedido = req.body;
        const id = parseInt(req.params.id, 10);
        if (!id || !pedido.cliente || !pedido.produto || pedido.valor == null) {
            throw new Error("Id, Cliente, Produto e Valor são obrigatórios.");
        }
        pedido = await DeliveryServices.atualizarPedido(id, permitidosAtualizar(pedido));
        res.send(pedido);
        logger.info(`PUT /pedidos/:id - ${JSON.stringify(pedido)}`);
    } catch (err) {
        next(err);
    }
}

async function atualizarEntrega(req, res, next) {
    try {
        let pedido = req.body;
        const id = parseInt(req.params.id, 10);

        if (!id || typeof pedido.entregue !== "boolean") {
            throw new Error("Id e Entregue são obrigatórios.");
        }
        pedido = await DeliveryServices.atualizarEntrega(id, pedido.entregue);
        res.send(pedido);

        logger.info(`PATCH /pedidos/:id - ${JSON.stringify(pedido)}`);
    } catch (err) {
        next(err);
    }
}

async function excluirPedido(req, res, next) {
    try {
        const id = parseInt(req.params.id, 10);
        await DeliveryServices.excluirPedido(id);
        res.end();
        logger.info(`DELETE /pedidos/:id - ${req.params.id}`);
    } catch (err) {
        next(err);
    }
}

async function consultaPedido(req, res, next) {
    try {
        const id = parseInt(req.params.id, 10);
        res.send(await DeliveryServices.consultaPedido(id));
        logger.info("GET /pedidos/:id");
    } catch (err) {
        next(err);
    }
}

async function consultaCliente(req, res, next) {
    try {
        const cliente = req.query.nome;
        let valorTotal = (await DeliveryServices.consultaCliente(cliente)).toFixed(2);
        res.send(`Valor total do cliente ${cliente} é R$ ${valorTotal}`);
        logger.info("GET /pedidos/cliente");
    } catch (err) {
        next(err);
    }
}



export default {
    criarPedido,
    atualizarPedido,
    atualizarEntrega,
    excluirPedido,
    consultaPedido,
    consultaCliente
}