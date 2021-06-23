import express from "express";
import cors from "cors";
import winston from "winston";
import animaisRouter from "./routes/animal.route.js";
import proprietariosRouter from "./routes/proprietario.route.js"


const { combine, timestamp, label, printf} = winston.format;
const myFormat = printf(({ level, message, label, timestamp }) => {
    return `${timestamp} [${label}] ${level} - ${message}`;
});
global.logger = winston.createLogger({
    level: "silly",
    transports: [
        new(winston.transports.Console)(),
        new (winston.transports.File)({ filename: "petshop-api.log" })
    ],
    format: combine(
        label({ label: "petshop-api" }),
        timestamp(),
        myFormat
    )
});

const app = express();
app.use(express.json());
app.use(cors());
app.use("/animal", animaisRouter);
app.use("/proprietario", proprietariosRouter);
app.use((err, req, res, next) => {
    logger.error(`${req.method} ${req.baseUrl} - ${err.message}`);
    if (err.message) {
        res.status(400).send({ error: err.message });
        logger.error(`${req.method} ${req.baseUrl} - ${err.message}`);
    } else {
        res.status(400).send({ error: err });
        logger.error(`${req.method} ${req.baseUrl} - ${err}`);
    }
});

app.listen(3000, () => console.log("API Started!"));