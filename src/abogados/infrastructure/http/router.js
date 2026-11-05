//@ts-check

/**
 * @typedef {import('express').NextFunction} NextFunction
 * @typedef {HTTP.HTTPController} Controller
 * @typedef {HTTP.MetaRequest} MetaRequest
 */

import { Router } from "express";
import asyncHandler from "express-async-handler";
/**
 * @param {Object<string, Controller>} controllers
 * @param {HTTP.HTTPMiddleware} authMiddleware
 */
export function createAbogadoRouter(
    controllers,
    authMiddleware
) {
    const router = Router();
    const auth = asyncHandler(authMiddleware.run.bind(authMiddleware));

    router.post("/", asyncHandler((req, res) => controllers.guardarAbogadoController.run(req, res)));

    router.post("/login", asyncHandler((req, res) => controllers.autenticarAbogadoController.run(req, res)));
    
    router.delete("/", auth, asyncHandler((req, res) => controllers.borrarAbogadoController.run(req, res)));

    router.get("/id/:id", auth, asyncHandler((req, res) => controllers.obtenerAbogadoPorIdController.run(req, res)));

    router.get("/", auth, asyncHandler((req, res) => controllers.getAllAbogadosController.run(req, res)));
    return router;
}