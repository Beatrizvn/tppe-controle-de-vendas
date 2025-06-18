export class Fornecedor {
    nome_empresa: string;
    cnpj: string;
    email: string;
    telefone: string;
    endereco: string;

    constructor(nome_empresa: string, cnpj: string, email: string, telefone: string, endereco: string) {
        this.nome_empresa = nome_empresa;
        this.cnpj = cnpj;
        this.email = email;
        this.telefone = telefone;
        this.endereco = endereco;
    }
}