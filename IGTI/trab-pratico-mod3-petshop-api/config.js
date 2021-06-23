import dotenv from "dotenv";
dotenv.config();

const database_url = process.env.DATABASE_URL;

export {
    database_url
}