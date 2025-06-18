import { Pagamento } from './Pagamento';

export class Parcelado extends Pagamento {
    quantidade_de_parcelas: number;
    juros: number; // Juros em porcentagem

    constructor(data: string, quantidade_de_parcelas: number, juros: number) {
        super(data);
        this.quantidade_de_parcelas = quantidade_de_parcelas;
        this.juros = juros;
    }

    public calcularTotalDepoisDeJuros(valor_total: number): number {
        const jurosTotal = (valor_total * this.juros) / 100;
        return valor_total + jurosTotal;
    }
}