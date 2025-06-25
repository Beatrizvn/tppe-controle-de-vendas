export class Supplier {
    companyName: string;
    cnpj: string; 
    email: string;
    phone: string;
    address: string;

    constructor(companyName: string, cnpj: string, email: string, phone: string, address: string) {
        this.companyName = companyName;
        this.cnpj = cnpj;
        this.email = email;
        this.phone = phone;
        this.address = address;
    }
}