//@ts-check

/**
 * @typedef {HTTP.HTTPController} Controller
 */

import { Router } from "express";
import asyncHandler from "express-async-handler";

/**
 * @param {Object<string, Controller>} controllers
 * @param {HTTP.HTTPMiddleware} authMiddleware
 */
export function createCasoRouter(controllers, authMiddleware) {
    const router = Router();
    const auth = asyncHandler(authMiddleware.run.bind(authMiddleware));

    router.post("/", auth, asyncHandler((req, res) => controllers.agregarCasoController.run(req, res)));

    router.get("/", auth, asyncHandler((req, res) => controllers.getAllCasosController.run(req, res)));

    // antes de /id/:id para que "buscar" no se confunda con un id
    router.get("/buscar", auth, asyncHandler((req, res) => controllers.buscarCasosController.run(req, res)));

    router.get("/id/:id", auth, asyncHandler((req, res) => controllers.obtenerCasoPorIdController.run(req, res)));

    router.put("/id/:id", auth, asyncHandler((req, res) => controllers.actualizarCasoController.run(req, res)));

    router.delete("/id/:id", auth, asyncHandler((req, res) => controllers.borrarCasoController.run(req, res)));

    return router;
}
