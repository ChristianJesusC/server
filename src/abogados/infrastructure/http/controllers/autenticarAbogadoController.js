//@ts-check
/**
 * @typedef {import("express").Request} Request
 * @typedef {import("express").Response} Response
 * @typedef {HTTP.HTTPController} Controller
 * @typedef {Services.Token.TokenService} TokenService
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
        // payload mínimo: nunca firmar el hash de la contraseña dentro del JWT
        const token = await this.tokenservice.generateToken({
            id: /** @type {number} */ (abogado.idAbogados),
            email: abogado.correo
        });
        res.setHeader("auth-token", token);
        res.status(200).send({
            message: "abogado autenticado con exito"
        });
    }
}