// @ts-check
import jwt from "jsonwebtoken";
import { InfrastructureError } from "../../../errors/appError.js";

/**
 * @typedef {Services.Token.UserInfo} UserInfo
 * @typedef {Services.Token.TokenService<UserInfo>} TokenService
 */

const jwt_secret = /** @type {String} */ (process.env.JWT_SECRET);

/**
 * @template {UserInfo} T
 * @implements {TokenService}
 */
export class TokenServiceImpl {
    /**
     * @param {T} payload
     */
    async generateToken(payload) {
        try {
            return jwt.sign(payload, jwt_secret, { expiresIn: "1h" });
        } catch (error) {
            throw new InfrastructureError(error, "JWT");
        }
    }

    /**
     * @param {string} token 
     */
    async verifyToken(token) {
        try {
            const payload = jwt.verify(token, jwt_secret, { algorithms: ["HS256"] });
            
            return {
                valid: true,
                payload: /** @type {UserInfo} */ (payload)
            };
        } catch (error) {
            return { 
                valid: false, 
                payload: null 
            };
        }
    }
}