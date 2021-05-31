import express from "express";
import winston from "winston";
import deliveryRouter from "./routes/delivery.routes.js";
import{promises as fs} from "fs";
import {iniciar} from "./repositories/delivery.repository.js";


const app = express();
app.use(express.json());
app.use("/pedidos", deliveryRouter);

const {readFile, writeFile} = fs;

// Criando o logger
const { combine, timestamp, label, printf } = winston.format;
const myFormat = printf(({ level, message, label, timestamp }) => {
    return `${timestamp} [${label}] ${level}: ${message}`;
});
global.logger = winston.createLogger({
    level: "silly",
    transports: [
        new(winston.transports.Console)(),
        new(winston.transports.File)({ filename: "delivery-api.log" })
    ],
    format: combine(
        label({ label: "delivery-api"}),
        timestamp(),
        myFormat
    )
});

app.listen(3000, iniciar);