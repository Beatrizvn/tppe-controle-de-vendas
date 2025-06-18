export class Cliente {
    nome: string;
    cpf: string;
    telefone: string;
    endereco: string;

    constructor(nome: string, cpf: string, telefone: string, endereco: string) {
        this.nome = nome;
        this.cpf = cpf;
        this.telefone = telefone;
        this.endereco = endereco;
    }
}