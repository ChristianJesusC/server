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
export function createClienteRouter(controllers, authMiddleware) {
    const router = Router();
    const auth = asyncHandler(authMiddleware.run.bind(authMiddleware));

    router.post("/", auth, asyncHandler((req, res) => controllers.agregarClienteController.run(req, res)));

    router.get("/", auth, asyncHandler((req, res) => controllers.getAllClientesController.run(req, res)));

    router.get("/id/:id", auth, asyncHandler((req, res) => controllers.obtenerClientePorIdController.run(req, res)));

    router.delete("/id/:id", auth, asyncHandler((req, res) => controllers.borrarClienteController.run(req, res)));

    return router;
}
