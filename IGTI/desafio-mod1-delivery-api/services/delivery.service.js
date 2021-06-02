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

async function consultaPedido(id) {
    return await DeliveryRepository.consultaPedido(id);
}

async function consultaCliente(cliente) {
    const pedidosCliente = await DeliveryRepository.consultaCliente(cliente);
    let valorTotal = pedidosCliente.reduce((valorTotal, pedido) => valorTotal + pedido.valor, 0);
    /* === Mesma coisa que a linha de cima ===
    let valorTotal = 0;
    pedidosCliente.forEach(pedido => {
        valorTotal += pedido.valor;
    });
    */
    return valorTotal;
}

export default {
    criarPedido,
    atualizarPedido,
    atualizarEntrega,
    excluirPedido,
    consultaPedido,
    consultaCliente
}