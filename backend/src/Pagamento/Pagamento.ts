export abstract class Pagamento {
    status: string;
    data: string;

    constructor(data: string) {
        this.status = "Pendente";
        this.data = data;
    }

    public validarPagamento(): boolean {
        console.log("Validando pagamento...");
        this.status = "Aprovado";
        return true;
    }
}