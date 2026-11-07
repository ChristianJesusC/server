// @ts-check
/**
 * @typedef {AbogadosDomain.Abogado} Abogado
 * @typedef {AbogadosDomain.Repository} AbogadoRepository
 * @typedef {AbogadoServices.PasswordService} PasswordService
 */
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
        const safePassword = await this.passwordService.generateSafePassword(/** @type {string} */ (abogado.contraseña));
        await this.abogadoRepository.saveNewAbogado(/** @type {Required<Omit<Abogado, "idAbogados">>} */ ({ ...abogado, contraseña: safePassword }));
    }
}