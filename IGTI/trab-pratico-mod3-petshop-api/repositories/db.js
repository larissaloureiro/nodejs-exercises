import pg from "pg";
import {database_url} from "../config.js"

async function connect() {
    if (global.connection) {
        return global.connection.connect();
    }
    const pool = new pg.Pool({
        connectionString: database_url
    });
    global.connection = pool;
    return pool.connect();
}

export {
    connect
}