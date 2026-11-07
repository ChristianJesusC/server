declare namespace CasoServices {
    interface ClienteExistsPort {
        exists(idCliente: number): Promise<boolean>;
    }
}
