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
    const pedidosEntregues = await DeliveryRepository.pedidosEntregues();
    const pedidosCliente = pedidosEntregues.filter(pedido => pedido.cliente === cliente);
    let valorTotal = pedidosCliente.reduce((valorTotal, pedido) => valorTotal + pedido.valor, 0);
    /* === Mesma coisa que a linha de cima ===
    let valorTotal = 0;
    pedidosCliente.forEach(pedido => {
        valorTotal += pedido.valor;
    });
    */
    return valorTotal;
}

async function consultaProduto(produto) {
    const pedidosEntregues = await DeliveryRepository.pedidosEntregues();
    const pedidosProduto = pedidosEntregues.filter(pedido => pedido.produto === produto)
    let valorTotal = pedidosProduto.reduce((valorTotal, pedido) => valorTotal + pedido.valor, 0);
    return valorTotal;
}

async function maisVendidos() {
    const pedidosEntregues = await DeliveryRepository.pedidosEntregues();
    let listaProdutos = [];
    pedidosEntregues.forEach(pedido => {
        const index = listaProdutos.findIndex(produto => produto.nome === pedido.produto);
        if (index === -1) {
            let item = { nome: pedido.produto, quantidade: 1};
            listaProdutos.push(item);
        } else {
            listaProdutos[index].quantidade++;
        }
    });
    listaProdutos.sort((a, b) => b.quantidade - a.quantidade);
    listaProdutos = listaProdutos.map(produto => {
        return produto.nome + " - " + produto.quantidade;
    });
    return listaProdutos;
}

export default {
    criarPedido,
    atualizarPedido,
    atualizarEntrega,
    excluirPedido,
    consultaPedido,
    consultaCliente,
    consultaProduto,
    maisVendidos
}