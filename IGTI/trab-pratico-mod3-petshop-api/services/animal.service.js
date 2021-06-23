import AnimalRepository from "../repositories/animal.repository.js";
import ProprietarioRepository from "../repositories/proprietario.repository.js"

async function createAnimal(animal) {
    if (!await ProprietarioRepository.getProprietario(animal.proprietario_id)) {
        throw new Error("O proprietario_id informado não existe.");
    }
    return await AnimalRepository.insertAnimal(animal);
}

async function updateAnimal(animal) {
    if (!await ProprietarioRepository.getProprietario(animal.proprietario_id)) {
        throw new Error("O proprietario_id informado não existe.");
    }
    return await AnimalRepository.updateAnimal(animal);
}

async function deleteAnimal(id) {
    const animal = await AnimalRepository.getAnimalById(id);
    if (animal) {
        await AnimalRepository.deleteAnimal(id);
    } else {
        throw new Error("O animal_id informado não existe.")
    }
}

async function getAnimais(proprietarioId) {
    if (proprietarioId) {
        return await AnimalRepository.getAnimaisByProprietarioId(proprietarioId);
    } 
    return await AnimalRepository.getAnimais();
}

async function getAnimalById(id) {
    return await AnimalRepository.getAnimalById(id);
}

export default {
    createAnimal,
    getAnimais,
    getAnimalById,
    updateAnimal,
    deleteAnimal
}