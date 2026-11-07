// @ts-check
/** @typedef {import('mysql2/promise').Pool} MySQLConnection */
import { InfrastructureError } from "../../../../../core/errors/appError.js";

/**
 * Consulta directa a la tabla Casos (mismo acoplamiento SQL que abogadoRepositoryImpl.deleteById);
 * evita una dependencia circular entre las composiciones de casos y clientes.
 * @implements {ClienteServices.CasosLookupPort}
 */
export default class CasosLookupAdapter {
    /** @param {MySQLConnection} dbconn */
    constructor(dbconn) {
        this.dbconn = dbconn;
    }

    /** @param {number} idCliente */
    async hasCasos(idCliente) {
        try {
            const [rows] = /** @type {[any[], any]} */ (await this.dbconn.execute("SELECT 1 FROM Casos WHERE idCliente = ? LIMIT 1", [idCliente]));
            return rows.length > 0;
        } catch (err) {
            throw new InfrastructureError(err, "MYSQL");
        }
    }
}
