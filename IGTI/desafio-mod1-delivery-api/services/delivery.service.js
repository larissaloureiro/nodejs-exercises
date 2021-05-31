import DeliveryRepository from "../repositories/delivery.repository.js";

async function criarPedido(pedido) {
    return await DeliveryRepository.criarPedido(pedido);
}

export default {
    criarPedido
}