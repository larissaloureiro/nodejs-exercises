import {promises as fs} from "fs";

const {readFile, writeFile} = fs;
const nomeArquivo = "pedidos.json";

export async function iniciar() {
    try {
        await readFile(nomeArquivo);
        logger.info("API Started!");
    } catch(err) {
        const initialJson = {
            nextId: 1,
            accounts: []
        }
        writeFile(nomeArquivo, JSON.stringify(initialJson)).then(() => {
            logger.info("API Started and File Created!");
        }).catch(err => {
            logger.error(err);
        });
    }
}

async function criarPedido(pedido) {
    const data = JSON.parse(await readFile(nomeArquivo));
        
    pedido = {
        id: data.nextId,
        ...pedido,
        entregue: false,
        timestamp: new Date()
    };
    data.nextId++;

    data.pedidos.push(pedido);
    await writeFile(nomeArquivo, JSON.stringify(data, null, 2));

    return pedido;
}

async function atualizarPedido(id, pedido) {
    const data = JSON.parse(await readFile(nomeArquivo));
    const index = data.pedidos.findIndex(p => p.id === id);
    if (index === -1) {
        throw new Error("Pedido não encontrado.");
    }
    data.pedidos[index] = Object.assign(data.pedidos[index], pedido);
    await writeFile(nomeArquivo, JSON.stringify(data, null, 2));

    return data.pedidos[index];
}

async function atualizarEntrega(id, entregue) {
    const data = JSON.parse(await readFile(nomeArquivo));
    const index = data.pedidos.findIndex(p => p.id === id);
    if (index === -1) {
        throw new Error("Pedido não encontrado.");
    }
    data.pedidos[index].entregue = entregue;
    await writeFile(nomeArquivo, JSON.stringify(data, null, 2));

    return data.pedidos[index];
}

async function excluirPedido(id) {
    const data = JSON.parse(await readFile(nomeArquivo));

    data.pedidos = data.pedidos.filter(pedido => pedido.id !== id);
    await writeFile(nomeArquivo, JSON.stringify(data, null, 2));
}

async function consultaPedido(id) {
    const data = JSON.parse(await readFile(nomeArquivo));
    const pedido = data.pedidos.find(pedido => pedido.id === id);
    if (pedido) {
        return pedido;
    }
    throw new Error("Pedido não encontrado.");    
}

async function consultaCliente(cliente) {
    const data = JSON.parse(await readFile(nomeArquivo));
    const pedidosCliente = data.pedidos.filter(pedido => pedido.cliente === cliente && pedido.entregue);
    return pedidosCliente;
}

export default {
    criarPedido,
    atualizarPedido,
    atualizarEntrega,
    excluirPedido,
    consultaPedido,
    consultaCliente
}