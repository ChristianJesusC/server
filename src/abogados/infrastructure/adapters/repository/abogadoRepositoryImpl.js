// @ts-check
/** @typedef {AbogadosDomain.Abogado} Abogado */
/** @typedef {import('mysql2/promise').Connection} MySQLConnection */
/** @typedef {AbogadosDomain.Repository} AbogadoRepository */
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
     * @param {Required<Abogado>} abogado 
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

    /**
     * @param {number} id 
     */
    async deleteById(id) {
        try {
            const updateCasosSql = "UPDATE Casos SET idAbogados = 0 WHERE idAbogados = ?";
            const deleteAbogadoSql = "DELETE FROM abogados WHERE idAbogados = ?";
            await this.dbconn.execute(updateCasosSql, [id]);
            await this.dbconn.execute(deleteAbogadoSql, [id]);
        } catch (err) {
            throw new InfrastructureError(err, "MYSQL");
        }
    }

    /**
     * @param {number} id
     */
    async getAbogadoById(id) {
        try {
            const sql = "SELECT * FROM abogados WHERE idAbogados = ?";
            const [rows] = /** @type {[Abogado[], any]} */ (await this.dbconn.execute(sql, [id]));
            return rows[0] ?? null;
        } catch (err) {
            throw new InfrastructureError(err, "MYSQL");
        }
    }

    async getAllAbogados() {
        try {
            const sql = "SELECT * FROM abogados";
            const [rows] = await this.dbconn.execute(sql);
            return /** @type {Required<Abogado>[]} */ (rows) ?? [];
        } catch (err) {
            throw new InfrastructureError(err, "MYSQL");
        }
    }
}
