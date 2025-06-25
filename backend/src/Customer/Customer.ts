export class Customer {
    name: string;
    phone: string;
    address: string;
    email?: string; 

    constructor(name: string, taxId: string, phone: string, address: string) {
        this.name = name;
        this.phone = phone;
        this.address = address;
    }
}