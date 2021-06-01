import DeliveryRepository from "../repositories/delivery.repository.js";

async function criarPedido(pedido) {
    return await DeliveryRepository.criarPedido(pedido);
}

async function atualizarPedido(id, pedido) {
    return await DeliveryRepository.atualizarPedido(id, pedido);
}

async function atualizarEntrega(id, entregue) {
    return await DeliveryRepository.atualizarEntrega(id, entregue);
}

async function excluirPedido(id) {
    return await DeliveryRepository.excluirPedido(id);
}

export default {
    criarPedido,
    atualizarPedido,
    atualizarEntrega,
    excluirPedido
}