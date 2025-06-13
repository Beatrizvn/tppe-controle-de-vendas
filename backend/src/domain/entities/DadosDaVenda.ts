import { Cliente } from './Cliente';
import { ProdutoVendido } from './ProdutoVendido';
import { Pagamento } from './Pagamento';

export class DadosDaVenda {
    produtosVendidos: ProdutoVendido[];
    cliente: Cliente;
    data: string;
    pagamento?: Pagamento; 

    constructor(cliente: Cliente, data: string) {
        this.produtosVendidos = [];
        this.cliente = cliente;
        this.data = data;
    }

    public adicionarProduto(produto: ProdutoVendido): void {
        this.produtosVendidos.push(produto);
    }
    
    public associarPagamento(pagamento: Pagamento): void {
        this.pagamento = pagamento;
    }
}