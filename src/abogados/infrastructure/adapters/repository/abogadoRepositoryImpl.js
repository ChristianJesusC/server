// @ts-check
/** @typedef {AbogadosDomain.Abogado} Abogado */
/** @typedef {import('mysql2/promise').Pool} MySQLConnection */
const PUBLIC_COLS = "idAbogados, nombre, apePat, apeMat, correo, ocupacion"; // sin contraseña
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
     * @param {Required<Omit<Abogado, "idAbogados">>} abogado 
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
            const conn = await this.dbconn.getConnection();
            try {
                await conn.beginTransaction();
                // acoplamiento con el dominio casos: los casos del abogado quedan huérfanos (idAbogados = 0)
                await conn.execute("UPDATE Casos SET idAbogados = 0 WHERE idAbogados = ?", [id]);
                const [res] = /** @type {[any, any]} */ (await conn.execute("DELETE FROM abogados WHERE idAbogados = ?", [id]));
                await conn.commit();
                return res.affectedRows > 0;
            } catch (err) {
                await conn.rollback();
                throw err;
            } finally {
                conn.release();
            }
        } catch (err) {
            throw new InfrastructureError(err, "MYSQL");
        }
    }

    /**
     * @param {number} id
     */
    async getAbogadoById(id) {
        try {
            const sql = `SELECT ${PUBLIC_COLS} FROM abogados WHERE idAbogados = ?`;
            const [rows] = /** @type {[Abogado[], any]} */ (await this.dbconn.execute(sql, [id]));
            return rows[0] ?? null;
        } catch (err) {
            throw new InfrastructureError(err, "MYSQL");
        }
    }

    async getAllAbogados() {
        try {
            const sql = `SELECT ${PUBLIC_COLS} FROM abogados`;
            const [rows] = await this.dbconn.execute(sql);
            return /** @type {Abogado[]} */ (rows);
        } catch (err) {
            throw new InfrastructureError(err, "MYSQL");
        }
    }
}
