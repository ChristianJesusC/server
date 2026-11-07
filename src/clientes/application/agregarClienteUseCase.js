// @ts-check
/**
 * @typedef {ClientesDomain.Repository} ClienteRepository
 * @typedef {ClientesDomain.NewCliente} NewCliente
 */
import { IncompleteClienteError } from "../domain/errors.js";

const REQUIRED = /** @type {const} */ (["Nombre", "apePat", "apeMat"]);

export default class AgregarClienteUseCase {
    /** @param {ClienteRepository} repository */
    constructor(repository) {
        this.repository = repository;
    }

    /**
     * @param {Partial<NewCliente>} cliente
     * @returns {Promise<number>} idCliente generado
     */
    async run(cliente) {
        const missing = REQUIRED.filter((f) => typeof cliente?.[f] !== "string" || cliente[f].trim() === "");
        if (missing.length) throw new IncompleteClienteError([...missing]);
        const { Nombre, apePat, apeMat } = /** @type {NewCliente} */ (cliente);
        return await this.repository.saveNewCliente({
            Nombre: Nombre.trim(), apePat: apePat.trim(), apeMat: apeMat.trim()
        });
    }
}
