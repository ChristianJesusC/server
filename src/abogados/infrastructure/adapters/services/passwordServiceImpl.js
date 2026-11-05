// @ts-check
import argon2 from "argon2";
import { InfrastructureError } from "../../../../../core/errors/appError.js";

/**
 * @implements {AbogadoServices.PasswordService}
 */
export default class PasswordServiceImpl {
    /**
     * @param {string} password 
     * @param {string} storedPassword 
     */
    async checkPassword(password, storedPassword) {
        try {
            const match = await argon2.verify(storedPassword, password);
            return match;
        } catch (/** @type {any} */ error) {
            // hash con formato inválido (p. ej. contraseña legacy en texto plano): no coincide
            if (error?.message?.includes("pchstr")) return false;
            throw new InfrastructureError(error, "ARGON2");
        }
    }

    /**
     * @param {string} password 
     */
    async generateSafePassword(password) {
        try {
            const safepsw = await argon2.hash(password, {
                type: argon2.argon2id,
                memoryCost: 65536,
                timeCost: 3,
                parallelism: 4
            });
            return safepsw;
        } catch (error) {
            throw new InfrastructureError(error, "ARGON2");
        }
    }
}