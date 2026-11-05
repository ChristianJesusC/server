/**
 * @typedef {import("../domain/abogado.js").Abogado} Abogado
 */
import { AbogadoRepository } from "../domain/abogadoRepository.js";
import { PasswordService } from "./services/passwordService.js";
import { IncompleteLawyerError } from "../domain/errors.js";

const REQUIRED = ["nombre", "apePat", "apeMat", "correo", "contraseña", "ocupacion"];

export default class GuardarAbogadoUseCase {
    /**
     * @param {AbogadoRepository} abogadoRepository
     * @param {PasswordService} passwordService
     */
    constructor(abogadoRepository, passwordService) {
        this.abogadoRepository = abogadoRepository;
        this.passwordService = passwordService;
    }

    /**
     * @param {Partial<Abogado>} abogado 
     */
    async run(abogado) {
        const missing = REQUIRED.filter((f) => typeof abogado?.[f] !== "string" || abogado[f].trim() === "");
        if (missing.length) throw new IncompleteLawyerError(missing);
        const safePassword = await this.passwordService.generateSafePassword(abogado.contraseña);
        abogado.contraseña = safePassword;
        await this.abogadoRepository.saveNewAbogado(abogado);
    }
}