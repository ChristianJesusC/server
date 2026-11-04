//@ts-check
/**
 * @typedef {import("express").Request} Request
 * @typedef {import("express").Response} Response
 * @typedef {import('../../../../../core/http/controller.js').RequestController} Controller
 * @typedef {import('../../../../../core/services/infrastructure/token/port.js').TokenService<Object>} TokenService
 */

import AutenticarAbogadoUseCase from "../../../application/autenticarAbogadoUseCase.js";

/**
 * @implements {Controller}
 */
export class AutenticarAbogadoController {
    /**
     * @param {AutenticarAbogadoUseCase} usecase
     * @param {TokenService} tokenservice
     */
    constructor(usecase, tokenservice) {
        this.usecase = usecase;
        this.tokenservice = tokenservice;
    }

    /**
     * @param {Request} req 
     * @param {Response} res 
     */
    async run(req, res) {
        const { correo, contraseña } = req.body;
        const abogado = await this.usecase.run(correo, contraseña);
        if (abogado) {
            const token = await this.tokenservice.generateToken(abogado);
            res.setHeader("auth-token", token);
            res.status(200).send({
                message: "abogado autenticado con exito"
            });
        } else {
            res.status(404).send({
                message: "no se ha podido autenticar al abogado"
            });
        }
    }
}