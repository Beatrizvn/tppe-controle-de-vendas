export class Customer {
    userId: number;
    name: string;
    phone: string;
    address: string;

    constructor(userId:number, name: string, taxId: string, phone: string, address: string) {
        this.userId = userId;
        this.name = name;
        this.phone = phone;
        this.address = address;
    }
}