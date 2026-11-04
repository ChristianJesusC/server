/**
 * @typedef {import("./abogado.js").Abogado} Abogado
 */

/**
 * @interface
 */
export class AbogadoRepository {
    /**
     * @param {Abogado} abogado 
     * @returns {Promise<void>}
     */
    saveNewAbogado(abogado) { }

    /**
     * @param {string} email
     * @returns {Promise<Abogado>} 
     */
    getAbogadoByEmail(email){}
}