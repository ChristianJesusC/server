// @ts-check
/** @typedef {import('mysql2/promise').Pool} MySQLConnection */
import { InfrastructureError } from "../../../../../core/errors/appError.js";

/**
 * Consulta directa a la tabla cliente (evita dependencia circular entre composiciones).
 * @implements {CasoServices.ClienteExistsPort}
 */
export default class ClienteExistsAdapter {
    /** @param {MySQLConnection} dbconn */
    constructor(dbconn) {
        this.dbconn = dbconn;
    }

    /** @param {number} idCliente */
    async exists(idCliente) {
        try {
            const [rows] = /** @type {[any[], any]} */ (await this.dbconn.execute("SELECT 1 FROM cliente WHERE idCliente = ? LIMIT 1", [idCliente]));
            return rows.length > 0;
        } catch (err) {
            throw new InfrastructureError(err, "MYSQL");
        }
    }
}
