import mysql2 from "mysql2/promise";
import fs from "fs";
import path from "path";

const migrationspath = path.resolve(import.meta.dirname, "migrations");
const abogadosMigration = fs.readFileSync(path.resolve(migrationspath, "abogadosTable.sql"), {
    encoding: "utf-8"
});

const casosMigration = fs.readFileSync(path.resolve(migrationspath, "casosTable.sql"), {
    encoding: "utf-8"
});

const clienteMigration = fs.readFileSync(path.resolve(migrationspath, "clienteTable.sql"), {
    encoding: "utf-8"
});

export async function initializeDatabase() {
    const dbconnection = await mysql2.createPool({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME
    });

    await dbconnection.execute(abogadosMigration);
    // BD creada con el esquema viejo (sin AUTO_INCREMENT ni UNIQUE): idempotente
    await dbconnection.execute("ALTER TABLE abogados MODIFY idAbogados INT NOT NULL AUTO_INCREMENT");
    await dbconnection.execute("ALTER TABLE abogados ADD UNIQUE KEY uq_abogados_correo (correo)")
        .catch((/** @type {any} */ e) => { if (e.code !== "ER_DUP_KEYNAME") throw e; });

    await dbconnection.execute(casosMigration);
    await dbconnection.execute("ALTER TABLE Casos MODIFY idCasos INT NOT NULL AUTO_INCREMENT");

    await dbconnection.execute(clienteMigration);
    await dbconnection.execute("ALTER TABLE cliente MODIFY idCliente INT NOT NULL AUTO_INCREMENT");

    return dbconnection;
}