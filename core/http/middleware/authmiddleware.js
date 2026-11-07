// @ts-check
import { AuthenticationError } from "../../errors/appError.js";
/**
 * @typedef {import('express').Response} Response
 * @typedef {import('express').NextFunction} NextFunction
 * @typedef {import('express').Request & HTTP.MetaRequest<any>} Request
 * @typedef {Services.Token.UserInfo} UserInfo
 * @typedef {Services.Token.TokenService} TokenService
 */

/**
 * @implements {HTTP.HTTPMiddleware}
 */
export class AuthMiddleware {
    /**
     * @param {TokenService} tokenservice 
     */
    constructor(tokenservice) {
        this.tokenservice = tokenservice;
    }

    /**
     * @param {Request} req 
     * @param {Response} res 
     * @param {NextFunction} next 
     */
    async run(req, res, next) {
        const rawtoken = req.headers.authorization?.replace(/^Bearer\s+/i, "");
        if (!rawtoken) throw new AuthenticationError("AUTH_TOKEN_MISSING", "No se recibió token de autenticación");
        const parsedToken = await this.tokenservice.verifyToken(rawtoken);
        if (!parsedToken.valid) throw new AuthenticationError("AUTH_TOKEN_INVALID", "Token de autenticación inválido");
        const user = /** @type {UserInfo} */ (parsedToken.payload);
        req.meta.user.id = user.id;
        req.meta.user.email = user.email;
        next();
    }
}