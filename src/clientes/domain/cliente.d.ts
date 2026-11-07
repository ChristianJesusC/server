declare namespace ClientesDomain {
    type Cliente = {
        idCliente: number,
        Nombre: string,
        apePat: string,
        apeMat: string
    }

    type NewCliente = Omit<Cliente, "idCliente">;

    interface Repository {
        /** @returns el idCliente generado */
        saveNewCliente(cliente: NewCliente): Promise<number>;
        getClienteById(id: number): Promise<Cliente | null>;
        getAllClientes(): Promise<Cliente[]>;
        /** true si existía y se borró */
        deleteById(id: number): Promise<boolean>;
    }
}
