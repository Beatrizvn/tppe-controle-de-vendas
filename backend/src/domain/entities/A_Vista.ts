import { Pagamento } from './Pagamento';

export class A_Vista extends Pagamento {
    desconto: number;
    valor_final: number;

    constructor(data: string, valor_total: number, descontoPercentual: number) {
        super(data);
        this.desconto = (valor_total * descontoPercentual) / 100;
        this.valor_final = this.calcularTotalDepoisDeDesconto(valor_total);
    }

    public calcularTotalDepoisDeDesconto(valor_total: number): number {
        return valor_total - this.desconto;
    }
}