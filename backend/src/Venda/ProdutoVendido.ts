import { Produto } from '../Produto/Produto';

export class ProdutoVendido {
    produto: Produto;
    quantidade: number;

    constructor(produto: Produto, quantidade: number) {
        this.produto = produto;
        this.quantidade = quantidade;
    }
}