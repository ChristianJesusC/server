//@ts-check
/** 
 * @typedef {import("mysql2/promise").Connection} MySQLConnection 
 * @typedef {import('../../../core/http/controller.js').RequestController} Controller
 * @typedef {import('../../../core/services/infrastructure/token/port.js').TokenService<Object>} TokenService 
*/

import { AbogadoRepository } from "../domain/abogadoRepository.js";
import { AbogadoRepositoryImpl } from "./adapters/repository/abogadoRepositoryImpl.js";

import { PasswordService } from "../application/services/passwordService.js";

import GuardarAbogadoUseCase from "../application/guardarAbogadoUseCase.js";
import AutenticarAbogadoUseCase from "../application/autenticarAbogadoUseCase.js";

import GuardarAbogadoController from "./http/controllers/guardarAbogadoController.js";
import { AutenticarAbogadoController } from "./http/controllers/autenticarAbogadoController.js";
import PasswordServiceImpl from "./adapters/services/passwordServiceImpl.js";

/**
 * @param {MySQLConnection} dbconn
 * @param {TokenService} tokenservice 
 * @returns {Object<string, Controller>}
 */
export function createAbogadoControllers(dbconn, tokenservice) {
    const abogadoRepository = new AbogadoRepositoryImpl(dbconn);

    const passwordService = new PasswordServiceImpl();

    const guardarAbogadoUseCase = new GuardarAbogadoUseCase(abogadoRepository, passwordService);
    const autenticarAbogadoUseCase = new AutenticarAbogadoUseCase(abogadoRepository, passwordService);

    const guardarAbogadoController = new GuardarAbogadoController(guardarAbogadoUseCase);
    const autenticarAbogadoController = new AutenticarAbogadoController(autenticarAbogadoUseCase, tokenservice);

    return {
        guardarAbogadoController,
        autenticarAbogadoController
    }
}