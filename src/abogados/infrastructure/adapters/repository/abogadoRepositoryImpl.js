// @ts-check
/** @typedef {import('../../../domain/abogado').Abogado} Abogado */
/** @typedef {import('mysql2/promise').Connection} MySQLConnection */
import { AbogadoRepository } from "../../../domain/abogadoRepository.js";
import { InfrastructureError } from "../../../../../core/errors/appError.js";
import { EmailAlreadyRegisteredError } from "../../../domain/errors.js";

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
            if (err.code === "ER_DUP_ENTRY") throw new EmailAlreadyRegisteredError(err);
            throw new InfrastructureError(err, "MYSQL");
        }
    }

    /**
     * @param {string} email 
     * @returns {Promise<Abogado|null>}
     */
    async getAbogadoByEmail(email) {
        try {
            const sql = "SELECT * FROM abogados WHERE correo = ?";
            const [rows] = /** @type {[Abogado[], any]} */ (await this.dbconn.execute(sql, [email]));
            return rows[0] ?? null;
        } catch (err) {
            throw new InfrastructureError(err, "MYSQL");
        }
    }
}
