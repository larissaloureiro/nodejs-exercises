import ProprietarioRepository from "../repositories/proprietario.repository.js";
import AnimalRepository from "../repositories/animal.repository.js";

async function createProprietario(proprietario) {
    return await ProprietarioRepository.insertProprietario(proprietario);
}

async function updateProprietario(proprietario) {
    return await ProprietarioRepository.updateProprietario(proprietario);
}

async function deleteProprietario(id) {
    const proprietario = await ProprietarioRepository.getProprietario(id);
    if (proprietario) {
        const animais = await AnimalRepository.getAnimaisByProprietarioId(id);
        if (animais.length == 0) {
            await ProprietarioRepository.deleteProprietario(id);
        } else {
            throw new Error("Não foi possível excluir o proprietário, pois existem animais cadastrados para ele.")
        }
    } else {
        throw new Error("O id da proprietario informado não existe.")
    }
}

async function getProprietarios() {
    return await ProprietarioRepository.getProprietarios();
}

async function getProprietario(id) {
    return await ProprietarioRepository.getProprietario(id);
}

export default {
    createProprietario,
    getProprietarios,
    getProprietario,
    updateProprietario,
    deleteProprietario
}