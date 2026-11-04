// @ts-check
/** @typedef {import('../../../domain/abogado').Abogado} Abogado */
/** @typedef {import('mysql2/promise').Connection} MySQLConnection */
import { AbogadoRepository } from "../../../domain/abogadoRepository.js";

/**
 * @implements {AbogadoRepository}
 */
export class AbogadoRepositoryImpl {
    /**
     * @param {MySQLConnection} dbconn 
     */
    constructor(dbconn) {
        this.dbconn = dbconn;
    }

    /**
     * @param {Abogado} abogado 
     */
    async saveNewAbogado(abogado) {
        try {
            const sql = "INSERT INTO abogados (nombre, apeMat, apePat, correo, contraseña, ocupacion) VALUES (?, ?, ?, ?, ?, ?)";
            await this.dbconn.execute(sql,
                [abogado.nombre, abogado.apeMat, abogado.apePat, abogado.correo, abogado.contraseña,
                abogado.ocupacion
                ]
            );
        } catch (/** @type {any} */ err) {
            throw new Error(err.message, { cause: { origin: "REPOSITORY", dependency: "MYSQL" } });
        }
    }

    /**
     * @param {string} email 
     * @returns {Promise<Abogado>}
     */
    async getAbogadoByEmail(email) {
        const sql = "SELECT * FROM abogados WHERE correo = ?";
        const [rows] = /** @type {[Abogado[], any]} */ (await this.dbconn.execute(sql, [email]));
        if (rows[0]) {
            return rows[0];
        } else {
            throw new Error("no se encontraron abogados con ese email", {
                cause: { origin: "REPOSITORY" }
            });
        }
    }
}