import AnimalService from "../services/animal.service.js";

async function createAnimal(req, res, next) {
    try {
        let animal  = req.body;
        if (!animal.nome || !animal.tipo || !animal.proprietario_id) {
            throw new Error("Nome, Tipo e Proprietário ID são obrigatórios.")
        }
        animal = await AnimalService.createAnimal(animal)
        res.send(animal);
        loggers.info(`POST /animal - ${JSON.stringify(animal)}`);
    } catch (err) {
        next(err);
    }
}

async function updateAnimal(req, res, next) {
    try {
        let animal  = req.body;
        if (!animal.animal_id || !animal.nome || !animal.tipo || !animal.proprietario_id) {
            throw new Error("Animal ID, Nome, Tipo e Proprietario ID são obrigatórios.")
        }
        animal = await AnimalService.updateAnimal(animal);
        res.send(animal);
        loggers.info(`PUT /animal - ${JSON.stringify(animal)}`);
    } catch (err) {
        next(err);
    }
}

async function deleteAnimal(req, res, next) {
    try {
        await AnimalService.deleteAnimal(req.params.id);
        res.end();
        loggers.info("DELETE /animal/:id");
    } catch (err) {
        next(err);
    }
}

async function getAnimais(req, res, next) {
    try {
        res.send(await AnimalService.getAnimais(req.query.proprietario_id));
        loggers.info("GET /animal");
    } catch (err) {
        next(err);
    }
}

async function getAnimalById(req, res, next) {
    try {
        res.send(await AnimalService.getAnimalById(req.params.id));
        loggers.info("GET /animal/:id");
    } catch (err) {
        next(err);
    }
}

export default {
    createAnimal,
    getAnimais,
    getAnimalById,
    updateAnimal,
    deleteAnimal
}