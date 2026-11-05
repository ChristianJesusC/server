//@ts-check
/** 
 * @typedef {import("mysql2/promise").Connection} MySQLConnection 
 * @typedef {HTTP.HTTPController} Controller
 * @typedef {Services.Token.TokenService} TokenService
*/

import { AbogadoRepositoryImpl } from "./adapters/repository/abogadoRepositoryImpl.js";

import GuardarAbogadoUseCase from "../application/guardarAbogadoUseCase.js";
import AutenticarAbogadoUseCase from "../application/autenticarAbogadoUseCase.js";
import { BorrarAbogadoUseCase } from "../application/borrarAbogadoUseCase.js";

import GuardarAbogadoController from "./http/controllers/guardarAbogadoController.js";
import { AutenticarAbogadoController } from "./http/controllers/autenticarAbogadoController.js";
import { BorrarAbogadoController } from "./http/controllers/borrarAbogadoController.js";

import PasswordServiceImpl from "./adapters/services/passwordServiceImpl.js";

/**
 * @param {MySQLConnection} dbconn
 * @param {TokenService} tokenservice
 */
export function createAbogadoControllers(dbconn, tokenservice) {
    const abogadoRepository = new AbogadoRepositoryImpl(dbconn);

    const passwordService = new PasswordServiceImpl();

    const guardarAbogadoUseCase = new GuardarAbogadoUseCase(abogadoRepository, passwordService);
    const autenticarAbogadoUseCase = new AutenticarAbogadoUseCase(abogadoRepository, passwordService);
    const borrarAbogadoUseCase = new BorrarAbogadoUseCase(abogadoRepository);

    const guardarAbogadoController = new GuardarAbogadoController(guardarAbogadoUseCase);
    const autenticarAbogadoController = new AutenticarAbogadoController(autenticarAbogadoUseCase, tokenservice);
    const borrarAbogadoController = new BorrarAbogadoController(borrarAbogadoUseCase);

    return {
        guardarAbogadoController,
        autenticarAbogadoController,
        borrarAbogadoController
    }
}