declare namespace ClienteServices {
    interface CasosLookupPort {
        hasCasos(idCliente: number): Promise<boolean>;
    }
}
