import { Fornecedor } from '../Fornecedor/Fornecedor';

export class Produto {
    codigo: string;
    nome: string;
    valor_da_venda: number;
    categoria: string;
    estoque: number;
    fornecedor: Fornecedor;
    valor_da_compra: number;

    constructor(
        codigo: string,
        nome: string,
        valor_da_venda: number,
        categoria: string,
        estoque: number,
        fornecedor: Fornecedor,
        valor_da_compra: number
    ) {
        this.codigo = codigo;
        this.nome = nome;
        this.valor_da_venda = valor_da_venda;
        this.categoria = categoria;
        this.estoque = estoque;
        this.fornecedor = fornecedor;
        this.valor_da_compra = valor_da_compra;
    }

    public verificarEstoque(): number {
        console.log(`Verificando estoque do produto ${this.nome}. Quantidade disponível: ${this.estoque}`);
        return this.estoque;
    }
}
