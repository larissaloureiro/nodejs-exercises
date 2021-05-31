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

export default {
    criarPedido
}