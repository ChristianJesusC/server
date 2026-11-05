//@ts-check
/**
 * @typedef {import("mysql2/promise").Pool} MySQLConnection
 */

import { CasoRepositoryImpl } from "./adapters/repository/casoRepositoryImpl.js";
import ClienteExistsAdapter from "./adapters/services/clienteExistsAdapter.js";

import AgregarCasoUseCase from "../application/agregarCasoUseCase.js";
import ObtenerCasoPorIdUseCase from "../application/obtenerCasoPorIdUseCase.js";
import { GetAllCasosUseCase } from "../application/getAllCasosUseCase.js";
import BuscarCasosUseCase from "../application/buscarCasosUseCase.js";
import ActualizarCasoUseCase from "../application/actualizarCasoUseCase.js";
import { BorrarCasoUseCase } from "../application/borrarCasoUseCase.js";

import AgregarCasoController from "./http/controllers/agregarCasoController.js";
import ObtenerCasoPorIdController from "./http/controllers/obtenerCasoPorIdController.js";
import GetAllCasosController from "./http/controllers/getAllCasosController.js";
import BuscarCasosController from "./http/controllers/buscarCasosController.js";
import ActualizarCasoController from "./http/controllers/actualizarCasoController.js";
import BorrarCasoController from "./http/controllers/borrarCasoController.js";

/**
 * @param {MySQLConnection} dbconn
 */
export function createCasoControllers(dbconn) {
    const casoRepository = new CasoRepositoryImpl(dbconn);
    const clienteExists = new ClienteExistsAdapter(dbconn);

    return {
        agregarCasoController: new AgregarCasoController(new AgregarCasoUseCase(casoRepository, clienteExists)),
        obtenerCasoPorIdController: new ObtenerCasoPorIdController(new ObtenerCasoPorIdUseCase(casoRepository)),
        getAllCasosController: new GetAllCasosController(new GetAllCasosUseCase(casoRepository)),
        buscarCasosController: new BuscarCasosController(new BuscarCasosUseCase(casoRepository)),
        actualizarCasoController: new ActualizarCasoController(new ActualizarCasoUseCase(casoRepository, clienteExists)),
        borrarCasoController: new BorrarCasoController(new BorrarCasoUseCase(casoRepository))
    };
}
