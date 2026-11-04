import mysql2 from "mysql2/promise";
import fs from "fs";
import path from "path";

const migrationspath = path.resolve(import.meta.dirname, "migrations");
const abogadosMigration = fs.readFileSync(path.resolve(migrationspath, "abogadosTable.sql"), {
    encoding: "utf-8"
});

export async function initializeDatabase() {
    const dbconnection = await mysql2.createConnection({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME
    });

    await dbconnection.execute(abogadosMigration);

    return dbconnection;
}