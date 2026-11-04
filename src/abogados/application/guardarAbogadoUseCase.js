/**
 * @typedef {import("../domain/abogado.js").Abogado} Abogado
 */
import { AbogadoRepository } from "../domain/abogadoRepository.js";
import { PasswordService } from "./services/passwordService.js";
import errorCodes from "./errorCodes.js";

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
        const { idAbogados, ...abogadoInfo } = abogado;
        for (const value of Object.values(abogadoInfo)) {
            if (!value || value === "") {
                throw new Error("Recieved incomplete abogado info", {
                    cause: { origin: "USECASE", code: errorCodes.INCOMPLETE_LAWYER }
                });
            }
        }
        const safePassword = await this.passwordService.generateSafePassword(abogado.contraseña);
        abogado.contraseña = safePassword;
        await this.abogadoRepository.saveNewAbogado(abogado);
    }
}