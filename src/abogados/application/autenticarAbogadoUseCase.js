/**
 * @typedef {import("../domain/abogado.js").Abogado} Abogado
 */
import { AbogadoRepository } from "../domain/abogadoRepository.js";
import { PasswordService } from "./services/passwordService.js";
import errorCodes from "./errorCodes.js";

export default class AutenticarAbogadoUseCase {
    /**
     * @param {AbogadoRepository} repository 
     * @param {PasswordService} passwordService 
     */
    constructor(repository, passwordService) {
        this.repository = repository;
        this.passwordService = passwordService;
    }

    /**
     * @param {string?} email 
     * @param {string?} password 
     */
    async run(email, password) {
        if ((!email || email === "") || (!password || password === "")) {
            throw new Error("Incomplete lawyer info", {
                cause: { origin: "USECASE", code: errorCodes.INCOMPLETE_LAWYER }
            });
        }
        const possibleAbogado = await this.repository.getAbogadoByEmail(email);
        const valid = await this.passwordService.checkPassword(password, possibleAbogado.contraseña);
        if (valid) {
            return possibleAbogado;
        } else {
            return null;
        }
    }
}