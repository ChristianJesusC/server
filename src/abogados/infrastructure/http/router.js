//@ts-check

/**
 * @typedef {import('express').Request} Request
 * @typedef {import('express').Response} Response
 * @typedef {import('express').NextFunction} NextFunction
 * @typedef {import('../../../../core/http/controller.js').RequestController} Controller
 */

import { Router } from "express";
/**
 * @param {Object<string, Controller>} controllers
 * @param {(req: Request, res: Response, next: NextFunction) => void} authMiddleware
 */
export function createAbogadoRouter(
    controllers,
    authMiddleware
) {
    const router = Router();

    router.post("/", (req, res) => {
        controllers.guardarAbogadoController.run(req, res);
    });

    router.post("/login", (req, res) => {
        controllers.autenticarAbogadoController.run(req, res);
    });

    return router;
}