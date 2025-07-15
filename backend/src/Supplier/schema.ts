export class Supplier {
    userId: number;
    companyName: string;
    cnpj: string; 
    email: string;
    phone: string;
    address: string;

    constructor(userId:number, companyName: string, cnpj: string, email: string, phone: string, address: string) {
        this.userId = userId; 
        this.companyName = companyName;
        this.cnpj = cnpj;
        this.email = email;
        this.phone = phone;
        this.address = address;
    }
}