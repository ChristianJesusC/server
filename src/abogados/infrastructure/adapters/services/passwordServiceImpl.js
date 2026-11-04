// @ts-check
import { PasswordService } from "../../../application/services/passwordService.js";
import argon2 from "argon2";

/**
 * @implements {PasswordService}
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
        } catch(error) {
            return false;
        }
    }

    /**
     * @param {string} password 
     */
    async generateSafePassword(password) {
        try {
            const safepsw = argon2.hash(password, {
                type: argon2.argon2id,
                memoryCost: 65536,
                timeCost: 3,
                parallelism: 4
            });
            return safepsw;
        } catch(/** @type {any} */ error) {
            throw new Error(error.message, { cause: { origin: "SERVICE", dependency: "ARGON2" } });
        }
    }
}