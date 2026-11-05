// @ts-check

/**
 * @typedef {AbogadosDomain.Abogado} Abogado
 * @typedef {AbogadosDomain.Repository} AbogadoRepository
 */
import { IncompleteLawyerError, InvalidCredentialsError } from "../domain/errors.js";

export default class AutenticarAbogadoUseCase {
    /**
     * @param {AbogadoRepository} repository 
     * @param {AbogadoServices.PasswordService} passwordService 
     */
    constructor(repository, passwordService) {
        this.repository = repository;
        this.passwordService = passwordService;
    }

    /**
     * @param {string?} email 
     * @param {string?} password 
     * @returns {Promise<Abogado>}
     */
    async run(email, password) {
        const missing = [["correo", email], ["contraseña", password]]
            .filter(([, v]) => typeof v !== "string" || v === "").map(([k]) => k);
        if (missing.length) throw new IncompleteLawyerError(/** @type {string[]} */ (missing));

        // mismo error para correo inexistente y contraseña incorrecta (evita enumerar usuarios)
        const abogado = await this.repository.getAbogadoByEmail(/** @type {string} */ (email));
        if (!abogado || !(await this.passwordService.checkPassword(/** @type {string} */ (password), /** @type {string} */ (abogado.contraseña)))) {
            throw new InvalidCredentialsError();
        }
        return abogado;
    }
}