// @ts-check

import express from "express";
import cors from "cors";

import { errorHandler } from "./core/http/errorHandler.js";
import { initializeDatabase } from "./database/database.js";

import { createAbogadoControllers } from "./src/abogados/infrastructure/composition.js";
import { createAbogadoRouter } from "./src/abogados/infrastructure/http/router.js";
import { TokenServiceImpl } from "./core/services/infrastructure/token/adapter.js";

if (!process.env.JWT_SECRET) {
    console.error("JWT_SECRET no está definido");
    process.exit(1);
}

const app = express();

app.use(express.json());
app.use(cors({
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    origin: "*" //tmp
}));

initializeDatabase().then((dbconn) => {
    const tokenService = new TokenServiceImpl();
    const abogadoControllers = createAbogadoControllers(dbconn, tokenService);

    const abogadoRouter = createAbogadoRouter({
        guardarAbogadoController: abogadoControllers.guardarAbogadoController,
        autenticarAbogadoController: abogadoControllers.autenticarAbogadoController
    }, (req, res) => {throw new Error("_______________")});

    app.use("/abogado", abogadoRouter);

    app.use(errorHandler); // siempre al final

    app.listen(process.env.SERVER_PORT, () => {
        console.log("Server is running now.");
    });
}).catch((err) => {
    console.error("No se pudo inicializar la base de datos:", err);
    process.exit(1);
});