//@ts-check
/**
 * @typedef {import("mysql2/promise").Pool} MySQLConnection
 */

import { ClienteRepositoryImpl } from "./adapters/repository/clienteRepositoryImpl.js";
import CasosLookupAdapter from "./adapters/services/casosLookupAdapter.js";

import AgregarClienteUseCase from "../application/agregarClienteUseCase.js";
import ObtenerClientePorIdUseCase from "../application/obtenerClientePorIdUseCase.js";
import { GetAllClientesUseCase } from "../application/getAllClientesUseCase.js";
import { BorrarClienteUseCase } from "../application/borrarClienteUseCase.js";

import AgregarClienteController from "./http/controllers/agregarClienteController.js";
import ObtenerClientePorIdController from "./http/controllers/obtenerClientePorIdController.js";
import GetAllClientesController from "./http/controllers/getAllClientesController.js";
import BorrarClienteController from "./http/controllers/borrarClienteController.js";

/**
 * @param {MySQLConnection} dbconn
 */
export function createClienteControllers(dbconn) {
    const clienteRepository = new ClienteRepositoryImpl(dbconn);
    const casosLookup = new CasosLookupAdapter(dbconn);

    return {
        agregarClienteController: new AgregarClienteController(new AgregarClienteUseCase(clienteRepository)),
        obtenerClientePorIdController: new ObtenerClientePorIdController(new ObtenerClientePorIdUseCase(clienteRepository)),
        getAllClientesController: new GetAllClientesController(new GetAllClientesUseCase(clienteRepository)),
        borrarClienteController: new BorrarClienteController(new BorrarClienteUseCase(clienteRepository, casosLookup))
    };
}
