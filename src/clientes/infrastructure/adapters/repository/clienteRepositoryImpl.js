// @ts-check
/**
 * @typedef {ClientesDomain.Cliente} Cliente
 * @typedef {ClientesDomain.NewCliente} NewCliente
 * @typedef {ClientesDomain.Repository} ClienteRepository
 * @typedef {import('mysql2/promise').Pool} MySQLConnection
 */
import { InfrastructureError } from "../../../../../core/errors/appError.js";

/**
 * @implements {ClienteRepository}
 */
export class ClienteRepositoryImpl {
    /** @param {MySQLConnection} dbconn */
    constructor(dbconn) {
        this.dbconn = dbconn;
    }

    /** @param {NewCliente} cliente */
    async saveNewCliente(cliente) {
        try {
            const sql = "INSERT INTO cliente (Nombre, apePat, apeMat) VALUES (?, ?, ?)";
            const [res] = /** @type {[any, any]} */ (await this.dbconn.execute(sql, [cliente.Nombre, cliente.apePat, cliente.apeMat]));
            return res.insertId;
        } catch (err) {
            throw new InfrastructureError(err, "MYSQL");
        }
    }

    /** @param {number} id */
    async getClienteById(id) {
        try {
            const [rows] = /** @type {[Cliente[], any]} */ (await this.dbconn.execute("SELECT * FROM cliente WHERE idCliente = ?", [id]));
            return rows[0] ?? null;
        } catch (err) {
            throw new InfrastructureError(err, "MYSQL");
        }
    }

    async getAllClientes() {
        try {
            const [rows] = await this.dbconn.execute("SELECT * FROM cliente");
            return /** @type {Cliente[]} */ (rows);
        } catch (err) {
            throw new InfrastructureError(err, "MYSQL");
        }
    }

    /** @param {number} id */
    async deleteById(id) {
        try {
            const [res] = /** @type {[any, any]} */ (await this.dbconn.execute("DELETE FROM cliente WHERE idCliente = ?", [id]));
            return res.affectedRows > 0;
        } catch (err) {
            throw new InfrastructureError(err, "MYSQL");
        }
    }
}
