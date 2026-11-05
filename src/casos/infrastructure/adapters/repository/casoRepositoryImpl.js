// @ts-check
/**
 * @typedef {CasosDomain.Caso} Caso
 * @typedef {CasosDomain.NewCaso} NewCaso
 * @typedef {CasosDomain.UpdateCaso} UpdateCaso
 * @typedef {CasosDomain.Repository} CasoRepository
 * @typedef {import('mysql2/promise').Pool} MySQLConnection
 */
import { InfrastructureError } from "../../../../../core/errors/appError.js";

/** whitelist searchBy -> columna (nunca interpolar input del usuario) */
const SEARCH_COLUMN = { codigo: "idCasos", titulo: "Titulo" };

/** @type {Array<keyof NewCaso>} */
const NEW_COLS = [
    "Titulo", "Subtitulo", "TipoJuicio", "EstadoExpediente", "PrimerLugar", "PrimeraFecha", "SegundoLugar",
    "SegundaFecha", "Descripcion", "idAbogados", "idCliente", "fechaRegistro",
    "PrimeraFirma", "SegundaFirma", "TerceraFirma", "CuartaFirma"
];
/** @type {Array<keyof UpdateCaso>} */
const UPDATE_COLS = /** @type {any} */ (NEW_COLS.filter((c) => c !== "idAbogados"));

/**
 * @implements {CasoRepository}
 */
export class CasoRepositoryImpl {
    /** @param {MySQLConnection} dbconn */
    constructor(dbconn) {
        this.dbconn = dbconn;
    }

    /** @param {NewCaso} caso */
    async saveNewCaso(caso) {
        try {
            const sql = `INSERT INTO Casos (${NEW_COLS.join(", ")}) VALUES (${NEW_COLS.map(() => "?").join(", ")})`;
            const [res] = /** @type {[any, any]} */ (await this.dbconn.execute(sql, NEW_COLS.map((c) => caso[c])));
            return res.insertId;
        } catch (err) {
            throw new InfrastructureError(err, "MYSQL");
        }
    }

    /** @param {number} id */
    async getCasoById(id) {
        try {
            const [rows] = /** @type {[Caso[], any]} */ (await this.dbconn.execute("SELECT * FROM Casos WHERE idCasos = ?", [id]));
            return rows[0] ?? null;
        } catch (err) {
            throw new InfrastructureError(err, "MYSQL");
        }
    }

    async getAllCasos() {
        try {
            const [rows] = await this.dbconn.execute("SELECT * FROM Casos");
            return /** @type {Caso[]} */ (rows);
        } catch (err) {
            throw new InfrastructureError(err, "MYSQL");
        }
    }

    /**
     * @param {CasosDomain.SearchBy} by
     * @param {string} term
     */
    async searchCasos(by, term) {
        try {
            const sql = `SELECT * FROM Casos WHERE ${SEARCH_COLUMN[by]} LIKE ?`;
            const [rows] = await this.dbconn.execute(sql, [`%${term}%`]);
            return /** @type {Caso[]} */ (rows);
        } catch (err) {
            throw new InfrastructureError(err, "MYSQL");
        }
    }

    /**
     * @param {number} id
     * @param {UpdateCaso} caso
     */
    async updateById(id, caso) {
        try {
            const sql = `UPDATE Casos SET ${UPDATE_COLS.map((c) => `${c} = ?`).join(", ")} WHERE idCasos = ?`;
            const [res] = /** @type {[any, any]} */ (await this.dbconn.execute(sql, [...UPDATE_COLS.map((c) => caso[c]), id]));
            // affectedRows cuenta filas que coinciden (mysql2 usa CLIENT_FOUND_ROWS), aunque no cambien datos
            return res.affectedRows > 0;
        } catch (err) {
            throw new InfrastructureError(err, "MYSQL");
        }
    }

    /** @param {number} id */
    async deleteById(id) {
        try {
            const [res] = /** @type {[any, any]} */ (await this.dbconn.execute("DELETE FROM Casos WHERE idCasos = ?", [id]));
            return res.affectedRows > 0;
        } catch (err) {
            throw new InfrastructureError(err, "MYSQL");
        }
    }
}
