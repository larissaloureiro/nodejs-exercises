import ProprietarioService from "../services/proprietario.service.js";

async function createProprietario(req, res, next) {
    try {
        let proprietario  = req.body;
        if (!proprietario.nome || !proprietario.telefone) {
            throw new Error("Nome e Telefone são obrigatórios.")
        }
        proprietario = await ProprietarioService.createProprietario(proprietario)
        res.send(proprietario);
        loggers.info(`POST /proprietario - ${JSON.stringify(proprietario)}`);
    } catch (err) {
        next(err);
    }
}

async function updateProprietario(req, res, next) {
    try {
        let proprietario  = req.body;
        if (!proprietario.proprietario_id || !proprietario.nome || !proprietario.telefone) {
            throw new Error("Proprietario ID, Nome e Telefone são obrigatórios.")
        }
        proprietario = await ProprietarioService.updateProprietario(proprietario);
        res.send(proprietario);
        loggers.info(`PUT /proprietario - ${JSON.stringify(proprietario)}`);
    } catch (err) {
        next(err);
    }
}

async function deleteProprietario(req, res, next) {
    try {
        await ProprietarioService.deleteProprietario(req.params.id);
        res.end();
        loggers.info("DELETE /proprietario/:id");
    } catch (err) {
        next(err);
    }
}

async function getProprietarios(req, res, next) {
    try {
        res.send(await ProprietarioService.getProprietarios());
        loggers.info("GET /proprietario");
    } catch (err) {
        next(err);
    }
}

async function getProprietario(req, res, next) {
    try {
        res.send(await ProprietarioService.getProprietario(req.params.id));
        loggers.info("GET /proprietario/:id");
    } catch (err) {
        next(err);
    }
}

export default {
    createProprietario,
    getProprietarios,
    getProprietario,
    updateProprietario,
    deleteProprietario
}