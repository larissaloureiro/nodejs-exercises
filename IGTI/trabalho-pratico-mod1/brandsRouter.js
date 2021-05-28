import express from "express";
import { promises as fs } from "fs";

const router = express.Router();

async function readBrandsJson() {
    const dataJson = JSON.parse(await fs.readFile("car-list.json"));
    return dataJson;
}

function sortDesc(brands) {
    brands.sort((a, b) => {
        if (a.models.length === b.models.length) {
            return a.brand.localeCompare(b.brand);
        }
        return b.models.length - a.models.length;
    });
    return brands;
}

function sortAsc(brands) {
    brands.sort((a, b) => {
        if (a.models.length === b.models.length) {
            return a.brand.localeCompare(b.brand);
        }
        return a.models.length - b.models.length;
    });
    return brands;
}

function firstWithSameModelsQtd(brands) {
    let models = [];
    for(const brand of brands) {
        if (brand.models.length === brands[0].models.length) {
            models.push(brand.brand);
        } else {
            break;
        }
    }
    if (models.length === 1) {
        return models[0];
    } else {
        return models;
    }
}

function firstXBrands(brands, x) {
    return brands.filter((_brand, index) => index < x).map(brand => `${brand.brand} - ${brand.models.length}`);
}

router.get("/maisModelos", async (_req, res) => {
    const brands = sortDesc(await readBrandsJson());
    res.send(firstWithSameModelsQtd(brands));
});

router.get("/menosModelos", async (_req, res) => {
    const brands = sortAsc(await readBrandsJson());
    res.send(firstWithSameModelsQtd(brands));
});

router.get("/listaMaisModelos/:qtd", async (req, res) => {
    const brands = sortDesc(await readBrandsJson());
    let qtd = parseInt(req.params.qtd);
    let moreModelsList = firstXBrands(brands, qtd);
    res.send(moreModelsList);
});

router.get("/listaMenosModelos/:qtd", async (req, res) => {
    const brands = sortAsc(await readBrandsJson());
    let qtd = parseInt(req.params.qtd);
    let lessModelsList = firstXBrands(brands, qtd);
    res.send(lessModelsList);
});

router.post("/listaModelos", async (req, res) => {
    const brands = await readBrandsJson();
    const userBrand = req.body.nomeMarca;
    let modelsList = brands.find(b => b.brand.toUpperCase() === userBrand.toUpperCase());
    if (modelsList) {
        res.send(modelsList.models);
    } else {
        res.send([]);
    }
});

export default router;